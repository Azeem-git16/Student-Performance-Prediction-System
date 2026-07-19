import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PredictionForm from "./components/PredictionForm";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import History from "./components/History";
import Footer from "./components/Footer";

function App() {
  // Load saved theme preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        text-slate-900
        transition-colors
        duration-300
        dark:bg-slate-900
        dark:text-slate-100
      "
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="overflow-x-hidden">
        <Hero />

        <PredictionForm />

        <Dashboard />

        <Analytics />

        <History />
      </main>

      <Footer />
    </div>
  );
}

export default App;