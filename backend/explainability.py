import shap
import numpy as np

class Explainability:

    def __init__(self, model):
        self.model = model
        self.explainer = shap.TreeExplainer(model)

        self.feature_names = [
            "Attendance",
            "Study Hours",
            "Previous Marks",
            "Assignment",
            "Sleep Hours",
            "Age",
            "Gender",
            "Extracurricular"
        ]

    def explain(self, data):

    shap_values = self.explainer.shap_values(np.array(data))

    # Handle different SHAP versions
    if isinstance(shap_values, list):
        prediction = self.model.predict(data)[0]
        class_index = list(self.model.classes_).index(prediction)
        values = np.array(shap_values[class_index]).flatten()
    else:
        values = np.array(shap_values).flatten()

    contributions = {}

    total = np.sum(np.abs(values))

    for feature, value in zip(self.feature_names, values):

        percentage = (
            float(abs(value) / total * 100)
            if total != 0
            else 0.0
        )

        contributions[feature] = round(percentage, 1)

    contributions = dict(
        sorted(
            contributions.items(),
            key=lambda x: x[1],
            reverse=True
        )
    )

    top = list(contributions.items())[:3]

    summary = (
        f"The student's predicted performance is primarily driven by "
        f"{top[0][0]} ({top[0][1]}%), "
        f"{top[1][0]} ({top[1][1]}%), "
        f"and {top[2][0]} ({top[2][1]}%)."
    )

    return contributions, summary