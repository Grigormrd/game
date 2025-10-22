import sqlite3

def init_db():
    conn = sqlite3.connect("game.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            score INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()

def create_user(name):
    conn = sqlite3.connect("game.db")
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (name) VALUES (?)", (name,))
        conn.commit()
        print(f"User '{name}' erfolgreich erstellt.")
    except sqlite3.IntegrityError:
        print(f"User '{name}' existiert bereits.")
    finally:
        conn.close()

def get_user(name):
    conn = sqlite3.connect("game.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
    user = cursor.fetchone()
    conn.close()
    return user
if name == "main":
    init_db()
    name = input("Bitte gib deinen Namen ein: ")
    create_user(name)
    print(get_user(name))

user_name = input("please enter your name: ")
