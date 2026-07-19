import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import ResultCard from "./ResultCard";

import {
  FaUserGraduate,
  FaBook,
  FaBrain,
  FaMoon,
  FaClipboardCheck,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const initialState = {
  name: "",
  rollNo: "",
  age: "",
  gender: "",
  attendance: "",
  studyHours: "",
  previousMarks: "",
  assignment: "",
  sleepHours: "",
  extracurricular: "No",
};

function PredictionForm() {
  const [student, setStudent] = useState(initialState);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setStudent((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

    setError("");
  };

  const validate = () => {
    if (
      Number(student.attendance) < 0 ||
      Number(student.attendance) > 100
    )
      return "Attendance should be between 0 and 100.";

    if (
      Number(student.previousMarks) < 0 ||
      Number(student.previousMarks) > 100
    )
      return "Previous Marks should be between 0 and 100.";

    if (
      Number(student.assignment) < 0 ||
      Number(student.assignment) > 100
    )
      return "Assignment should be between 0 and 100.";

    if (
      Number(student.studyHours) < 0 ||
      Number(student.studyHours) > 24
    )
      return "Study Hours should be between 0 and 24.";

    if (
      Number(student.sleepHours) < 0 ||
      Number(student.sleepHours) > 24
    )
      return "Sleep Hours should be between 0 and 24.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${API_URL}/predict`,
        {
          name: student.name,
          rollNo: student.rollNo,
          age: Number(student.age),
          gender: student.gender,
          attendance: Number(student.attendance),
          study_hours: Number(student.studyHours),
          previous_marks: Number(student.previousMarks),
          assignment: Number(student.assignment),
          sleep_hours: Number(student.sleepHours),
          extracurricular: student.extracurricular,
        }
      );

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "Student Performance Prediction Report",
      20,
      20
    );

    doc.setFontSize(12);

    Object.entries(student).forEach(([key, value], index) => {
      doc.text(
        `${key}: ${value}`,
        20,
        40 + index * 10
      );
    });

    let y = 150;

    doc.text(
      `Prediction: ${result.prediction}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Confidence: ${result.confidence}%`,
      20,
      y
    );

    y += 15;

    if (result.suggestions?.length) {
      doc.text("Suggestions", 20, y);

      y += 10;

      result.suggestions.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      });
    }

    doc.save(
      `${student.rollNo || "Student"}_Prediction.pdf`
    );
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-slate-900 dark:text-white transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none";
  return (
  <section
    id="predict"
    className="bg-slate-100 py-20 transition-colors duration-300 dark:bg-slate-900"
  >
    <div className="mx-auto max-w-6xl px-6">

      {/* Header */}

      <div className="mb-12 text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
          AI Powered Prediction
        </span>

        <h1 className="mt-6 text-4xl font-bold text-slate-800 dark:text-white">
          Student Performance Prediction
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Enter student details to analyse academic performance using AI.
        </p>

      </div>

      {error && (
        <div className="mb-8 rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ================= Student Information ================= */}

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/80">

          <h2 className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-800 dark:border-slate-700 dark:text-white">

            <FaUserGraduate className="text-blue-600" />

            Student Information

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                <FaUser className="mr-2 inline text-blue-600" />
                Student Name
              </label>

              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Enter student name"
                value={student.name}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Roll Number
              </label>

              <input
                className={inputClass}
                type="text"
                name="rollNo"
                placeholder="Enter roll number"
                value={student.rollNo}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Age
              </label>

              <input
                className={inputClass}
                type="number"
                name="age"
                min="1"
                max="100"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">

                <FaVenusMars className="mr-2 inline text-pink-600" />

                Gender

              </label>

              <select
                className={inputClass}
                name="gender"
                value={student.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

            </div>

          </div>

        </div>
                {/* ================= Academic Details ================= */}

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/80">

          <h2 className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-800 dark:border-slate-700 dark:text-white">

            <FaBook className="text-green-600" />

            Academic Details

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Attendance */}

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Attendance (%)
              </label>

              <input
                type="number"
                name="attendance"
                min="0"
                max="100"
                step="0.1"
                value={student.attendance}
                onChange={handleChange}
                className={inputClass}
                placeholder="0 - 100"
                required
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Valid range: 0% to 100%
              </p>

            </div>

            {/* Previous Marks */}

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Previous Marks (%)
              </label>

              <input
                type="number"
                name="previousMarks"
                min="0"
                max="100"
                step="0.1"
                value={student.previousMarks}
                onChange={handleChange}
                className={inputClass}
                placeholder="0 - 100"
                required
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Average marks from previous examinations.
              </p>

            </div>

            {/* Assignment */}

            <div>

              <label className="mb-2 flex items-center font-medium text-slate-700 dark:text-slate-200">

                <FaClipboardCheck className="mr-2 text-green-600" />

                Assignment Completion (%)

              </label>

              <input
                type="number"
                name="assignment"
                min="0"
                max="100"
                step="0.1"
                value={student.assignment}
                onChange={handleChange}
                className={inputClass}
                placeholder="0 - 100"
                required
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Percentage of assignments submitted.
              </p>

            </div>

            {/* Study Hours */}

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Study Hours / Day
              </label>

              <input
                type="number"
                name="studyHours"
                min="0"
                max="24"
                step="0.5"
                value={student.studyHours}
                onChange={handleChange}
                className={inputClass}
                placeholder="Hours per day"
                required
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Typical daily self-study duration.
              </p>

            </div>

          </div>

        </div>
                {/* ================= Lifestyle ================= */}

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/80">

          <h2 className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-800 dark:border-slate-700 dark:text-white">

            <FaBrain className="text-purple-600" />

            Lifestyle

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">

                <FaMoon className="mr-2 inline text-indigo-600" />

                Sleep Hours

              </label>

              <input
                type="number"
                name="sleepHours"
                min="0"
                max="24"
                step="0.5"
                value={student.sleepHours}
                onChange={handleChange}
                className={inputClass}
                placeholder="Hours of sleep"
                required
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Average hours of sleep each day.
              </p>

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                Extracurricular Activities
              </label>

              <select
                name="extracurricular"
                value={student.extracurricular}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

            </div>

          </div>

        </div>

        {/* ================= Buttons ================= */}

        <div className="flex flex-col gap-4 md:flex-row">

          <button
            type="submit"
            disabled={loading}
            className={`flex-1 rounded-xl py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-gray-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                AI is analysing...
              </span>
            ) : (
              "🤖 Predict Performance"
            )}
          </button>

          {result && (
            <button
              type="button"
              onClick={downloadPDF}
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            >
              📄 Download PDF Report
            </button>
          )}

        </div>

      </form>

      {/* ================= Result ================= */}

      {result && (
        <div className="mt-12">
          <ResultCard result={result} />
        </div>
      )}

    </div>

  </section>
);

}

export default PredictionForm;
    