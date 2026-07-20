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

            # Handle different SHAP output formats
        if isinstance(shap_values, list):
            prediction = self.model.predict(data)[0]
            classes = list(self.model.classes_)
            class_index = classes.index(prediction)
            values = shap_values[class_index][0]
        else:
            values = shap_values[0]

        contributions = {}

        total = np.sum(np.abs(values))

        for feature, value in zip(self.feature_names, values):

            percentage = (
                abs(value) / total * 100
                if total != 0
                else 0
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
            f"followed by {top[1][0]} ({top[1][1]}%) "
            f"and {top[2][0]} ({top[2][1]}%). "
            "These factors had the greatest influence on the model's decision."
        )

        return contributions, summary