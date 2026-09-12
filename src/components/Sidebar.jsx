import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Socials from "./Socials";
import ThemeSwitch from "./Theme";
import { RxCross2 } from "./icons";
import { navLinks } from "../constants";

const Sidebar = ({ isOpen, setIsOpen, active, setActive }) => {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md sm:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-[340px] p-6 flex flex-col justify-between sm:hidden shadow-2xl overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderLeft: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
              <a
                href="#Whoami"
                onClick={() => {
                  setActive("Whoami");
                  setIsOpen(false);
                }}
                className="font-bold text-base tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                </span>
                <span>SfAtRhl</span>
                <span className="text-[10px] font-mono text-[var(--text-subtle)] px-1.5 py-0.5 rounded bg-[var(--border-subtle)]">
                  // dev
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-subtle)] transition-colors"
                aria-label="Close menu"
              >
                <RxCross2 size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-2.5 my-auto py-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1">
                Navigation
              </span>
              {navLinks.map((link, idx) => {
                const isActive = active === link.title || active === link.id;
                const indexFormatted = `0${idx + 1}`;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActive(link.title);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--border-hover)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-50">
                        {indexFormatted}
                      </span>
                      <span className="font-semibold text-base">
                        {link.title}
                      </span>
                    </div>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-sm" />
                    ) : (
                      <span className="text-xs opacity-40">→</span>
                    )}
                  </motion.a>
                );
              })}

              <a
                href="#contact"
                onClick={() => {
                  setActive("Contact");
                  setIsOpen(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-[var(--accent-contrast)] shadow-md transition-transform active:scale-[0.98]"
              >
                <span>Let's Talk</span>
                <span>↗</span>
              </a>
            </nav>

            {/* Footer */}
            <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-subtle)]">
                  Appearance
                </span>
                <ThemeSwitch />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                  Connect
                </span>
                <Socials />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
