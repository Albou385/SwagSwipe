#!/usr/bin/env python3
"""
SwagSwipe DB bootstrapper
"""

import subprocess, sys, os
from pathlib import Path
from textwrap import shorten

# ----------------------------------------------------------------------
# 1) Ensure dependencies (mysql‑connector‑python, python‑dotenv, rich, typer)
# ----------------------------------------------------------------------
REQUIRED = [
    "mysql-connector-python",
    "python-dotenv",
    "rich",
    "typer",
]
for pkg in REQUIRED:
    try:
        __import__(pkg.split("-")[0].replace("-", "_"))
    except ModuleNotFoundError:
        print(f"🔧  Installing missing package: {pkg} …")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])

import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
from rich.console import Console

console = Console()

# ----------------------------------------------------------------------
# 2) Env vars
# ----------------------------------------------------------------------
load_dotenv()
DB_HOST = "swagswipeserveur.mysql.database.azure.com"
DB_USER = "adminSwag"
DB_PASS = "SwaggySwipe123"
DB_NAME = "swagswipe"

SQL_FILES = ["1create.sql", "2contraines.sql", "3insert.sql"]

# ----------------------------------------------------------------------
# 3) Helpers
# ----------------------------------------------------------------------
def connect():
    console.print(f"🔗  Connecting to [bold]{DB_HOST}[/] / [cyan]{DB_NAME}[/] …")
    return mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASS, database=DB_NAME
    )


# 🛠️  pass the connection object, not cursor
def run_script(conn, file_path: Path):
    console.print(f"\n📄  Executing [green]{file_path.name}[/] …")
    sql = file_path.read_text(encoding="utf-8")
    cur = conn.cursor()

    for raw in sql.split(";"):
        stmt = raw.strip()
        if not stmt:
            continue
        try:
            cur.execute(stmt)
            conn.commit()            # 🛠️ commit with the connection
            console.print(f"  ✅ {shorten(stmt, 80)}")
        except mysql.connector.Error as e:
            if e.errno in {
                errorcode.ER_TABLE_EXISTS_ERROR,
                errorcode.ER_DUP_ENTRY,
                errorcode.ER_DUP_KEYNAME,
                errorcode.ER_BAD_TABLE_ERROR,
            }:
                console.print(
                    f"  ⚠️  {shorten(stmt, 80)} → {e.msg} (ignored)",
                    style="yellow",
                )
            else:
                console.print(
                    f"  ❌ {shorten(stmt, 80)} → {e.msg}",
                    style="bold red",
                )
                raise


# ----------------------------------------------------------------------
# 4) Main
# ----------------------------------------------------------------------
def main():
    try:
        conn = connect()
    except mysql.connector.Error as e:
        console.print(f"❌  Connection failed: {e.msg}", style="bold red")
        sys.exit(1)

    with conn:
        for name in SQL_FILES:
            path = Path(name).resolve()
            if path.exists():
                run_script(conn, path)   # 🛠️ pass conn
            else:
                console.print(f"⚠️  File {name} not found – skipped", style="yellow")

    console.print("\n🎉  [bold green]Database setup complete.[/]")


if __name__ == "__main__":
    main()
