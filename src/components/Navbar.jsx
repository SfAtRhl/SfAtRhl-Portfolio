import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { styles } from "../styles";
import Sidebar from "./Sidebar";
import Socials from "./Socials";
import ThemeSwitch from "./Theme";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-[10] shadow-sm   ${
        scrolled ? "dark:bg-primary bg-white" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <ThemeSwitch />

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav, index) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              key={nav.id}
              className={`${
                active === nav.title
                  ? "dark:text-white text-black"
                  : "text-secondary"
              } dark:hover:text-white hover:text-black text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </motion.li>
          ))}
        </ul>
        <Socials className="sm:!flex !text-2xl md:space-x-4 space-x-2 items-center dark:text-white text-black " />

        {/* Button  Mobile Version*/}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setActive={setActive}
            pathName={active}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title
                      ? " dark:text-white text-primary"
                      : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
