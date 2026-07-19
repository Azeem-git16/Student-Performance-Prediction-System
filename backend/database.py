import sqlite3

conn = sqlite3.connect("students.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
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