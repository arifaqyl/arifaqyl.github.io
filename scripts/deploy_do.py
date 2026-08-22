"""Deploy portfolio updates to DigitalOcean via paramiko."""
from __future__ import annotations

import io
import re
import sys
import tarfile
from pathlib import Path

import paramiko

HOST = "68.183.181.237"
USER = "root"
REMOTE = "/root/arifaqyl-site"
REPO = Path(r"D:\arifaqyl.github.io")
SECRETS = Path(r"D:\MyVault\SECRETS.md")
SKIP_DIRS = {".git", "node_modules", ".next", ".turbo", "__pycache__"}
SKIP_FILES = {".env", ".env.production", ".env.local", ".env.development.local", ".env.production.local", ".env.test.local"}


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
    with tarfile.open(fileobj=buffer, mode="w:gz") as tar:
        for path in REPO.rglob("*"):
            rel = path.relative_to(REPO)
            if set(rel.parts) & SKIP_DIRS:
                continue
            if path.name in SKIP_FILES:
                continue
            if any(part in SKIP_DIRS for part in rel.parts):
                continue
            if path.is_dir():
                continue
            tar.add(path, arcname=str(rel).replace("\\", "/"))
    buffer.seek(0)
    return buffer


def main() -> None:
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
    run(ssh, f"cd {REMOTE} && npm ci && npm run build")
    run(ssh, f"cd {REMOTE} && npx prisma db seed")
    run(ssh, "pm2 restart arifaqyl-portfolio || pm2 start npm --name arifaqyl-portfolio -- start")
    run(ssh, "curl -sfI http://127.0.0.1:3000/ | head -n 1")
    ssh.close()
    print("Portfolio deploy complete.")


if __name__ == "__main__":
    main()
