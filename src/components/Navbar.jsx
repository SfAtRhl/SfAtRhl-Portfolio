import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { navLinks } from "../constants";
import { styles } from "../styles";
import Sidebar from "./Sidebar";
import Socials from "./Socials";
import ThemeSwitch from "./Theme";

/* ── Active link underline ── */
const NavLink = ({ nav, isActive, onClick }) => (
  <motion.li
    key={nav.id}
    className="nav-item"
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(nav.title)}
  >
    <a
      href={`#${nav.id}`}
      className={`nav-link ${isActive ? "nav-link--active" : ""}`}
    >
      {nav.title}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="nav-underline"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  </motion.li>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Close sidebar on outside click */
  useEffect(() => {
    const handler = () => {
      if (isOpen) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* Scroll detection + progress bar */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 60);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Mono:wght@500&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Nav shell ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background .35s, backdrop-filter .35s, border-color .35s, box-shadow .35s;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar--scrolled {
          background: rgba(10, 12, 16, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }
        .navbar--top {
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        /* Light mode overrides */
        :root:not(.dark) .navbar--scrolled {
          background: rgba(255,255,255,0.88);
          border-bottom-color: rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }

        /* ── Inner ── */
        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
        }

        /* ── Logo / wordmark ── */
        .navbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -.02em;
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .navbar-logo-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-dot 2.2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,.55); }
          50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }

        /* ── Nav links ── */
        .nav-list {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0; padding: 0;
        }
        .nav-item { position: relative; }
        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 400;
          letter-spacing: .01em;
          text-decoration: none;
          color: inherit;
          opacity: .5;
          transition: opacity .2s, background .2s;
        }
        .nav-link:hover { opacity: .85; background: rgba(255,255,255,0.05); }
        .nav-link--active { opacity: 1; font-weight: 500; }

        /* Sliding underline */
        .nav-underline {
          position: absolute;
          bottom: -2px; left: 14px; right: 14px;
          height: 1.5px;
          border-radius: 99px;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
        }

        /* ── Right cluster ── */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ── Scroll progress bar ── */
        .scroll-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #4ade80, #86efac);
          border-radius: 0 99px 99px 0;
          box-shadow: 0 0 8px rgba(74,222,128,0.5);
          transition: width .1s linear;
          pointer-events: none;
        }

        /* ── Mobile hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          padding: 0;
          transition: background .2s, border-color .2s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }
        .hamburger-line {
          width: 16px;
          height: 1.5px;
          background: currentColor;
          border-radius: 99px;
          transition: transform .3s, opacity .3s, width .3s;
          transform-origin: center;
        }
        .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; width: 0; }
        .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        @media (max-width: 640px) {
          .nav-list-desktop { display: none !important; }
          .hamburger { display: flex; }
        }
        @media (min-width: 641px) {
          .hamburger { display: none; }
        }

        /* ── Mobile dropdown ── */
        .mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 16px;
          min-width: 180px;
          background: rgba(14, 17, 24, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        :root:not(.dark) .mobile-menu {
          background: rgba(255,255,255,0.96);
          border-color: rgba(0,0,0,0.08);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          color: inherit;
          opacity: .6;
          transition: opacity .2s, background .2s;
          cursor: pointer;
        }
        .mobile-nav-item:hover { opacity: 1; background: rgba(255,255,255,0.05); }
        .mobile-nav-item--active { opacity: 1; font-weight: 500; }
        .mobile-nav-item--active .mobile-nav-dot { background: #4ade80; }
        .mobile-nav-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 6px 0;
        }
        :root:not(.dark) .mobile-divider { background: rgba(0,0,0,0.06); }
      `}</style>

      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--top"}`}
      >
        {/* Scroll progress bar */}
        <div className="scroll-bar" style={{ width: `${scrollProgress}%` }} />

        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="navbar-logo" onClick={() => setActive("")}>
            <span className="navbar-logo-dot" />
            SfAtRhl
          </a>

          {/* Desktop nav links */}
          <ul className="nav-list nav-list-desktop">
            {navLinks.map((nav) => (
              <NavLink
                key={nav.id}
                nav={nav}
                isActive={active === nav.title}
                onClick={setActive}
              />
            ))}
          </ul>

          {/* Right side */}
          <div className="navbar-right">
            <Socials className="hidden sm:flex text-xl gap-3 items-center opacity-60 hover:opacity-100 transition-opacity" />
            <ThemeSwitch />

            {/* Mobile hamburger */}
            <button
              className={`hamburger ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map((nav, i) => (
                <React.Fragment key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    className={`mobile-nav-item ${
                      active === nav.title ? "mobile-nav-item--active" : ""
                    }`}
                    onClick={() => {
                      setActive(nav.title);
                      setIsOpen(false);
                    }}
                  >
                    <span className="mobile-nav-dot" />
                    {nav.title}
                  </a>
                  {i < navLinks.length - 1 && (
                    <div className="mobile-divider" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar for mobile (existing component) */}
        <div className="sm:hidden">
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setActive={setActive}
            pathName={active}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
