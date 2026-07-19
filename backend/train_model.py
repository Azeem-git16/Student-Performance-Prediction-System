import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib

np.random.seed(42)

data = []

for i in range(1000):

    attendance = np.random.randint(50, 101)
    study_hours = np.random.randint(1, 8)
    previous_marks = np.random.randint(35, 100)
    assignment = np.random.randint(40, 100)
    sleep_hours = np.random.randint(4, 9)

    age = np.random.randint(18, 25)

    gender = np.random.choice([0, 1])       # Male=0 Female=1

    extracurricular = np.random.choice([0, 1])

    score = (
        attendance * 0.25 +
        study_hours * 8 +
        previous_marks * 0.35 +
        assignment * 0.15 +
        sleep_hours * 3 +
        extracurricular * 5
    )

    if score >= 80:
        performance = "Excellent"
    elif score >= 60:
        performance = "Average"
    else:
        performance = "Poor"

    data.append([
        attendance,
        study_hours,
        previous_marks,
        assignment,
        sleep_hours,
        age,
        gender,
        extracurricular,
        performance
    ])

df = pd.DataFrame(data, columns=[
    "attendance",
    "study_hours",
    "previous_marks",
    "assignment",
    "sleep_hours",
    "age",
    "gender",
    "extracurricular",
    "performance"
])

X = df.drop("performance", axis=1)
y = df["performance"]

model = RandomForestClassifier(n_estimators=200)

model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Model trained successfully.")