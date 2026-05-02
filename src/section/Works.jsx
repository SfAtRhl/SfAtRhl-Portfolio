import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import {
  FaGlobe,
  FaGithub,
  SiCss3,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from "../components/icons";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

/* ─── Icon map ─────────────────────────────────────────────── */
const ICON_MAP = {
  tailwind: { icon: SiTailwindcss, color: "#38bdf8", label: "Tailwind" },
  flutter: { icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
  css: { icon: SiCss3, color: "#2965f1", label: "CSS3" },
  react: { icon: SiReact, color: "#61dafb", label: "React" },
  express: { icon: SiExpress, color: "#ffffff", label: "Express" },
  dart: { icon: SiDart, color: "#00b4ab", label: "Dart" },
  nodejs: { icon: SiNodedotjs, color: "#6da55f", label: "Node.js" },
  mongodb: { icon: SiMongodb, color: "#4ea94b", label: "MongoDB" },
  html: { icon: SiHtml5, color: "#e34f26", label: "HTML5" },
  firebase: { icon: SiFirebase, color: "#ffca28", label: "Firebase" },
};

/* ─── Tilt card hook ────────────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ─── Tag pill ──────────────────────────────────────────────── */
const TagPill = ({ tag }) => {
  const entry = ICON_MAP[tag.name];
  if (!entry) return null;
  const Icon = entry.icon;
  return (
    <span className="tag-pill" style={{ "--tag-color": entry.color }}>
      <Icon size={12} />
      <span>{entry.label}</span>
    </span>
  );
};

/* ─── Project card ──────────────────────────────────────────── */
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  web_link,
}) => {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      variants={fadeIn("up", "", index * 0.15, 0.6)}
      className="project-card-wrapper"
    >
      <motion.article
        ref={ref}
        className="project-card"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Index number */}
        <span className="card-index">0{index + 1}</span>

        {/* Image */}
        <div className="card-image-wrap">
          <img src={image} alt={name} loading="lazy" className="card-img" />
          {/* Cinematic overlay */}
          <div className="card-overlay">
            <div className="card-overlay-links">
              {web_link && (
                <a
                  href={web_link}
                  target="_blank"
                  rel="noreferrer"
                  className="overlay-btn"
                  title="Live demo"
                >
                  <FaGlobe size={16} />
                  <span>Live</span>
                </a>
              )}
              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noreferrer"
                  className="overlay-btn overlay-btn--ghost"
                  title="Source code"
                >
                  <FaGithub size={16} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <p className="card-desc">{description}</p>
          <div className="card-tags">
            {tags.map((tag) => (
              <TagPill key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* ─── Section ───────────────────────────────────────────────── */
const Works = () => (
  <>
    <style>{`
      /* ── Typography & palette ── */
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

      .works-root {
        font-family: 'DM Sans', sans-serif;
        color: var(--works-text, #f8fafc);
        --works-text: #f8fafc;
        --works-muted: rgba(248,250,252,0.66);
        --works-accent: #4ade80;
        --works-card-bg: rgba(255,255,255,0.03);
        --works-card-border: rgba(255,255,255,0.08);
        --works-card-hover-border: rgba(74,222,128,0.25);
        --works-tag-border: rgba(255,255,255,0.08);
        --works-tag-bg: rgba(255,255,255,0.04);
        --works-overlay-ghost-border: rgba(255,255,255,0.5);
        --works-overlay-ghost-text: #f8fafc;
        --works-footer-line: rgba(255,255,255,0.15);
      }

      :root:not(.dark) .works-root {
        --works-text: #0f172a;
        --works-muted: rgba(15,23,42,0.72);
        --works-card-bg: rgba(15,23,42,0.03);
        --works-card-border: rgba(15,23,42,0.1);
        --works-card-hover-border: rgba(74,222,128,0.38);
        --works-tag-border: rgba(15,23,42,0.12);
        --works-tag-bg: rgba(15,23,42,0.04);
        --works-overlay-ghost-border: rgba(15,23,42,0.45);
        --works-overlay-ghost-text: #0f172a;
        --works-footer-line: rgba(15,23,42,0.18);
      }

      /* ── Header ── */
      .works-header { position: relative; }
      .works-eyebrow {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--works-accent);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .works-eyebrow::before {
        content: '';
        width: 28px; height: 1px;
        background: var(--works-accent);
      }
      .works-headline {
        font-family: 'Syne', sans-serif;
        font-size: clamp(42px, 6vw, 72px);
        font-weight: 800;
        letter-spacing: -.03em;
        line-height: 1;
        color: inherit;
      }
      .works-headline em {
        font-style: normal;
        color: var(--works-accent);
      }
      .works-lead {
        margin-top: 20px;
        font-size: 15px;
        line-height: 1.8;
        max-width: 600px;
        color: var(--works-muted);
        font-weight: 300;
      }

      /* ── Grid ── */
      .works-grid {
        margin-top: 64px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 28px;
        align-items: start;
      }

      /* ── Card wrapper ── */
      .project-card-wrapper { perspective: 1000px; }

      /* ── Card ── */
      .project-card {
        position: relative;
        background: var(--works-card-bg);
        border: 1px solid var(--works-card-border);
        border-radius: 20px;
        overflow: hidden;
        cursor: default;
        transition: border-color .3s, box-shadow .3s;
        backdrop-filter: blur(8px);
      }
      .project-card:hover {
        border-color: var(--works-card-hover-border);
        box-shadow: 0 0 0 1px rgba(74,222,128,0.1),
                    0 24px 60px rgba(0,0,0,0.5);
      }

      /* ── Index number ── */
      .card-index {
        position: absolute;
        top: 16px; left: 20px;
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: .12em;
        color: var(--works-accent);
        z-index: 10;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(4px);
        padding: 3px 8px;
        border-radius: 99px;
        border: 1px solid rgba(74,222,128,0.25);
      }

      /* ── Image ── */
      .card-image-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        overflow: hidden;
      }
      .card-img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform .5s cubic-bezier(.25,.46,.45,.94), filter .5s;
        filter: brightness(.9) saturate(.85);
      }
      .project-card:hover .card-img {
        transform: scale(1.06);
        filter: brightness(.5) saturate(.6);
      }

      /* ── Overlay ── */
      .card-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity .35s;
      }
      .project-card:hover .card-overlay { opacity: 1; }
      .card-overlay-links {
        display: flex;
        gap: 12px;
      }
      .overlay-btn {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 10px 20px;
        border-radius: 99px;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .06em;
        text-decoration: none;
        background: var(--works-accent);
        color: #0a0c10;
        transition: transform .2s, background .2s;
      }
      .overlay-btn:hover { transform: scale(1.05); background: #86efac; }
      .overlay-btn--ghost {
        background: transparent;
        border: 1.5px solid var(--works-overlay-ghost-border);
        color: var(--works-overlay-ghost-text);
      }
      .overlay-btn--ghost:hover { background: rgba(74,222,128,0.1); }

      /* ── Body ── */
      .card-body { padding: 22px 24px 24px; }
      .card-title {
        font-family: 'Syne', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -.02em;
        margin-bottom: 10px;
        color: inherit;
      }
      .card-desc {
        font-size: 13.5px;
        line-height: 1.75;
        color: var(--works-muted);
        font-weight: 300;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 18px;
      }

      /* ── Tags ── */
      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }
      .tag-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-family: 'DM Mono', monospace;
        font-size: 10.5px;
        letter-spacing: .06em;
        padding: 4px 10px;
        border-radius: 99px;
        border: 1px solid var(--works-tag-border);
        background: var(--works-tag-bg);
        color: var(--tag-color, #aaa);
        transition: background .2s, border-color .2s;
      }
      .tag-pill:hover {
        background: color-mix(in srgb, var(--tag-color, #aaa) 15%, transparent);
        border-color: var(--tag-color, #aaa);
      }

      /* ── Footer ── */
      .works-footer {
        margin-top: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
      }
      .works-footer-line {
        flex: 1;
        max-width: 120px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--works-footer-line));
      }
      .works-footer-line:last-child {
        background: linear-gradient(90deg, var(--works-footer-line), transparent);
      }
      .works-footer-text {
        font-size: 13.5px;
        color: var(--works-muted);
        font-weight: 300;
      }
      .works-footer-link {
        color: var(--works-accent);
        font-family: 'DM Mono', monospace;
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        letter-spacing: .04em;
        border-bottom: 1px solid rgba(74,222,128,0.3);
        padding-bottom: 1px;
        transition: border-color .2s, opacity .2s;
      }
      .works-footer-link:hover { border-color: #4ade80; opacity: .85; }
    `}</style>

    <div className="works-root">
      {/* Header */}
      <motion.div variants={textVariant()} className="works-header">
        <p className="works-eyebrow">My work</p>
        <h2 className="works-headline">
          Selected <em>Projects.</em>
        </h2>
        <motion.p variants={fadeIn("", "", 0.15, 1)} className="works-lead">
          A curated selection of things I've built — spanning full-stack web
          apps, mobile experiences, and everything in between. Each one reflects
          how I think, solve, and ship.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div className="works-grid">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* Footer */}
      <motion.div variants={fadeIn("up", "", 0.4, 1)} className="works-footer">
        <div className="works-footer-line" />
        <p className="works-footer-text">
          More on{" "}
          <a
            href="https://github.com/SfAtRhl"
            target="_blank"
            rel="noreferrer"
            className="works-footer-link"
          >
            github/SfAtRhl
          </a>
        </p>
        <div className="works-footer-line" />
      </motion.div>
    </div>
  </>
);

export default SectionWrapper(Works, "projects");
