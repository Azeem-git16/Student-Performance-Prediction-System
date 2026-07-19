function Footer() {
  const links = [
    { name: "Home", href: "#home" },
    { name: "Predict", href: "#predict" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "History", href: "#history" },
  ];

  const techStack = [
    "React",
    "FastAPI",
    "Tailwind CSS",
    "Scikit-learn",
    "SQLite",
  ];

  return (
    <footer
      id="footer"
      className="
        mt-20
        border-t
        border-slate-200
        dark:border-slate-700
        bg-gradient-to-r
        from-slate-50
        via-white
        to-slate-100
        dark:from-slate-900
        dark:via-slate-950
        dark:to-slate-900
        text-slate-900
        dark:text-white
        transition-colors
        duration-300
        "
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Branding */}

          <div>

            <h2 className="text-2xl font-bold">
              🎓 Student Performance Prediction
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              AI-powered academic performance prediction system built using
              modern web technologies to help analyse and improve student
              outcomes.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {links.map((link) => (

                <li key={link.name}>

                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* Technology */}

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Built With
            </h3>

            <div className="flex flex-wrap gap-3">

              {techStack.map((tech) => (

                <span
                  key={tech}
                  className="
                    rounded-full
                    border
                    bg-white
                    dark:bg-slate-800
                    border-slate-300
                    dark:border-slate-600
                    text-slate-700
                    dark:text-white
                    px-4
                    py-2
                    text-sm
                    transition
                    hover:border-blue-500
                    hover:bg-blue-600
                  "
                >
                  {tech}
                </span>

              ))}

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-slate-300 dark:bg-slate-700" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400 md:flex-row">

          <p>
            © 2026 Student Performance Prediction System. All Rights Reserved.
          </p>

          <p>
            Developed using React • FastAPI • Machine Learning
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;