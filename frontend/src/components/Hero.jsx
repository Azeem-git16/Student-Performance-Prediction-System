import hero from "../assets/images/hero.png";
import {
  FaBrain,
  FaChartLine,
  FaUserGraduate,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaBrain className="text-3xl text-blue-600" />,
    value: "95%",
    label: "Prediction Accuracy",
  },
  {
    icon: <FaUserGraduate className="text-3xl text-green-600" />,
    value: "1000+",
    label: "Students Analysed",
  },
  {
    icon: <FaChartLine className="text-3xl text-purple-600" />,
    value: "AI",
    label: "Smart Analytics",
  },
];

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-indigo-100
        py-24
        transition-colors
        duration-300
        dark:from-slate-900
        dark:via-slate-950
        dark:to-slate-900
      "
    >
      {/* Background Blur */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left */}

        <div>
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-100/80
              px-5
              py-2
              text-sm
              font-semibold
              text-blue-700
              backdrop-blur
              dark:border-blue-700
              dark:bg-blue-900/30
              dark:text-blue-300
            "
          >
            🤖 AI Powered Prediction System
          </span>

          <h1
            className="
              mt-6
              text-4xl
              font-extrabold
              leading-tight
              text-slate-900
              transition-colors
              duration-300
              sm:text-5xl
              lg:text-6xl
              dark:text-white
            "
          >
            Predict Student Performance
            <br />

            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              with Artificial Intelligence
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-slate-600
              dark:text-slate-300
            "
          >
            Empower educators and students with AI-driven insights.
            Analyse attendance, assignments, study habits and previous
            academic performance to generate intelligent predictions
            with high accuracy.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#predict"
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                transition
                duration-300
                hover:scale-105
                hover:bg-blue-700
              "
            >
              🚀 Predict Now
            </a>

            <a
              href="#dashboard"
              className="
                rounded-xl
                border-2
                border-blue-600
                px-6
                py-3
                font-semibold
                text-blue-600
                transition
                duration-300
                hover:bg-blue-50
                dark:border-blue-400
                dark:text-blue-400
                dark:hover:bg-slate-800
              "
            >
              📊 Dashboard
            </a>
          </div>

          {/* Features */}

          <div className="mt-10 flex flex-wrap gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <span>✓ Machine Learning Powered</span>
            <span>✓ Real-Time Prediction</span>
            <span>✓ Interactive Dashboard</span>
            <span>✓ Explainable AI</span>
          </div>

          {/* Statistics */}

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/80
                  p-6
                  text-center
                  shadow-lg
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                  dark:border-slate-700
                  dark:bg-slate-800/80
                "
              >
                <div className="mb-3 flex justify-center">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}

        <div className="flex justify-center">
          <img
            src={hero}
            alt="AI Student Performance Prediction"
            className="
              w-full
              max-w-xl
              drop-shadow-2xl
              transition-transform
              duration-500
              hover:scale-105
            "
            loading="eager"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;