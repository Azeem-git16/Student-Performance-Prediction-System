import { useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Predict", href: "#predict" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "History", href: "#history" },
    { name: "About", href: "#footer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "predict", "dashboard", "history", "footer"];

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          break;
        }
      }

      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl border-b border-slate-200 dark:border-slate-700"
          : "bg-transparent"
      }`}
    >
      {/* Progress Bar */}

      <div
        className="absolute left-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}

        <a
          href="#home"
          className="group flex items-center gap-3"
        >
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2 shadow-lg">
            <FaBrain className="text-2xl text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              Student Performance AI
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Prediction System
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative pb-1 font-medium transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
              }`}
            >
              {item.name}

              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white shadow-lg transition hover:scale-110 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            aria-label="Toggle Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <a
            href="#predict"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-2xl"
          >
            🚀 Predict Now
          </a>
        </div>

        {/* Mobile Toggle */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? (
            <HiX className="text-3xl text-slate-700 dark:text-white" />
          ) : (
            <HiMenu className="text-3xl text-slate-700 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`mx-4 mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/95 md:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="p-5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block border-b py-3 transition ${
                activeSection === item.href.substring(1)
                  ? "font-semibold text-blue-600"
                  : "text-slate-700 hover:text-blue-600 dark:text-slate-300"
              }`}
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium shadow-md transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <a
            href="#predict"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            🚀 Predict Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;