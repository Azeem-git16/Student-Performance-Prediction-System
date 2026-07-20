import sqlite3

DB_NAME = "students.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row

    conn.execute("""
    CREATE TABLE IF NOT EXISTS predictions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        roll_no TEXT,
        age INTEGER,
        gender TEXT,
        attendance REAL,
        study_hours REAL,
        previous_marks REAL,
        assignment REAL,
        sleep_hours REAL,
        extracurricular TEXT,
        prediction TEXT,
        confidence REAL
    )
    """)

    conn.commit()
    return conn