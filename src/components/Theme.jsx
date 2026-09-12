import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    html.classList.toggle("dark", initialTheme === "dark");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [mounted, theme]);

  const handleModeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleModeToggle}
      className="relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-lg border border-[var(--border-subtle)] hover:border-[var(--border-medium)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faMoon} className="text-amber-500 text-base" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSun} className="text-amber-400 text-base" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeSwitch;
