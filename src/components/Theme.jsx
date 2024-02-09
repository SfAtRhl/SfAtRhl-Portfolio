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
    const html = document.querySelector("html");
    if (localStorage.getItem("theme") !== "light") {
      html?.classList.add("dark");
      setTheme("dark");
    } else {
      html?.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  const handleModeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
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
