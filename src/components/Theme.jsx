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
      className=" z-10 !text-2xl dark:text-white text-black "
      aria-label={"Theme"}
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            layout
            key="moon"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -10, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
            onClick={handleModeToggle}
          >
            {" "}
            <FontAwesomeIcon icon={faMoon} />
          </motion.div>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 180 }}
            exit={{ y: 10, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
            key="sun"
            onClick={handleModeToggle}
          >
            {" "}
            <FontAwesomeIcon icon={faSun} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeSwitch;
