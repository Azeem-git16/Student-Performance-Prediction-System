from explainability import Explainability
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
from database import conn, cursor

app = FastAPI(title="Student Performance Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("models/model.pkl")
explainer = Explainability(model)


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


@app.get("/")
def home():
    return {"message": "Student Performance Prediction API is running!"}


@app.post("/predict")
def predict(student: Student):
    gender = 0 if student.gender == "Male" else 1

    extra = 1 if student.extracurricular == "Yes" else 0

    data = [[
        student.attendance,
        student.study_hours,
        student.previous_marks,
        student.assignment,
        student.sleep_hours,
        student.age,
        gender,
        extra
    ]]

    explanation, summary = explainer.explain(data)

    # Prediction
    prediction = model.predict(data)[0]
    probabilities = model.predict_proba(data)[0]
    confidence = round(max(probabilities) * 100, 2)

    # Suggestions
    suggestions = []

    if student.attendance < 75:
        suggestions.append("Improve your attendance.")

    if student.study_hours < 2:
        suggestions.append("Study at least 2-3 hours daily.")

    if student.previous_marks < 50:
        suggestions.append("Revise basic concepts and practice regularly.")

    if student.sleep_hours < 6:
        suggestions.append("Sleep 7-8 hours every day.")

    if not suggestions:
        suggestions.append("Keep up the excellent work!")

    # Save prediction in SQLite
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
        confidence,
    ),
)

    conn.commit()

    return {
        "prediction": prediction,
        "confidence": confidence,
        "suggestions": suggestions,
        "explanation": explanation,
        "summary": summary,
    }


@app.get("/history")
def history():
    cursor.execute("""
        SELECT * FROM predictions
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    data = []

    for row in rows:
        data.append({
            "id": row[0],
            "name": row[1],
            "rollNo": row[2],
            "age": row[3],
            "gender": row[4],
            "attendance": row[5],
            "study_hours": row[6],
            "previous_marks": row[7],
            "assignment": row[8],
            "sleep_hours": row[9],
            "extracurricular": row[10],
            "prediction": row[11],
            "confidence": row[12],
        })

    return data

@app.get("/stats")
def stats():

    cursor.execute("SELECT COUNT(*) FROM predictions")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM predictions WHERE prediction='Excellent'")
    excellent = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM predictions WHERE prediction='Average'")
    average = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM predictions WHERE prediction='Poor'")
    poor = cursor.fetchone()[0]

    return {
        "total": total,
        "excellent": excellent,
        "average": average,
        "poor": poor
    }

@app.get("/analytics")
def analytics():

    cursor.execute("""
        SELECT AVG(attendance),
               AVG(previous_marks),
               AVG(study_hours),
               AVG(sleep_hours)
        FROM predictions
    """)

    row = cursor.fetchone()

    return {
        "average_attendance": round(row[0], 2) if row[0] else 0,
        "average_marks": round(row[1], 2) if row[1] else 0,
        "average_study_hours": round(row[2], 2) if row[2] else 0,
        "average_sleep_hours": round(row[3], 2) if row[3] else 0,
    }
@app.get("/health")
def health():
    return {"status": "healthy"}