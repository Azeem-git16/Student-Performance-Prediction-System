import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

import {
  FaUsers,
  FaAward,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    excellent: 0,
    average: 0,
    poor: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/stats`
        );

        setStats(data);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const excellentPercent = useMemo(() => {
    if (!stats.total) return 0;
    return (
      (stats.excellent / stats.total) *
      100
    ).toFixed(1);
  }, [stats]);

  const averagePercent = useMemo(() => {
    if (!stats.total) return 0;
    return (
      (stats.average / stats.total) *
      100
    ).toFixed(1);
  }, [stats]);

  const poorPercent = useMemo(() => {
    if (!stats.total) return 0;
    return (
      (stats.poor / stats.total) *
      100
    ).toFixed(1);
  }, [stats]);

  const pieData = {
    labels: [
      "Excellent",
      "Average",
      "Poor",
    ],

    datasets: [
      {
        data: [
          stats.excellent,
          stats.average,
          stats.poor,
        ],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],

        borderColor: "#ffffff",

        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: [
      "Excellent",
      "Average",
      "Poor",
    ],

    datasets: [
      {
        label: "Students",

        data: [
          stats.excellent,
          stats.average,
          stats.poor,
        ],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],

        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1200,
    },

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: "#94A3B8",
          font: {
            size: 13,
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94A3B8",
        },

        grid: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "#94A3B8",
        },

        beginAtZero: true,
      },
    },
  };

  const recommendation =
    stats.poor > stats.excellent
      ? "A higher number of students require academic support. Focus on attendance improvement, assignment completion, and personalized mentoring."
      : "Overall student performance is encouraging. Continue promoting consistent study habits and regular participation.";

  const insightCards = [
    {
      title: "Total Predictions",
      value: stats.total,
      percent: "100%",
      color: "blue",
      icon: <FaUsers />,
    },

    {
      title: "Excellent",
      value: stats.excellent,
      percent: `${excellentPercent}%`,
      color: "green",
      icon: <FaAward />,
    },

    {
      title: "Average",
      value: stats.average,
      percent: `${averagePercent}%`,
      color: "amber",
      icon: <FaChartLine />,
    },

    {
      title: "Needs Attention",
      value: stats.poor,
      percent: `${poorPercent}%`,
      color: "red",
      icon: <FaExclamationTriangle />,
    },
  ];
  return (
  <section
    id="dashboard"
    className="mx-auto mt-16 max-w-7xl px-6 transition-colors duration-300"
  >
    {/* Header */}

    <div className="mb-12 text-center">

      <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
        📊 AI Analytics Dashboard
      </span>

      <h2 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">
        Student Performance Analytics
      </h2>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Monitor prediction trends and analyse student performance in real time.
      </p>

    </div>

    {/* Error */}

    {error && (

      <div className="mb-8 rounded-2xl border border-red-300 bg-red-50 p-5 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">

        {error}

      </div>

    )}

    {/* Loading */}

    {loading ? (

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1,2,3,4].map((item)=>(
          <div
            key={item}
            className="h-44 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700"
          />
        ))}

      </div>

    ) : (

      <>

        {/* KPI CARDS */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {insightCards.map((card,index)=>(

            <div
              key={index}
              className="
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-7
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              <div className="flex items-center justify-between">

                <div className="text-3xl text-blue-600">

                  {card.icon}

                </div>

                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-blue-700
                    dark:bg-blue-900/40
                    dark:text-blue-300
                  "
                >
                  {card.percent}
                </span>

              </div>

              <p className="mt-6 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">

                {card.title}

              </p>

              <h3 className="mt-3 text-5xl font-extrabold text-slate-900 dark:text-white">

                {card.value}

              </h3>

            </div>

          ))}

        </div>

        {/* Charts */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Pie */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-8
              shadow-xl
            "
          >

            <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">

              Prediction Distribution

            </h3>

            <div className="h-96">

              <Pie
                data={pieData}
                options={chartOptions}
              />

            </div>

          </div>

          {/* Bar */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-8
              shadow-xl
            "
          >

            <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">

              Performance Comparison

            </h3>

            <div className="h-96">

              <Bar
                data={barData}
                options={chartOptions}
              />

            </div>

          </div>

        </div>
                {/* ================= AI Insights ================= */}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">

          <h3 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
            🧠 AI Insights
          </h3>

          <div className="space-y-6">

            {/* Excellent */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Excellent Students
                </span>

                <span className="font-bold text-green-600">
                  {excellentPercent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-1000"
                  style={{
                    width: `${excellentPercent}%`,
                  }}
                />

              </div>

            </div>

            {/* Average */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Average Students
                </span>

                <span className="font-bold text-yellow-600">
                  {averagePercent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-yellow-500 transition-all duration-1000"
                  style={{
                    width: `${averagePercent}%`,
                  }}
                />

              </div>

            </div>

            {/* Needs Attention */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Needs Attention
                </span>

                <span className="font-bold text-red-600">
                  {poorPercent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-1000"
                  style={{
                    width: `${poorPercent}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* ================= AI Recommendation ================= */}

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">

          <h3 className="text-3xl font-bold">
            💡 AI Recommendation
          </h3>

          <p className="mt-5 text-lg leading-8 text-blue-100">
            {recommendation}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <h4 className="font-bold">
                📅 Attendance
              </h4>

              <p className="mt-2 text-blue-100">
                Encourage students to maintain attendance above 85%.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <h4 className="font-bold">
                📚 Assignments
              </h4>

              <p className="mt-2 text-blue-100">
                Ensure assignments are completed on time to improve predictions.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <h4 className="font-bold">
                🧠 Study Habits
              </h4>

              <p className="mt-2 text-blue-100">
                Promote consistent study routines and healthy sleep schedules.
              </p>

            </div>

          </div>

        </div>

      </>

    )}

  </section>
);

}

export default Dashboard;