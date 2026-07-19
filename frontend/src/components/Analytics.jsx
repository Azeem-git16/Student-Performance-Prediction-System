import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUserCheck,
  FaGraduationCap,
  FaBookOpen,
  FaMoon,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Analytics() {

  const [data, setData] = useState({
    average_attendance: 0,
    average_marks: 0,
    average_study_hours: 0,
    average_sleep_hours: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const { data } = await axios.get(
          `${API_URL}/analytics`
        );

        setData(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load analytics."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchAnalytics();

  }, []);

  const cards = [
    {
      title: "Average Attendance",
      value: `${Number(data.average_attendance).toFixed(1)}%`,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-slate-700",
      icon: <FaUserCheck />,
    },
    {
      title: "Average Marks",
      value: Number(data.average_marks).toFixed(1),
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-slate-700",
      icon: <FaGraduationCap />,
    },
    {
      title: "Study Hours",
      value: Number(data.average_study_hours).toFixed(1),
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-slate-700",
      icon: <FaBookOpen />,
    },
    {
      title: "Sleep Hours",
      value: Number(data.average_sleep_hours).toFixed(1),
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-slate-700",
      icon: <FaMoon />,
    },
  ];
  return (
  <section
    id="analytics"
    className="mx-auto mt-16 max-w-7xl px-6 transition-colors duration-300"
  >
    {/* Header */}

    <div className="mb-12 text-center">

      <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700">
        📈 Analytics Overview
      </span>

      <h2 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">
        Student Analytics
      </h2>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Academic trends calculated from all student predictions.
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

        {/* Analytics Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card,index)=>(

            <div
              key={index}
              className={`
                ${card.bg}
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-700
                p-7
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              `}
            >

              <div className={`text-4xl ${card.color}`}>
                {card.icon}
              </div>

              <p className="mt-6 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {card.title}
              </p>

              <h3 className="mt-3 text-4xl font-extrabold text-slate-900 dark:text-white">
                {card.value}
              </h3>

            </div>

          ))}

        </div>

        {/* Metric Progress */}

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">

          <h3 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
            Performance Metrics
          </h3>

          <div className="space-y-6">

            {/* Attendance */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Attendance
                </span>

                <span className="font-bold text-indigo-600">
                  {Number(data.average_attendance).toFixed(1)}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-1000"
                  style={{
                    width: `${data.average_attendance}%`,
                  }}
                />

              </div>

            </div>

            {/* Marks */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Average Marks
                </span>

                <span className="font-bold text-green-600">
                  {Number(data.average_marks).toFixed(1)}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-1000"
                  style={{
                    width: `${data.average_marks}%`,
                  }}
                />

              </div>

            </div>

            {/* Study Hours */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Study Hours
                </span>

                <span className="font-bold text-orange-600">
                  {Number(data.average_study_hours).toFixed(1)} hrs
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-1000"
                  style={{
                    width: `${(data.average_study_hours / 12) * 100}%`,
                  }}
                />

              </div>

            </div>

            {/* Sleep Hours */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Sleep Hours
                </span>

                <span className="font-bold text-purple-600">
                  {Number(data.average_sleep_hours).toFixed(1)} hrs
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-1000"
                  style={{
                    width: `${(data.average_sleep_hours / 12) * 100}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-2xl">

          <h3 className="text-3xl font-bold">
            📊 Analytics Summary
          </h3>

          <p className="mt-5 text-lg leading-8 text-indigo-100">
            These metrics represent the overall academic behaviour of students
            analysed by the AI model. Higher attendance, stronger academic
            performance, balanced study routines, and adequate sleep are
            generally associated with better prediction outcomes.
          </p>

        </div>

      </>

    )}

  </section>
);

}

export default Analytics;