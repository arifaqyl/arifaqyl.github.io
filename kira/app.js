'use strict';

// ── i18n ──────────────────────────────────────────────────────
const STRINGS = {
  en: {
    heroNet: 'net take-home / month',
    heroGross: 'required gross / month',
    heroCtc: 'total cost to company / month',
    netCtaSub: 'employer adds: EPF + SOCSO + EIS + HRDF',
  },
  bm: {
    heroNet: 'gaji bersih / bulan',
    heroGross: 'gaji kasar diperlukan / bulan',
    heroCtc: 'jumlah kos syarikat / bulan',
    netCtaSub: 'majikan tambah: KWSP + PERKESO + SIP + HRDF',
  }
};
let lang = 'en';
const s = k => STRINGS[lang]?.[k] ?? STRINGS.en[k] ?? k;

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  document.querySelectorAll('.lang-btn').forEach(x => x.classList.toggle('active', x.dataset.lang === lang));
  // re-run active tool
  triggerActive();
}));

// ── Tab nav ───────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
}));

// ── Number helpers ────────────────────────────────────────────
const fmt2 = n => n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Animated counter
function animateNum(el, from, to, duration = 280) {
  const start = performance.now();
  const range = to - from;
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt2(from + range * ease);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

let gajiPrev = 0, tnbPrev = 0, ringgitPrev = 0;

function setHero(el, value, animate = true) {
  if (value === null) {
    el.textContent = '—';
    el.classList.add('empty');
    return;
  }
  el.classList.remove('empty');
  const prev = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  if (animate && Math.abs(prev - value) > 0.005) {
    animateNum(el, prev, value);
  } else {
    el.textContent = fmt2(value);
  }
}

// ── SOCSO tables ──────────────────────────────────────────────
const SOCSO_EMP = [
  [30,0.10],[50,0.20],[70,0.30],[100,0.40],[140,0.50],[200,0.60],[300,0.75],
  [400,0.95],[500,1.10],[600,1.25],[700,1.45],[800,1.60],[900,1.80],[1000,1.95],
  [1100,2.15],[1200,2.30],[1300,2.50],[1400,2.65],[1500,2.85],[1600,3.00],
  [1700,3.20],[1800,3.35],[1900,3.55],[2000,3.70],[2100,3.90],[2200,4.05],
  [2300,4.25],[2400,4.40],[2500,4.60],[2600,4.75],[2700,4.95],[2800,5.10],
  [2900,5.30],[3000,5.45],[3100,5.65],[3200,5.80],[3300,6.00],[3400,6.15],
  [3500,6.35],[3600,6.50],[3700,6.70],[3800,6.85],[3900,7.05],[4000,7.20],
];
const SOCSO_ER = [
  [30,0.40],[50,0.60],[70,0.90],[100,1.20],[140,1.50],[200,1.85],[300,2.35],
  [400,2.95],[500,3.35],[600,3.90],[700,4.50],[800,4.95],[900,5.55],[1000,6.05],
  [1100,6.65],[1200,7.20],[1300,7.80],[1400,8.35],[1500,8.95],[1600,9.50],
  [1700,10.10],[1800,10.65],[1900,11.25],[2000,11.80],[2100,12.40],[2200,12.95],
  [2300,13.55],[2400,14.10],[2500,14.70],[2600,15.25],[2700,15.85],[2800,16.40],
  [2900,17.00],[3000,17.55],[3100,18.15],[3200,18.70],[3300,19.30],[3400,19.85],
  [3500,20.45],[3600,21.00],[3700,21.60],[3800,22.15],[3900,22.75],[4000,23.30],
];

function socso(gross, table) {
  if (gross > 4000) return table[table.length - 1][1];
  for (const [ceil, val] of table) if (gross <= ceil) return val;
  return table[table.length - 1][1];
}

// PCB YA2025
const PCB_BANDS = [
  [5000,0],[20000,1],[35000,3],[50000,8],[70000,13],
  [100000,21],[250000,24],[400000,24.5],[600000,25],[Infinity,30],
];

function pcbMonthly(gross, epfEmpRate) {
  const annual = Math.max(0, gross * 12 - gross * 12 * epfEmpRate);
  let tax = 0, prev = 0;
  for (const [ceil, rate] of PCB_BANDS) {
    if (annual <= prev) break;
    tax += (Math.min(annual, ceil) - prev) * rate / 100;
    prev = ceil;
    if (annual <= ceil) break;
  }
  if (annual <= 35000) tax = Math.max(0, tax - 400);
  return Math.max(0, tax / 12);
}

function calcGaji(gross, epfRate) {
  const epfEmp = gross * epfRate;
  const epfEr  = gross <= 5000 ? gross * 0.13 : gross * 0.12;
  const soEmp  = socso(gross, SOCSO_EMP);
  const soEr   = socso(gross, SOCSO_ER);
  const eisEmp = Math.min(gross, 4000) * 0.002;
  const eisEr  = Math.min(gross, 4000) * 0.002;
  const hrdf   = gross * 0.01;
  const pcb    = pcbMonthly(gross, epfRate);
  const net    = gross - epfEmp - soEmp - eisEmp - pcb;
  const ctc    = gross + epfEr + soEr + eisEr + hrdf;
  return { gross, epfEmp, epfEr, soEmp, soEr, eisEmp, eisEr, hrdf, pcb, net, ctc };
}

function reverseGaji(targetNet, epfRate) {
  let lo = targetNet, hi = targetNet * 2.5;
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    (calcGaji(mid, epfRate).net < targetNet ? lo : hi) = mid;
  }
  return calcGaji((lo + hi) / 2, epfRate);
}

function brow(label, value, cls = '') {
  const sign = value < 0 ? '−' : '';
  return `<div class="brow ${cls}"><span class="bl">${label}</span><span class="bv">${sign}RM ${fmt2(Math.abs(value))}</span></div>`;
}

let gajiMode = 'normal';

function runGaji() {
  const epfRate = parseFloat(document.getElementById('gaji-epf').value) / 100;
  const heroNum = document.getElementById('gaji-hero-num');
  const heroLabel = document.getElementById('gaji-hero-label');
  const heroSub = document.getElementById('gaji-hero-sub');
  const bd = document.getElementById('gaji-breakdown');

  let res;
  if (gajiMode === 'reverse') {
    const net = parseFloat(document.getElementById('gaji-net-input').value);
    if (!net || net <= 0) { setHero(heroNum, null); bd.innerHTML = ''; return; }
    res = reverseGaji(net, epfRate);
  } else {
    const gross = parseFloat(document.getElementById('gaji-gross').value);
    if (!gross || gross <= 0) { setHero(heroNum, null); bd.innerHTML = ''; return; }
    res = calcGaji(gross, epfRate);
  }

  if (gajiMode === 'ctc') {
    heroLabel.textContent = s('heroCtc');
    heroSub.textContent = s('netCtaSub');
    setHero(heroNum, res.ctc);
  } else if (gajiMode === 'reverse') {
    heroLabel.textContent = s('heroGross');
    heroSub.textContent = '';
    setHero(heroNum, res.gross);
  } else {
    heroLabel.textContent = s('heroNet');
    heroSub.textContent = '';
    setHero(heroNum, res.net);
  }

  let html = '';
  html += `<div class="bsection">Employee deductions</div>`;
  html += brow('Gross salary', res.gross);
  html += brow('EPF ' + (epfRate*100|0) + '%', -res.epfEmp, 'deduct');
  html += brow('SOCSO', -res.soEmp, 'deduct');
  html += brow('EIS (0.2%)', -res.eisEmp, 'deduct');
  html += brow('PCB / income tax', -res.pcb, 'deduct');
  html += brow('Net take-home', res.net, 'total-row positive');

  if (gajiMode === 'ctc') {
    html += `<div class="bsection">Employer contributions</div>`;
    html += brow('EPF 13%' + (res.gross > 5000 ? '/12%' : ''), res.epfEr);
    html += brow('SOCSO', res.soEr);
    html += brow('EIS (0.2%)', res.eisEr);
    html += brow('HRDF (1%)', res.hrdf);
    html += brow('Total cost to company', res.ctc, 'total-row');
  }

  if (gajiMode === 'reverse') {
    html = `<div class="bsection">Required gross to achieve net</div>` + brow('Required gross', res.gross, 'total-row') + html.replace(/^.*?<div class="bsection">/, '<div class="bsection">');
  }

  bd.innerHTML = html;
}

document.getElementById('gaji-gross').addEventListener('input', runGaji);
document.getElementById('gaji-net-input').addEventListener('input', runGaji);
document.getElementById('gaji-epf').addEventListener('change', runGaji);

document.querySelectorAll('#gaji-mode-group .mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    gajiMode = btn.dataset.mode;
    document.querySelectorAll('#gaji-mode-group .mode-btn').forEach(b => b.classList.toggle('active', b === btn));
    const isReverse = gajiMode === 'reverse';
    document.getElementById('gaji-gross-field').style.display = isReverse ? 'none' : 'flex';
    document.getElementById('gaji-net-field').style.display = isReverse ? 'flex' : 'none';
    runGaji();
  });
});

// ── TNB ───────────────────────────────────────────────────────
const TNB_BLOCKS = [
  { limit: 200, rate: 0.218 },
  { limit: 100, rate: 0.334 },
  { limit: 300, rate: 0.516 },
  { limit: 300, rate: 0.546 },
  { limit: Infinity, rate: 0.571 },
];
const KWTBB = 0.016; // RM1.60 per 100 kWh = RM0.016 per kWh

function calcTNB(kwh) {
  let rem = kwh, energy = 0;
  const rows = [];
  for (const { limit, rate } of TNB_BLOCKS) {
    if (rem <= 0) break;
    const used = limit === Infinity ? rem : Math.min(rem, limit);
    const cost = used * rate;
    rows.push({ used, rate, cost });
    energy += cost;
    rem -= used;
  }
  const levy = kwh * KWTBB;
  return { rows, energy, levy, total: energy + levy };
}

let appliances = [];

function renderAppliances() {
  const list = document.getElementById('tnb-app-list');
  const total = appliances.reduce((s, a) => s + a.kwh, 0);
  list.innerHTML = appliances.map(a =>
    `<li class="app-item">
      <span>${a.name} <span style="color:var(--muted);font-size:0.65rem">${a.watts}W · ${a.hours}h/d</span></span>
      <span style="display:flex;align-items:center;gap:0.5rem">
        <span>${fmt2(a.kwh)} kWh</span>
        <button class="app-remove" data-id="${a.id}">×</button>
      </span>
    </li>`
  ).join('');

  if (appliances.length) {
    list.innerHTML += `<li class="app-total-row"><span>Total from appliances</span><span>${fmt2(total)} kWh</span></li>`;
    document.getElementById('tnb-kwh').value = Math.round(total);
    runTNB();
  }

  list.querySelectorAll('.app-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      appliances = appliances.filter(a => a.id !== +btn.dataset.id);
      renderAppliances();
      runTNB();
    });
  });
}

document.getElementById('tnb-add').addEventListener('click', () => {
  const name = document.getElementById('tnb-app-name').value.trim() || 'Device';
  const watts = parseFloat(document.getElementById('tnb-app-watts').value);
  const hours = parseFloat(document.getElementById('tnb-app-hours').value);
  if (!watts || !hours) return;
  appliances.push({ name, watts, hours, kwh: +(watts / 1000 * hours * 30).toFixed(1), id: Date.now() });
  document.getElementById('tnb-app-name').value = '';
  document.getElementById('tnb-app-watts').value = '';
  document.getElementById('tnb-app-hours').value = '';
  renderAppliances();
});

function runTNB() {
  const kwh = parseFloat(document.getElementById('tnb-kwh').value);
  const heroNum = document.getElementById('tnb-hero-num');
  const heroSub = document.getElementById('tnb-hero-sub');
  const bd = document.getElementById('tnb-breakdown');
  if (!kwh || kwh <= 0) { setHero(heroNum, null); bd.innerHTML = ''; return; }

  const res = calcTNB(kwh);
  setHero(heroNum, res.total);
  heroSub.textContent = `${fmt2(kwh)} kWh`;

  const labels = ['1–200', '201–300', '301–600', '601–900', '901+'];
  let html = '';
  res.rows.forEach((r, i) => {
    if (r.used > 0) html += brow(`${labels[i]} kWh × RM${r.rate.toFixed(3)}`, r.cost);
  });
  html += brow(`KWTBB levy (RM1.60/100kWh)`, res.levy);
  html += brow('Total bill', res.total, 'total-row');
  bd.innerHTML = html;
}

document.getElementById('tnb-kwh').addEventListener('input', runTNB);

// ── KWSP (handled in Retirement Score section below) ─────────

// ── CUTI ──────────────────────────────────────────────────────
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const FRI_SAT = new Set(['Kedah','Kelantan','Terengganu']);

const H2026 = [
  [2026,1,1,'New Year\'s Day','all'],
  [2026,1,14,'Thaipusam','all'],
  [2026,1,29,'Federal Territory Day','WP'],
  [2026,2,13,'Hari Raya Aidilfitri','all'],
  [2026,2,14,'Hari Raya Aidilfitri (2nd day)','all'],
  [2026,3,7,'Israk Mikraj','all'],
  [2026,3,23,'Nuzul Al-Quran','all'],
  [2026,4,6,'Hari Raya Aidiladha','all'],
  [2026,4,17,'Awal Muharam','all'],
  [2026,5,1,'Labour Day','all'],
  [2026,5,18,'Wesak Day','all'],
  [2026,6,5,'Yang di-Pertuan Agong\'s Birthday','all'],
  [2026,6,26,'Maulidur Rasul','all'],
  [2026,8,31,'National Day','all'],
  [2026,9,16,'Malaysia Day','all'],
  [2026,10,28,'Deepavali','all'],
  [2026,12,25,'Christmas Day','all'],
];

const H2027 = [
  [2027,1,1,'New Year\'s Day','all'],
  [2027,2,2,'Hari Raya Aidilfitri','all'],
  [2027,2,3,'Hari Raya Aidilfitri (2nd day)','all'],
  [2027,3,2,'Thaipusam','all'],
  [2027,3,26,'Hari Raya Aidiladha','all'],
  [2027,4,5,'Federal Territory Day','WP'],
  [2027,4,17,'Awal Muharam','all'],
  [2027,5,1,'Labour Day','all'],
  [2027,5,14,'Nuzul Al-Quran','all'],
  [2027,6,4,'Yang di-Pertuan Agong\'s Birthday','all'],
  [2027,6,16,'Maulidur Rasul','all'],
  [2027,8,31,'National Day','all'],
  [2027,9,7,'Wesak Day','all'],
  [2027,9,16,'Malaysia Day','all'],
  [2027,11,16,'Deepavali','all'],
  [2027,12,25,'Christmas Day','all'],
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function isWeekend(d, state) {
  const day = d.getDay();
  return FRI_SAT.has(state) ? (day === 5 || day === 6) : (day === 0 || day === 6);
}

function renderCuti() {
  const year = document.getElementById('cuti-year').value;
  const state = document.getElementById('cuti-state').value;
  const data = year === '2026' ? H2026 : H2027;
  const list = document.getElementById('cuti-list');
  const isWP = state.startsWith('W.P.');

  list.innerHTML = data.map(([y,m,d,name,scope]) => {
    if (scope === 'WP' && !isWP) return '';
    const dt = new Date(y, m-1, d);
    const dn = DAYS[dt.getDay()];
    const ds = `${String(d).padStart(2,'0')} ${MONTHS[m-1]} ${y}`;
    const wknd = isWeekend(dt, state);
    return `<li class="hol">
      <span class="hol-d">${ds}</span>
      <span class="hol-day ${dn}">${dn}</span>
      <span class="hol-n">${name}</span>
      <span class="hol-wknd">${wknd ? 'Weekend' : ''}</span>
    </li>`;
  }).join('');
}

document.getElementById('cuti-year').addEventListener('change', renderCuti);
document.getElementById('cuti-state').addEventListener('change', renderCuti);
renderCuti();

// ── SAHIH ─────────────────────────────────────────────────────
const PHONE_MAP = {
  '011-1':'Celcom','011-2':'Maxis','011-3':'Digi','011-5':'Celcom',
  '011-6':'U Mobile','011-7':'Digi','011-8':'Maxis','011-9':'Celcom',
  '010':'YTL','012':'Maxis','013':'Celcom','014':'Digi/U Mobile',
  '016':'Maxis','017':'Digi','018':'U Mobile','019':'Celcom',
};

function checkPhone(raw) {
  let s = raw.replace(/[\s\-().+]/g,'');
  if (s.startsWith('60')) s = '0' + s.slice(2);
  if (!/^01[0-9]{8,9}$/.test(s)) return { ok: false, msg: 'Not a valid MY mobile number format' };
  const p4 = s.slice(0,5).replace(/(\d{3})(\d)/,'$1-$2');
  const p3 = s.slice(0,3);
  const carrier = PHONE_MAP[p4] || PHONE_MAP[p3] || 'Unknown carrier';
  return { ok: true, number: s, carrier };
}

const PC_RANGES = [
  [[1000,2800],'Perlis'],[[5000,9810],'Kedah'],[[10000,14400],'Pulau Pinang'],
  [[15000,18500],'Kelantan'],[[20000,24300],'Terengganu'],[[25000,28900],'Pahang'],
  [[30000,36810],'Perak'],[[40000,48300],'Selangor'],[[50000,60000],'W.P. Kuala Lumpur'],
  [[62000,62988],'W.P. Putrajaya'],[[63000,68100],'Selangor'],[[69000,73509],'Negeri Sembilan'],
  [[75000,78309],'Melaka'],[[79000,86900],'Johor'],[[87000,87033],'W.P. Labuan'],
  [[88000,91309],'Sabah'],[[93000,98859],'Sarawak'],
];

function checkPostcode(raw) {
  if (!/^\d{5}$/.test(raw)) return null;
  const n = +raw;
  for (const [[lo,hi],state] of PC_RANGES) if (n >= lo && n <= hi) return state;
  return null;
}

const PLATE_MAP = {
  'WA':'W.P. Putrajaya','A':'Perak','B':'Selangor','C':'Pahang','D':'Kelantan',
  'F':'W.P. Putrajaya','G':'Pahang','H':'Terengganu','J':'Johor','K':'Kedah',
  'L':'W.P. Labuan','M':'Melaka','N':'Negeri Sembilan','P':'Pulau Pinang',
  'Q':'Sarawak','R':'Perlis','S':'Sabah','T':'Terengganu','V':'W.P. Labuan',
  'W':'W.P. Kuala Lumpur','X':'Sarawak','Y':'Sarawak','Z':'W.P. Kuala Lumpur',
};

function checkPlate(raw) {
  const s = raw.toUpperCase().replace(/\s/g,'');
  const m = s.match(/^([A-Z]{1,2})/);
  if (!m) return null;
  return PLATE_MAP[m[1].slice(0,2)] || PLATE_MAP[m[1][0]] || null;
}

function showVal(id, cls, html) {
  const el = document.getElementById(id);
  el.className = `val-result show ${cls}`;
  el.innerHTML = html;
}

document.getElementById('sahih-phone-btn').addEventListener('click', () => {
  const r = checkPhone(document.getElementById('sahih-phone').value.trim());
  if (r.ok) showVal('sahih-phone-res', 'ok', `Valid MY mobile<div class="val-detail">Normalised: ${r.number}<br>Carrier: ${r.carrier}</div>`);
  else showVal('sahih-phone-res', 'bad', r.msg);
});

document.getElementById('sahih-pc-btn').addEventListener('click', () => {
  const raw = document.getElementById('sahih-postcode').value.trim();
  const state = checkPostcode(raw);
  if (state) showVal('sahih-pc-res', 'info-ok', `State: ${state}`);
  else showVal('sahih-pc-res', 'bad', 'Postcode not recognised — must be 5 digits in a known range');
});

document.getElementById('sahih-plate-btn').addEventListener('click', () => {
  const raw = document.getElementById('sahih-plate').value.trim();
  const state = checkPlate(raw);
  if (state) showVal('sahih-plate-res', 'info-ok', `Registered in: ${state}`);
  else showVal('sahih-plate-res', 'bad', 'Prefix not recognised');
});

// Enter key triggers check buttons
[['sahih-phone','sahih-phone-btn'],['sahih-postcode','sahih-pc-btn'],['sahih-plate','sahih-plate-btn']]
  .forEach(([inp, btn]) => {
    document.getElementById(inp).addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById(btn).click();
    });
  });

// ── RINGGIT ───────────────────────────────────────────────────
const ONES = ['','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan','sepuluh',
  'sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas'];
const TENS = ['','','dua puluh','tiga puluh','empat puluh','lima puluh','enam puluh','tujuh puluh','lapan puluh','sembilan puluh'];

function numBM(n) {
  n = Math.round(n);
  if (n === 0) return 'kosong';
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n/10)] + (n%10 ? ' ' + ONES[n%10] : '');
  if (n < 1000) {
    const h = Math.floor(n/100), r = n%100;
    return (h===1?'seratus':ONES[h]+' ratus') + (r?' '+numBM(r):'');
  }
  if (n < 1000000) {
    const k = Math.floor(n/1000), r = n%1000;
    return (k===1?'seribu':numBM(k)+' ribu') + (r?' '+numBM(r):'');
  }
  const m = Math.floor(n/1000000), r = n%1000000;
  return numBM(m)+' juta' + (r?' '+numBM(r):'');
}

function amountBM(amount) {
  const rm = Math.floor(amount);
  const sen = Math.round((amount - rm) * 100);
  const parts = [];
  if (rm > 0) parts.push(numBM(rm) + ' ringgit');
  if (sen > 0) parts.push(numBM(sen) + ' sen');
  return (parts.length ? parts.join(' ') : 'kosong ringgit') + ' sahaja';
}

function bnmRound(x) { return Math.round(x * 20) / 20; }

function runRinggit() {
  const amount = parseFloat(document.getElementById('ringgit-amount').value);
  const sstRate = parseFloat(document.getElementById('ringgit-sst').value);
  const heroNum = document.getElementById('ringgit-hero-num');
  const bd = document.getElementById('ringgit-breakdown');
  const words = document.getElementById('ringgit-words');
  const wordsText = document.getElementById('ringgit-words-text');

  if (isNaN(amount) || amount < 0) {
    setHero(heroNum, null);
    bd.innerHTML = '';
    words.classList.remove('show');
    return;
  }

  const sst = amount * sstRate;
  const total = amount + sst;
  const rounded = bnmRound(total);
  setHero(heroNum, rounded);

  let html = '';
  if (sstRate > 0) {
    html += brow('Original amount', amount);
    html += brow(`SST (${(sstRate*100).toFixed(0)}%)`, sst);
    html += brow('Subtotal', total);
  }
  html += brow('Cash rounded (BNM 5-sen)', rounded, 'total-row');
  bd.innerHTML = html;

  wordsText.textContent = amountBM(rounded);
  words.classList.add('show');
}

document.getElementById('ringgit-amount').addEventListener('input', runRinggit);
document.getElementById('ringgit-sst').addEventListener('change', runRinggit);

// ── RAISE CALCULATOR ─────────────────────────────────────────
function runRaise() {
  const cur  = parseFloat(document.getElementById('raise-current').value);
  const next = parseFloat(document.getElementById('raise-new').value);
  const epfRate = parseFloat(document.getElementById('raise-epf').value) / 100;
  const heroNum = document.getElementById('raise-hero-num');
  const heroSub = document.getElementById('raise-hero-sub');
  const bd = document.getElementById('raise-breakdown');

  if (!cur || !next || cur <= 0 || next <= cur) {
    setHero(heroNum, null);
    bd.innerHTML = '';
    heroSub.textContent = '';
    return;
  }

  const before = calcGaji(cur, epfRate);
  const after  = calcGaji(next, epfRate);
  const grossRaise = next - cur;
  const netRaise   = after.net - before.net;
  const efficiency = (netRaise / grossRaise * 100).toFixed(1);
  const ctcExtra   = after.ctc - before.ctc;

  setHero(heroNum, netRaise);
  heroSub.textContent = `from a RM ${fmt2(grossRaise)} gross raise — you keep ${efficiency}%`;

  let html = '';
  html += `<div class="bsection">Your take-home</div>`;
  html += brow('Before', before.net);
  html += brow('After', after.net, 'positive');
  html += brow('Net increase', netRaise, 'total-row positive');

  html += `<div class="bsection">Where the rest of your raise goes</div>`;
  html += brow('Extra EPF (employee)', after.epfEmp - before.epfEmp, 'deduct');
  html += brow('Extra SOCSO', after.soEmp - before.soEmp, 'deduct');
  html += brow('Extra EIS', after.eisEmp - before.eisEmp, 'deduct');
  html += brow('Extra PCB/tax', after.pcb - before.pcb, 'deduct');

  html += `<div class="bsection">What your employer pays extra</div>`;
  html += brow('Extra EPF (employer)', after.epfEr - before.epfEr);
  html += brow('Extra SOCSO', after.soEr - before.soEr);
  html += brow('Extra EIS + HRDF', (after.eisEr + after.hrdf) - (before.eisEr + before.hrdf));
  html += brow('Total extra cost to company', ctcExtra, 'total-row');

  bd.innerHTML = html;
}

document.getElementById('raise-current').addEventListener('input', runRaise);
document.getElementById('raise-new').addEventListener('input', runRaise);
document.getElementById('raise-epf').addEventListener('change', runRaise);

// ── KWSP Retirement Score ─────────────────────────────────────
const BASIC_SAVINGS = 240000; // KWSP basic savings quantum 2024

function showRetirementScore(rows, monthly) {
  const score = document.getElementById('kwsp-score');
  const at55 = rows.find(r => r.age === 55);
  const at60 = rows.find(r => r.age === 60);
  if (!at55) { score.style.display = 'none'; return; }

  score.style.display = 'block';
  const bal55 = at55.balance;
  const MILLION = 1000000;

  // Status
  let statusClass, statusText;
  if (bal55 >= MILLION) {
    statusClass = 'score-great'; statusText = `Millionaire track — RM ${fmt2(bal55 - MILLION)} above RM1M`;
  } else if (bal55 >= BASIC_SAVINGS) {
    statusClass = 'score-ok'; statusText = `On track — RM ${fmt2(bal55 - BASIC_SAVINGS)} above basic savings (RM240k)`;
  } else {
    statusClass = 'score-warn'; statusText = `Below basic savings target (RM240k at 55)`;
  }
  document.getElementById('kwsp-track-status').innerHTML =
    `<span class="retire-badge ${statusClass}">${statusText}</span>`;

  // Progress bars
  const pct240 = Math.min(bal55 / BASIC_SAVINGS * 100, 100);
  const pct1m  = Math.min(bal55 / MILLION * 100, 100);
  document.getElementById('kwsp-bars').innerHTML = `
    <div class="rbar-wrap">
      <div class="rbar-label"><span>Basic savings (RM240k)</span><span class="rbar-pct">${pct240.toFixed(0)}%</span></div>
      <div class="rbar-track"><div class="rbar-fill ${pct240 >= 100 ? 'full' : ''}" style="width:${pct240}%"></div></div>
    </div>
    <div class="rbar-wrap" style="margin-top:0.75rem">
      <div class="rbar-label"><span>Aspirational RM1M</span><span class="rbar-pct">${pct1m.toFixed(0)}%</span></div>
      <div class="rbar-track"><div class="rbar-fill ${pct1m >= 100 ? 'full' : ''}" style="width:${pct1m}%"></div></div>
    </div>`;

  // Nudge — how much monthly to hit RM1M
  if (bal55 < MILLION) {
    const age = parseInt(document.getElementById('kwsp-age').value);
    const yearsLeft = 55 - age;
    const DIV = 0.055;
    const curBal = parseFloat(document.getElementById('kwsp-balance').value) || 0;
    // FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r  →  solve for PMT (annual)
    const factor = Math.pow(1 + DIV, yearsLeft);
    const annualNeeded = (MILLION - curBal * factor) / ((factor - 1) / DIV);
    const monthlyNeeded = annualNeeded / 12;
    const currentMonthly = monthly;
    const extra = Math.max(0, monthlyNeeded - currentMonthly);
    if (extra > 0) {
      document.getElementById('kwsp-nudge').innerHTML =
        `<span class="rbar-label-text">Add <strong>RM ${fmt2(extra)}/month</strong> voluntary contribution to hit RM1M by 55</span>`;
    } else {
      document.getElementById('kwsp-nudge').innerHTML = '';
    }
  } else {
    document.getElementById('kwsp-nudge').innerHTML = '';
  }
}

// Patch KWSP calc to call retirement score
const _origKwspCalc = document.getElementById('kwsp-calc').onclick;
document.getElementById('kwsp-calc').addEventListener('click', () => {
  const bal   = parseFloat(document.getElementById('kwsp-balance').value) || 0;
  const age   = parseInt(document.getElementById('kwsp-age').value);
  const sal   = parseFloat(document.getElementById('kwsp-salary').value);
  const xtra  = parseFloat(document.getElementById('kwsp-extra').value) || 0;
  if (!age || !sal || sal <= 0) return;

  const empRate = 0.11, erRate = sal <= 5000 ? 0.13 : 0.12;
  const monthly = sal * (empRate + erRate) + xtra;
  const DIV = 0.055;
  let balance = bal;
  const rows = [];
  for (let a = age + 1; a <= 70; a++) {
    balance = (balance + monthly * 12) * (1 + DIV);
    rows.push({ age: a, balance, milestone: a === 55 || a === 60 });
  }

  const at55 = rows.find(r => r.age === 55);
  const heroNum = document.getElementById('kwsp-hero-num');
  if (at55) setHero(heroNum, at55.balance);
  else setHero(heroNum, null);

  const display = rows.filter(r => r.milestone || r.age % 5 === 0 || r.age === age + 1);
  document.getElementById('kwsp-table').innerHTML = `
    <thead><tr><th>Age</th><th>Projected balance</th></tr></thead>
    <tbody>${display.map(r =>
      `<tr class="${r.milestone ? 'milestone' : ''}">
        <td>${r.age}${r.age === 55 ? ' — Akaun Emas' : r.age === 60 ? ' — Akaun Persaraan' : ''}</td>
        <td>RM ${fmt2(r.balance)}</td>
      </tr>`
    ).join('')}</tbody>`;
  document.getElementById('kwsp-proj-wrap').style.display = 'block';
  document.getElementById('kwsp-note').style.display = 'block';
  showRetirementScore(rows, monthly);
});

// ── URL params sync (Gaji) ────────────────────────────────────
function syncURL() {
  const gross = document.getElementById('gaji-gross').value;
  const epf   = document.getElementById('gaji-epf').value;
  if (!gross) return;
  const url = new URL(location.href);
  url.searchParams.set('gross', gross);
  url.searchParams.set('epf', epf);
  url.searchParams.set('mode', gajiMode);
  history.replaceState(null, '', url);
}

function loadURL() {
  const p = new URLSearchParams(location.search);
  if (p.has('gross')) {
    document.getElementById('gaji-gross').value = p.get('gross');
    if (p.has('epf')) document.getElementById('gaji-epf').value = p.get('epf');
    if (p.get('mode') === 'ctc') {
      const btn = document.querySelector('[data-mode="ctc"]');
      if (btn) btn.click();
    }
    runGaji();
    // Switch to gaji tab if a param was found
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'gaji'));
    document.querySelectorAll('.tool-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-gaji'));
  }
}

// Patch runGaji to also sync URL
const _origRunGaji = runGaji;
// We'll inline the sync in the input listener
document.getElementById('gaji-gross').addEventListener('input', syncURL);

// ── Copy result ───────────────────────────────────────────────
document.getElementById('gaji-copy').addEventListener('click', () => {
  const gross = document.getElementById('gaji-gross').value;
  const epfRate = parseFloat(document.getElementById('gaji-epf').value) / 100;
  if (!gross) return;
  const res = calcGaji(parseFloat(gross), epfRate);
  const text = [
    `Gaji Calculator — kira.arifaqyl.me`,
    `Gross:   RM ${fmt2(res.gross)}`,
    `EPF:     −RM ${fmt2(res.epfEmp)}`,
    `SOCSO:   −RM ${fmt2(res.soEmp)}`,
    `EIS:     −RM ${fmt2(res.eisEmp)}`,
    `PCB/tax: −RM ${fmt2(res.pcb)}`,
    `Net:     RM ${fmt2(res.net)}`,
  ].join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('gaji-copy');
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 1500);
  });
});

// Show copy button when there's a result
const origRunGajiForCopy = runGaji;
document.getElementById('gaji-gross').addEventListener('input', () => {
  const v = document.getElementById('gaji-gross').value;
  document.getElementById('gaji-copy').style.display = v ? 'inline-block' : 'none';
});

// ── Keyboard shortcuts ────────────────────────────────────────
const KB_MAP = { g:'gaji', t:'tnb', k:'kwsp', r:'raise', c:'cuti', s:'sahih', m:'ringgit' };
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  const tab = KB_MAP[e.key.toLowerCase()];
  if (tab) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (btn) btn.click();
  }
});

// ── Re-run active tool when lang changes ──────────────────────
function triggerActive() {
  const active = document.querySelector('.tab-btn.active')?.dataset.tab;
  if (active === 'gaji') runGaji();
  else if (active === 'tnb') runTNB();
  else if (active === 'ringgit') runRinggit();
  else if (active === 'raise') runRaise();
  else if (active === 'cuti') renderCuti();
}

// ── Init ──────────────────────────────────────────────────────
loadURL();
