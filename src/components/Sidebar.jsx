import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Socials from "./Socials";
import { RxCross2, RiMenu3Line } from "./icons";

const Sidebar = ({ isOpen, setIsOpen, setActive, pathName }) => {
  return (
    <>
      <div className="z-20 absolute right-8">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.button
              className="text-xl md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              layout
              key="cross"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 1.2 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
            >
              {" "}
              <RxCross2 size={28} />
            </motion.button>
          ) : (
            <motion.button
              className="text-xl md:hidden z-20  dark:text-white text-black"
              onClick={() => setIsOpen(!isOpen)}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: 10, opacity: 0 }}
              whileTap={{ scale: 1.2 }}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              key="menu"
            >
              {" "}
              <RiMenu3Line size={28} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`fixed ${
          isOpen ? "z-[11] backdrop-blur-sm bg-slate-900/60" : "invisible"
        } right-0 top-0 h-full w-full bg-transparent`}
      >
        <div
          className={` md:hidden text-xl sm:text-2xl bg-tertiary-black min-w-[300px] absolute right-0 h-full shadow-lg shadow-slate-900/50 dark:shadow-slate-200/50 border-l border-slate-900 dark:border-slate-200 ${
            isOpen ? "translate-x-0" : "invisible translate-x-full"
          } transition-all flex flex-col justify-center items-center gap-y-20 p-4`}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(!open);
              setActive("Whoami");
            }}
          >
            <a
              className={`${pathName === "Whoami" ? "font-bold" : ""}`}
              href={"Whoami"}
            >
              Whoami
            </a>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(!open);
              setActive("Work");
            }}
          >
            <a
              className={`${pathName === "Work" ? "font-bold" : ""}`}
              href={"#projects"}
            >
              Projects
            </a>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(!open);
              setActive("Contact");
            }}
          >
            <a
              className={`${pathName === "Contact" ? "font-bold" : ""}`}
              href={"#contact"}
            >
              Contact Me
            </a>
          </motion.div>
          <Socials className="!flex absolute bottom-20 !text-4xl space-x-2 " />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
