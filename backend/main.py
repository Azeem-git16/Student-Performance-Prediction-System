from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import joblib

from explainability import Explainability
from database import get_connection

app = FastAPI(title="Student Performance Prediction API")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Vercel URL in production if desired
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Model
# -----------------------------
model = joblib.load("models/model.pkl")
explainer = Explainability(model)


# -----------------------------
# Request Model
# -----------------------------
class Student(BaseModel):
    name: str
    rollNo: str
    age: int
    gender: str
    attendance: float
    study_hours: float
    previous_marks: float
    assignment: float
    sleep_hours: float
    extracurricular: str


# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "Student Performance Prediction API is running!"
    }


# -----------------------------
# Prediction
# -----------------------------
@app.post("/predict")
def predict(student: Student):

    gender = 0 if student.gender == "Male" else 1
    extracurricular = 1 if student.extracurricular == "Yes" else 0

    data = [[
        student.attendance,
        student.study_hours,
        student.previous_marks,
        student.assignment,
        student.sleep_hours,
        student.age,
        gender,
        extracurricular
    ]]

    # Prediction
    prediction = model.predict(data)[0]
    probabilities = model.predict_proba(data)[0]
    confidence = round(max(probabilities) * 100, 2)

    # Explainability
    try:
        explanation, summary = explainer.explain(data)
    except Exception as e:
        print("Explainability Error:", e)
        explanation = {}
        summary = "Explainability unavailable."

    # Suggestions
    suggestions = []

    if student.attendance < 75:
        suggestions.append("Improve your attendance.")

    if student.study_hours < 2:
        suggestions.append("Study at least 2-3 hours daily.")

    if student.previous_marks < 50:
        suggestions.append("Revise basic concepts and practice regularly.")

    if student.sleep_hours < 6:
        suggestions.append("Sleep at least 7-8 hours daily.")

    if not suggestions:
        suggestions.append("Keep up the excellent work!")

    # Save to database
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO predictions(
            name,
            roll_no,
            age,
            gender,
            attendance,
            study_hours,
            previous_marks,
            assignment,
            sleep_hours,
            extracurricular,
            prediction,
            confidence
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            student.name,
            student.rollNo,
            student.age,
            student.gender,
            student.attendance,
            student.study_hours,
            student.previous_marks,
            student.assignment,
            student.sleep_hours,
            student.extracurricular,
            prediction,
            confidence
        )
    )

    conn.commit()
    conn.close()

    return {
        "prediction": prediction,
        "confidence": confidence,
        "suggestions": suggestions,
        "explanation": explanation,
        "summary": summary
    }


# -----------------------------
# History
# -----------------------------
@app.get("/history")
def history():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM predictions
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    history = []

    for row in rows:
        history.append({
            "id": row["id"],
            "name": row["name"],
            "rollNo": row["roll_no"],
            "age": row["age"],
            "gender": row["gender"],
            "attendance": row["attendance"],
            "study_hours": row["study_hours"],
            "previous_marks": row["previous_marks"],
            "assignment": row["assignment"],
            "sleep_hours": row["sleep_hours"],
            "extracurricular": row["extracurricular"],
            "prediction": row["prediction"],
            "confidence": row["confidence"]
        })

    return history


# -----------------------------
# Statistics
# -----------------------------
@app.get("/stats")
def stats():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM predictions")
    total = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM predictions WHERE prediction='Excellent'"
    )
    excellent = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM predictions WHERE prediction='Average'"
    )
    average = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM predictions WHERE prediction='Poor'"
    )
    poor = cursor.fetchone()[0]

    conn.close()

    return {
        "total": total,
        "excellent": excellent,
        "average": average,
        "poor": poor
    }


# -----------------------------
# Analytics
# -----------------------------
@app.get("/analytics")
def analytics():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            AVG(attendance),
            AVG(previous_marks),
            AVG(study_hours),
            AVG(sleep_hours)
        FROM predictions
    """)

    row = cursor.fetchone()

    conn.close()

    return {
        "average_attendance": round(row[0], 2) if row[0] else 0,
        "average_marks": round(row[1], 2) if row[1] else 0,
        "average_study_hours": round(row[2], 2) if row[2] else 0,
        "average_sleep_hours": round(row[3], 2) if row[3] else 0
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }