import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = history.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
      const headers = [
        "Name",
        "Roll No",
        "Attendance",
        "Marks",
        "Prediction",
        "Confidence",
      ];

      const rows = filtered.map((student) => [
        student.name,
        student.rollNo,
        student.attendance,
        student.previous_marks,
        student.prediction,
        student.confidence,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "prediction_history.csv";

      link.click();

      URL.revokeObjectURL(url);
    };

  return (
    <div id="history" className="max-w-7xl mx-auto mt-10">

      <div className="text-center mb-10">

        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/80 px-5 py-2 text-sm font-semibold text-indigo-700">
          📜 Prediction History
        </span>

        <h2 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">
          Student Prediction Records
        </h2>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Review previous AI predictions and analyse student performance over time.
        </p>

      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-4">

        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5">
          <p className="text-sm font-semibold text-blue-600">
            Total Records
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {history.length}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-5">
          <p className="text-sm font-semibold text-green-600">
            Excellent
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {history.filter(s => s.prediction === "Excellent").length}
          </h3>
        </div>

        <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-5">
          <p className="text-sm font-semibold text-amber-600">
            Average
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {history.filter(s => s.prediction === "Average").length}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-5">
          <p className="text-sm font-semibold text-red-600">
            Poor
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {history.filter(s => s.prediction === "Poor").length}
          </h3>
        </div>

      </div>

      <div className="relative mb-8">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by Name or Roll Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              py-3
              pl-12
              pr-4
              shadow-sm
              transition-all
              duration-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none text-slate-900 dark:text-white dark:bg-slate-700 placeholder:text-slate-400
            "
          />

      </div>

      <div className="mb-6 flex justify-end">

        <button
          onClick={exportToCSV}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:scale-105"
        >
          📥 Export CSV
        </button>

      </div>


      <div
          className="
            hidden
            md:block
            overflow-x-auto
            rounded-3xl
            border
            border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            shadow-xl
          "
      >

        <table className="min-w-full">

          <thead
            className="
              sticky
              top-0
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              z-10
            "
          >

            <tr>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Name</th>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Roll No</th>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Attendance</th>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Marks</th>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Prediction</th>
              <th
                className="
                  p-4
                  text-left
                  font-semibold
                  uppercase
                  tracking-wide
                "
              >Confidence</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((student) => (

              <tr
                  key={student.id}
                  className={`
                    border-b
                    transition-all
                    duration-300
                    hover:bg-blue-50 dark:bg-blue-900/20
                    hover:scale-[1.01]
                    ${student.id % 2 === 0 ? "bg-slate-50 dark:bg-slate-700" : "bg-white dark:bg-slate-800"}
                  `}
              >

                <td className="p-4">{student.name}</td>

                <td className="p-4">{student.rollNo}</td>

                <td className="p-4">{student.attendance}%</td>

                <td className="p-4">{student.previous_marks}</td>

                <td className="p-4">

                  <span
                    className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                      student.prediction === "Excellent"
                        ? "bg-green-100 text-green-700"
                        : student.prediction === "Average"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.prediction}
                  </span>

                </td>

                <td className="p-4">

                  <div className="w-36 mx-auto">

                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Confidence</span>
                      <span>{student.confidence}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-200">

                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${student.confidence}%`,
                        }}
                      />

                    </div>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="space-y-5 md:hidden">

        {filtered.map((student) => (

          <div
            key={student.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-lg"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {student.name}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  student.prediction === "Excellent"
                    ? "bg-green-100 text-green-700"
                    : student.prediction === "Average"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {student.prediction}
              </span>

            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">

              <p><strong>Roll No:</strong> {student.rollNo}</p>

              <p><strong>Attendance:</strong> {student.attendance}%</p>

              <p><strong>Marks:</strong> {student.previous_marks}</p>

            </div>

            <div className="mt-5">

              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">

                <span>Confidence</span>

                <span>{student.confidence}%</span>

              </div>

              <div className="h-2 rounded-full bg-slate-200">

                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{
                    width: `${student.confidence}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default History;