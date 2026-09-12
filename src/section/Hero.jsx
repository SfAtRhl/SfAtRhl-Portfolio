import { AnimatePresence, motion } from "framer-motion";
import { lazy, useEffect, useMemo, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { useCharacterAnimations } from "../components/context/CharacterAnimations";

const RobotCanvas = lazy(() => import("../components/canvas/Robot"));

const GREETINGS = ["Hello", "ⴰⵣⵓⵍ", "Bonjour", "Salam"];

const CURATED_ACTIONS = [
  { label: "Wave", name: "Wave" },
  { label: "Thumbs Up", name: "ThumbsUp" },
  { label: "Dance", name: "Dance" },
  { label: "Jump", name: "Jump" },
  { label: "Yes", name: "Yes" },
  { label: "Idle", name: "Idle" },
];

/* Staggered letter animation for greeting */
const LetterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.04,
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
      4500
    );
    return () => clearInterval(id);
  }, [greetings]);

  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();

  const currentWord = greetings[currentGreetingIndex];

  return (
    <>
      <style>{`
        .hero-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
        }

        .hero-greeting {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 7.5vw, 84px);
          letter-spacing: -.04em;
          line-height: 1.02;
          display: inline-flex;
          gap: 0;
          color: var(--text-primary);
        }
        .hero-greeting-letter { display: inline-block; }

        .hero-sub {
          font-size: clamp(15px, 1.35vw, 17px);
          line-height: 1.8;
          font-weight: 300;
          color: var(--text-muted);
          max-width: 480px;
        }
        .hero-sub strong {
          font-weight: 600;
          color: var(--text-primary);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-subtle);
          border: 1px solid var(--border-hover);
          border-radius: 99px;
          padding: 6px 14px 6px 10px;
          margin-bottom: 20px;
          width: fit-content;
        }
        .hero-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          border: none;
          outline: none;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }

        .hero-btn-primary {
          background: var(--accent);
          color: var(--accent-contrast);
          box-shadow: 0 4px 16px -2px rgba(22, 163, 74, 0.25);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 8px 24px -2px rgba(22, 163, 74, 0.4);
          transform: translateY(-2px);
        }

        .hero-btn-ghost {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-medium);
        }
        .hero-btn-ghost:hover {
          border-color: var(--border-hover);
          background: var(--accent-subtle);
          transform: translateY(-2px);
        }

        .anim-pill {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .06em;
          text-transform: uppercase;
          border-radius: 9999px;
          padding: 6px 14px;
          transition: all .2s;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
        }
        .anim-pill-active {
          background: var(--accent);
          color: var(--accent-contrast);
          border-color: var(--accent);
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }
        .anim-pill-inactive {
          background: var(--card-bg);
          color: var(--text-muted);
        }
        .anim-pill-inactive:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
          background: var(--accent-subtle);
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-subtle);
          transition: color .2s;
        }
        .scroll-indicator:hover {
          color: var(--accent);
        }
        .scroll-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .2em;
          text-transform: uppercase;
          opacity: .6;
        }
        .scroll-track {
          width: 2px;
          height: 40px;
          background: var(--border-medium);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }
        .scroll-thumb {
          position: absolute;
          top: 0;
          width: 100%;
          height: 40%;
          background: var(--accent);
          border-radius: 99px;
          animation: scroll-slide 1.8s ease-in-out infinite;
        }
        @keyframes scroll-slide {
          0%   { top: -40%; opacity: 1; }
          80%  { top: 140%; opacity: .4; }
          100% { top: -40%; opacity: 0; }
        }
      `}</style>

      <section className="hero-root relative w-full min-h-[calc(100vh-70px)] flex flex-col justify-between pt-10 md:pt-4 pb-6">
        <div className="w-full flex-1 flex md:flex-row flex-col justify-between items-center gap-8 md:gap-4">
          {/* ── Left column ── */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <div className="flex flex-row items-baseline gap-3 mb-4">
              <AnimatePresence mode="wait">
                <motion.h1
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
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Sub-headline */}
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              A self-taught full-stack developer who turns{" "}
              <strong>complex problems</strong> into clean, resilient digital
              products — architected with care and precision from frontend to backend.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-3 pt-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <motion.a
                href="/ait_rehail.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-btn hero-btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume ↗
              </motion.a>
              <motion.a
                href="#contact"
                className="hero-btn hero-btn-ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact me
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right column (3D Canvas + Controls) ── */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
            <div className="w-full h-[380px] sm:h-[430px] md:h-[560px] relative flex justify-center items-center">
              <RobotCanvas />
            </div>

            {/* Curated Interactive Animation Controls */}
            {animations.length > 0 && (
              <div className="mt-2 md:mt-0 md:absolute md:bottom-4 md:right-2 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-subtle)] shadow-md backdrop-blur-md z-10">
                {CURATED_ACTIONS.map(({ label, name }) => {
                  const targetIdx = animations.indexOf(name);
                  if (targetIdx === -1) return null;
                  const isActive = animationIndex === targetIdx;
                  return (
                    <button
                      key={name}
                      type="button"
                      aria-label={`Play ${label} animation`}
                      onClick={() => setAnimationIndex(targetIdx)}
                      className={`anim-pill ${
                        isActive ? "anim-pill-active" : "anim-pill-inactive"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Scroll indicator pointing to #projects ── */}
        <div className="w-full flex justify-center pt-6 pb-2">
          <a href="#projects" className="scroll-indicator" aria-label="Scroll to projects">
            <span className="scroll-label">Scroll</span>
            <div className="scroll-track">
              <div className="scroll-thumb" />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default SectionWrapper(Hero, "Whoami");
