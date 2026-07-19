import AIExplainability from "./AIExplainability";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaLightbulb,
  FaChartLine,
  FaAward,
  FaRobot,
} from "react-icons/fa";

function ResultCard({ result }) {
  if (!result) return null;

  const config = {
    Excellent: {
      grade: "A+",
      emoji: "🏆",
      badge: "bg-emerald-600",
      progress: "stroke-emerald-500",
      icon: <FaCheckCircle className="text-emerald-500" />,
      status: "Outstanding",
    },
    Average: {
      grade: "B",
      emoji: "📘",
      badge: "bg-amber-500",
      progress: "stroke-amber-500",
      icon: <FaExclamationTriangle className="text-amber-500" />,
      status: "Good",
    },
    Poor: {
      grade: "C",
      emoji: "⚠️",
      badge: "bg-red-600",
      progress: "stroke-red-500",
      icon: <FaTimesCircle className="text-red-500" />,
      status: "Needs Improvement",
    },
  };

  const current =
    config[result.prediction] || config.Poor;

  const radius = 60;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (result.confidence / 100) * circumference;

  return (
    <div
      className="
      mt-12
      rounded-3xl
      bg-white
      dark:bg-slate-800
      shadow-2xl
      border
      border-slate-200
      dark:border-slate-700
      overflow-hidden
    "
    >
      {/* Header */}

      <div
        className="
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        px-8
        py-10
        text-white
      "
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <FaRobot className="text-3xl" />

              <h2 className="text-3xl font-bold">
                AI Prediction Report
              </h2>
            </div>

            <p className="mt-3 text-blue-100">
              Machine Learning Performance Analysis
            </p>

            <div
              className={`inline-flex mt-6 items-center gap-2 rounded-full px-6 py-3 text-lg font-bold shadow-lg ${current.badge}`}
            >
              {current.emoji}

              {result.prediction}
            </div>
          </div>

          {/* Circular Progress */}

          <div className="relative h-40 w-40">
            <svg
              width="160"
              height="160"
              className="-rotate-90"
            >
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="10"
              />

              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={`${current.progress} transition-all duration-1000`}
              />
            </svg>

            <div
              className="
                absolute inset-0
                flex flex-col
                items-center
                justify-center
              "
            >
              <span className="text-3xl font-bold">
                {result.confidence}%
              </span>

              <span className="text-sm text-blue-100">
                Confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-blue-50 dark:bg-slate-700 p-6">
          <FaChartLine className="mb-3 text-3xl text-blue-600" />

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Prediction
          </p>

          <h3 className="mt-2 text-xl font-bold dark:text-white">
            {result.prediction}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 dark:bg-slate-700 p-6">
          <FaAward className="mb-3 text-3xl text-green-600" />

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Grade
          </p>

          <h3 className="mt-2 text-xl font-bold dark:text-white">
            {current.grade}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 dark:bg-slate-700 p-6">
          <FaRobot className="mb-3 text-3xl text-purple-600" />

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Confidence
          </p>

          <h3 className="mt-2 text-xl font-bold dark:text-white">
            {result.confidence}%
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 dark:bg-slate-700 p-6">
          {current.icon}

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Status
          </p>

          <h3 className="mt-2 text-xl font-bold dark:text-white">
            {current.status}
          </h3>
        </div>

      </div>
            {/* ================= AI Recommendations ================= */}

      <div className="border-t border-slate-200 p-8 dark:border-slate-700">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-yellow-100 p-3 dark:bg-yellow-500/20">
            <FaLightbulb className="text-2xl text-yellow-500" />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              AI Recommendations
            </h3>

            <p className="text-slate-500 dark:text-slate-400">
              Personalized suggestions generated from the prediction model.
            </p>

          </div>

        </div>

        {result.suggestions?.length ? (

          <div className="space-y-4">

            {result.suggestions.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div className="mt-1">

                  {current.icon}

                </div>

                <div>

                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Recommendation {index + 1}
                  </h4>

                  <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">
                    {item}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              p-8
              text-center
              dark:border-slate-600
            "
          >

            <FaLightbulb className="mx-auto mb-4 text-4xl text-yellow-500" />

            <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
              No Recommendations Available
            </h4>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              The AI model did not return any additional recommendations.
            </p>

          </div>

        )}

      </div>

      {/* ================= Footer ================= */}

      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-4
          border-t
          border-slate-200
          bg-slate-50
          px-8
          py-6
          text-center
          md:flex-row
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Generated using the Student Performance Prediction AI Model
        </p>

        <span
          className="
            rounded-full
            bg-blue-100
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-700
            dark:bg-blue-900/40
            dark:text-blue-300
          "
        >
          AI Generated Report
        </span>

      </div>

      {/* AI Explainability */}
      <AIExplainability
          explanation={result.explanation}
          summary={result.summary}
      />

    </div>
      
  );
}

export default ResultCard;