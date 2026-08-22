import re
import sys

import paramiko
from pathlib import Path

text = Path(r"D:\MyVault\SECRETS.md").read_text(encoding="utf-8")
pw = re.search(r"^-\s*Password:\s*(.+)$", text, re.M).group(1).strip()
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("68.183.181.237", username="root", password=pw, timeout=45)

cmds = [
    "grep -n 'location /' /etc/nginx/sites-enabled/arifaqyl-portfolio",
    "grep -n 'root ' /etc/nginx/sites-enabled/arifaqyl-portfolio",
    "curl -sI http://127.0.0.1/ | head -5",
    "curl -skI https://127.0.0.1/ -H 'Host: arifaqyl.me' | head -5",
    "tail -n 8 /var/log/nginx/error.log",
]
for cmd in cmds:
    print("===", cmd)
    _, stdout, _ = ssh.exec_command(cmd)
    stdout.channel.recv_exit_status()
    out = stdout.read().decode(errors="replace")
    print(out.encode("ascii", errors="replace").decode("ascii"))

ssh.close()
