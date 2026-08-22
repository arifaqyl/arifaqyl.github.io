"""Deploy Manus static portfolio to DigitalOcean and serve at / via nginx."""
from __future__ import annotations

import io
import re
import sys
import tarfile
from pathlib import Path

import paramiko

HOST = "68.183.181.237"
USER = "root"
REMOTE = "/var/www/arifaqyl-manus"
LEGACY = Path(r"D:\arifaqyl.github.io\public\legacy")
MEDIA = Path(r"D:\arifaqyl.github.io\public\media")
REPO = Path(r"D:\arifaqyl.github.io")
SECRETS = Path(r"D:\MyVault\SECRETS.md")
NGINX_CONFIG = "/etc/nginx/sites-enabled/arifaqyl-portfolio"


def load_password() -> str:
    text = SECRETS.read_text(encoding="utf-8")
    match = re.search(r"^-\s*Password:\s*(.+)$", text, re.MULTILINE)
    if not match:
        raise SystemExit("DigitalOcean password not found in vault secrets file")
    return match.group(1).strip()


def run(ssh: paramiko.SSHClient, cmd: str) -> str:
    print(f"$ {cmd}")
    _, stdout, stderr = ssh.exec_command(cmd, get_pty=True)
    exit_code = stdout.channel.recv_exit_status()
    out = stdout.read().decode(errors="replace")
    err = stderr.read().decode(errors="replace")
    if out.strip():
        print(out.rstrip().encode("ascii", errors="replace").decode("ascii"))
    if err.strip():
        print(err.rstrip().encode("ascii", errors="replace").decode("ascii"), file=sys.stderr)
    if exit_code != 0:
        raise SystemExit(f"Command failed ({exit_code})")
    return out


def build_tarball() -> io.BytesIO:
    buffer = io.BytesIO()
    media_ext = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".ico", ".mp4", ".webm"}
    with tarfile.open(fileobj=buffer, mode="w:gz") as tar:
        for path in LEGACY.rglob("*"):
            if path.is_dir():
                continue
            rel = path.relative_to(LEGACY)
            tar.add(path, arcname=str(rel).replace("\\", "/"))

        if MEDIA.is_dir():
            for path in MEDIA.rglob("*"):
                if path.is_dir() or path.suffix.lower() not in media_ext:
                    continue
                tar.add(path, arcname=path.name)

        for name in ("sitemap.xml", "robots.txt", "security.txt"):
            root_file = REPO / name
            if root_file.is_file():
                tar.add(root_file, arcname=name)

    buffer.seek(0)
    return buffer


def patch_nginx(ssh: paramiko.SSHClient) -> None:
    script = f"""
from pathlib import Path
path = Path("{NGINX_CONFIG}")
text = path.read_text(encoding="utf-8")

static_block = '''    location / {{
        root {REMOTE};
        try_files $uri $uri/ /index.html;
    }}'''

proxy_block = '''    location / {{
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}'''

if "root {REMOTE};" in text:
    print("nginx already serving Manus static root")
elif proxy_block in text:
    text = text.replace(proxy_block, static_block)
    path.write_text(text, encoding="utf-8")
    print("nginx patched for Manus static root")
elif "root /root/arifaqyl-manus;" in text:
    text = text.replace("root /root/arifaqyl-manus;", "root {REMOTE};")
    path.write_text(text, encoding="utf-8")
    print("nginx root path updated to {REMOTE}")
else:
    raise SystemExit("could not find portfolio location / block to patch")
"""
    run(ssh, f"python3 - <<'PY'\n{script}\nPY")
    run(ssh, "nginx -t && systemctl reload nginx")


def main() -> None:
    if not LEGACY.is_dir():
        raise SystemExit(f"Manus legacy folder not found: {LEGACY}")

    password = load_password()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USER, password=password, timeout=45)

    run(ssh, f"mkdir -p {REMOTE}")
    tarball = build_tarball()
    sftp = ssh.open_sftp()
    sftp.putfo(tarball, f"{REMOTE}/deploy.tar.gz")
    sftp.close()

    run(ssh, f"cd {REMOTE} && tar xzf deploy.tar.gz && rm deploy.tar.gz")
    run(ssh, f"chown -R www-data:www-data {REMOTE} && chmod -R a+rX {REMOTE}")
    patch_nginx(ssh)
    run(ssh, "curl -sfI http://127.0.0.1/ | head -n 1")
    run(ssh, "curl -sf http://127.0.0.1/ | grep -o 'live apps' | head -n 1")
    run(ssh, "curl -sfI http://127.0.0.1/aerodance.jpg | grep -i content-type")
    run(ssh, "curl -sfI http://127.0.0.1/compostifymodel.jpg | grep -i content-type")
    ssh.close()
    print("Manus portfolio deploy complete.")


if __name__ == "__main__":
    main()
