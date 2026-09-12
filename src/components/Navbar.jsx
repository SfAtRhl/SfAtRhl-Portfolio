import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import Sidebar from "./Sidebar";
import Socials from "./Socials";
import ThemeSwitch from "./Theme";
import { RiMenu3Line, RxCross2 } from "./icons";

const Navbar = () => {
  const [active, setActive] = useState("Whoami");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Real-time Scroll Detection, Progress, and Scroll-Spy
  useEffect(() => {
    const sectionIds = ["Whoami", "projects", "contact"];
    const idToTitle = {
      Whoami: "Whoami",
      projects: "Work",
      contact: "Contact",
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop > 25);
      setScrollProgress(docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0);

      // Section detection with offset for navbar height
      const scrollPosition = scrollTop + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActive(idToTitle[sectionIds[i]] || sectionIds[i]);
            return;
          }
        }
      }
      setActive("Whoami");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (nav) => {
    setActive(nav.title);
    const targetElement = document.getElementById(nav.id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className={`relative flex items-center justify-between px-3.5 sm:px-5 h-14 rounded-2xl transition-all duration-300 ${
              scrolled
                ? "bg-[var(--nav-bg)] border border-[var(--nav-border)] shadow-lg backdrop-blur-xl"
                : "bg-[var(--card-bg)]/75 border border-[var(--border-subtle)] shadow-sm backdrop-blur-md"
            }`}
          >
            {/* Left: Brand / Monogram */}
            <a
              href="#Whoami"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick({ id: "Whoami", title: "Whoami" });
              }}
              className="group flex items-center gap-2.5 text-[var(--text-primary)] transition-transform hover:scale-[1.01]"
              aria-label="SfAtRhl Portfolio Home"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span
                className="font-extrabold text-base sm:text-lg tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                SfAtRhl
              </span>
              <span className="hidden xl:inline-flex items-center text-[10px] font-mono text-[var(--text-subtle)] px-2 py-0.5 rounded-md bg-[var(--border-subtle)]">
                // dev
              </span>
            </a>

            {/* Center: Floating Segmented Navigation Capsule */}
            <nav
              aria-label="Main Navigation"
              className="hidden sm:flex items-center p-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
            >
              {navLinks.map((nav) => {
                const isActive = active === nav.title || active === nav.id;
                return (
                  <a
                    key={nav.id}
                    href={`#${nav.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(nav);
                    }}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? "text-[var(--text-primary)] font-semibold"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-[var(--card-bg)] border border-[var(--border-hover)] shadow-xs"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{nav.title}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Actions, Socials, Theme & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
           

              <Socials className="hidden md:flex" />

              <ThemeSwitch />

              {/* Direct Quick CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick({ id: "contact", title: "Contact" });
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Let's Talk</span>
                <span className="text-[11px]">↗</span>
              </a>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--accent-subtle)] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <RxCross2 size={18} /> : <RiMenu3Line size={18} />}
              </button>
            </div>

            {/* Micro-reading progress hairline */}
            <div className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full overflow-hidden pointer-events-none opacity-90">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] transition-transform duration-75 origin-left"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          active={active}
          setActive={setActive}
        />
      </header>
    </>
  );
};

export default Navbar;
