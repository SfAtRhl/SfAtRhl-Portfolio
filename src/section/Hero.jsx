import { Button } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useEffect, useMemo, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, slideIn } from "../utils/motion";
import { useCharacterAnimations } from "../components/context/CharacterAnimations";
const RobotCanvas = lazy(() => import("../components/canvas/Robot"));

const GREETINGS = ["Hello", "ⴰⵣⵓⵍ", "Bonjour", "Salam"];

/* Staggered letter animation for the greeting */
const LetterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.04,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const Hero = () => {
  const greetings = useMemo(() => GREETINGS, []);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentGreetingIndex((i) => (i + 1) % greetings.length),
      5000
    );
    return () => clearInterval(id);
  }, [greetings]);

  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();

  const currentWord = greetings[currentGreetingIndex];

  return (
    <>
      {/* ── Injected styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@500&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--hero-text, #f8fafc);
          --hero-text: #f8fafc;
          --hero-muted: rgba(248,250,252,0.7);
          --hero-accent: #4ade80;
          --hero-accent-contrast: #0a0c10;
          --hero-ghost-border: rgba(255,255,255,0.35);
          --hero-ghost-border-hover: rgba(255,255,255,0.7);
          --hero-subtle-surface: rgba(255,255,255,0.05);
          --hero-subtle-surface-hover: rgba(255,255,255,0.1);
          --hero-subtle-text: rgba(255,255,255,0.55);
          --hero-subtle-text-hover: rgba(255,255,255,0.85);
          --hero-track: rgba(255,255,255,0.12);
        }

        :root:not(.dark) .hero-root {
          --hero-text: #111827;
          --hero-muted: rgba(17,24,39,0.78);
          --hero-ghost-border: rgba(15,23,42,0.28);
          --hero-ghost-border-hover: rgba(15,23,42,0.55);
          --hero-subtle-surface: rgba(15,23,42,0.04);
          --hero-subtle-surface-hover: rgba(15,23,42,0.1);
          --hero-subtle-text: rgba(15,23,42,0.6);
          --hero-subtle-text-hover: rgba(15,23,42,0.92);
          --hero-track: rgba(15,23,42,0.18);
        }

        /* Greeting word */
        .hero-greeting {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(52px, 8vw, 88px);
          letter-spacing: -.04em;
          line-height: 1;
          display: inline-flex;
          gap: 0;
        }
        .hero-greeting-letter { display: inline-block; }

        /* Subtext */
        .hero-sub {
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.85;
          font-weight: 300;
          color: var(--hero-muted);
          max-width: 440px;
        }
        .hero-sub strong { font-weight: 500; opacity: 1; color: var(--hero-text); }

        /* CTA buttons */
        .hero-cta-wrap { display: flex; gap: 12px; padding-top: 28px; }

        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          border: none;
          outline: none;
          transition: transform .2s, box-shadow .2s;
          overflow: hidden;
        }
        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform .5s;
        }
        .hero-btn:hover::before { transform: translateX(100%); }

        .hero-btn-primary {
          background: var(--hero-accent);
          color: var(--hero-accent-contrast);
          box-shadow: 0 0 0 0 rgba(74,222,128,0);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 0 24px 4px rgba(74,222,128,0.35);
          transform: translateY(-2px);
        }

        .hero-btn-ghost {
          background: transparent;
          color: var(--hero-text);
          border: 1.5px solid var(--hero-ghost-border);
        }
        .hero-btn-ghost:hover {
          border-color: var(--hero-ghost-border-hover);
          transform: translateY(-2px);
        }

        /* Availability badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .12em;
          color: var(--hero-accent);
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.2);
          border-radius: 99px;
          padding: 5px 14px 5px 10px;
          margin-bottom: 24px;
          width: fit-content;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--hero-accent);
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,.6); }
          50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        /* Animation buttons */
        .anim-btn {
          font-family: 'DM Mono', monospace !important;
          font-size: 10px !important;
          letter-spacing: .06em !important;
          text-transform: uppercase;
          border-radius: 8px !important;
          padding: 6px 14px !important;
          transition: all .2s !important;
          border: 1px solid var(--hero-ghost-border) !important;
        }
        .anim-btn-active {
          background: var(--hero-accent) !important;
          color: var(--hero-accent-contrast) !important;
          border-color: var(--hero-accent) !important;
        }
        .anim-btn-inactive {
          background: var(--hero-subtle-surface) !important;
          color: var(--hero-subtle-text) !important;
        }
        .anim-btn-inactive:hover {
          background: var(--hero-subtle-surface-hover) !important;
          color: var(--hero-subtle-text-hover) !important;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .scroll-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: .2em;
          text-transform: uppercase;
          opacity: .3;
          writing-mode: horizontal-tb;
        }
        .scroll-track {
          width: 1.5px;
          height: 48px;
          background: var(--hero-track);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }
        .scroll-thumb {
          position: absolute;
          top: 0;
          width: 100%;
          height: 40%;
          background: var(--hero-accent);
          border-radius: 99px;
          animation: scroll-slide 1.8s ease-in-out infinite;
        }
        @keyframes scroll-slide {
          0%   { top: -40%; opacity: 1; }
          80%  { top: 140%; opacity: .4; }
          100% { top: -40%; opacity: 0; }
        }
      `}</style>

      <section className="hero-root relative w-full h-screen">
        <div
          className={`absolute inset-0 top-[140px] md:top-0 max-w-7xl mx-auto ${styles.paddingX} flex md:flex-row flex-col justify-center items-center`}
        >
          {/* ── Left column ── */}
          <div className="md:w-1/2 flex flex-col justify-center">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <div className="flex flex-row items-center gap-3 mb-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreetingIndex}
                  className="hero-greeting"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentWord.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="hero-greeting-letter"
                      custom={i}
                      variants={LetterVariants}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreetingIndex}
                  initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: [10, -10, 10, -8, 0],
                    transition: { duration: 0.6, delay: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    transition: { duration: 0.15 },
                  }}
                  style={{
                    fontSize: "clamp(36px,5vw,64px)",
                    userSelect: "none",
                  }}
                >
                  👋
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Sub-headline */}
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              A self-taught developer who turns{" "}
              <strong>complex problems</strong> into clean, scalable digital
              experiences — one thoughtful line of code at a time.
              <br className="sm:block hidden" />
              <span style={{ opacity: 0.5, fontSize: "0.88em" }}>
                (Yes, I debug other people's code. My own? That's a different
                story. 😣)
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-wrap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.a
                href="/ait_rehail.pdf"
                target="_blank"
                className="hero-btn hero-btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume ↗
              </motion.a>
              <motion.a
                href="#contact"
                className="hero-btn hero-btn-ghost"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact me
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <div className="md:w-1/2 w-full h-3/4 relative md:p-0 max-h-min">
            <motion.div
              variants={slideIn("right", "tween", 0.4, 1)}
              className="md:h-full h-[350px] flex justify-center items-center"
            >
              <RobotCanvas />

              {/* Animation controls */}
              <div className="hidden md:flex absolute bottom-14 right-0 px-4 flex-wrap gap-2 justify-end">
                {animations.map((animation, index) => (
                  <Button
                    key={animation}
                    aria-label={animation}
                    className={`anim-btn ${
                      index === animationIndex
                        ? "anim-btn-active"
                        : "anim-btn-inactive"
                    }`}
                    onClick={() => setAnimationIndex(index)}
                  >
                    {animation}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <a href="#about" className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-track">
            <div className="scroll-thumb" />
          </div>
        </a>
      </section>
    </>
  );
};

export default SectionWrapper(Hero, "Whoami");
