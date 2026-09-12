import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";
import {
  FaGlobe,
  FaGithub,
  SiCodeigniter,
  SiCss3,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPowerbi,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "../components/icons";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

/* ─── Icon map ─────────────────────────────────────────────── */
const ICON_MAP = {
  tailwind: { icon: SiTailwindcss, color: "#38bdf8", label: "Tailwind" },
  flutter: { icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
  css: { icon: SiCss3, color: "#2965f1", label: "CSS3" },
  react: { icon: SiReact, color: "#61dafb", label: "React" },
  express: { icon: SiExpress, color: "#94a3b8", label: "Express" },
  dart: { icon: SiDart, color: "#00b4ab", label: "Dart" },
  nodejs: { icon: SiNodedotjs, color: "#22c55e", label: "Node.js" },
  mongodb: { icon: SiMongodb, color: "#16a34a", label: "MongoDB" },
  html: { icon: SiHtml5, color: "#ea580c", label: "HTML5" },
  firebase: { icon: SiFirebase, color: "#f59e0b", label: "Firebase" },
  nuxt: { icon: SiNuxtdotjs, color: "#00dc82", label: "Nuxt" },
  vue: { icon: SiVuedotjs, color: "#42b883", label: "Vue" },
  javascript: { icon: SiJavascript, color: "#f7df1e", label: "JavaScript" },
  typescript: { icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
  php: { icon: SiPhp, color: "#777bb4", label: "PHP" },
  codeigniter: { icon: SiCodeigniter, color: "#ee4326", label: "CodeIgniter" },
  mysql: { icon: SiMysql, color: "#00758f", label: "MySQL" },
  "power-bi": { icon: SiPowerbi, color: "#f2c811", label: "Power BI" },
};

/* ─── Filter categories ────────────────────────────────────── */
const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web & Full-Stack" },
  { id: "mobile", label: "Mobile (Flutter)" },
  { id: "tools", label: "Data & Tools" },
];

/* ─── Tilt card hook ────────────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 280,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 280,
    damping: 30,
  });

  const onMouseMove = (e) => {
    if (!ref.current) return;
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
  const entry = ICON_MAP[tag.name.toLowerCase()];
  if (!entry) {
    return (
      <span className="tag-pill" style={{ "--tag-color": "var(--text-subtle)" }}>
        <span>{tag.name}</span>
      </span>
    );
  }
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
  category,
  description,
  tags,
  image,
  source_code_link,
  web_link,
}) => {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="project-card-wrapper"
    >
      <motion.article
        ref={ref}
        className="project-card"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
      >
        {/* Image wrap */}
        <div className="card-image-wrap">
          <img src={image} alt={name} loading="lazy" className="card-img" />
          <div className="card-overlay">
            <div className="card-overlay-links">
              {web_link && (
                <a
                  href={web_link}
                  target="_blank"
                  rel="noreferrer"
                  className="overlay-btn"
                  title="Open live demo"
                >
                  <FaGlobe size={14} />
                  <span>Live Demo</span>
                </a>
              )}
              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noreferrer"
                  className="overlay-btn overlay-btn--ghost"
                  title="View source code on GitHub"
                >
                  <FaGithub size={14} />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
          {category && (
            <span className="card-category-badge">{category}</span>
          )}
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

          {/* Direct action links */}
          <div className="card-actions">
            {web_link && (
              <a
                href={web_link}
                target="_blank"
                rel="noreferrer"
                className="card-action-btn card-action-btn--primary"
                title="View live demo"
              >
                <FaGlobe size={13} />
                <span>Live Demo</span>
              </a>
            )}
            {source_code_link && (
              <a
                href={source_code_link}
                target="_blank"
                rel="noreferrer"
                className="card-action-btn card-action-btn--ghost"
                title="View source code"
              >
                <FaGithub size={13} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* ─── Section ───────────────────────────────────────────────── */
const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    if (activeCategory === "web") {
      return projects.filter(
        (p) => p.category === "Web" || p.category === "Full-Stack"
      );
    }
    if (activeCategory === "mobile") {
      return projects.filter((p) => p.category === "Mobile");
    }
    if (activeCategory === "tools") {
      return projects.filter(
        (p) => p.category === "Tools" || p.category === "Data"
      );
    }
    return projects;
  }, [activeCategory]);

  return (
    <>
      <style>{`
        .works-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
        }

        .works-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.05;
          color: var(--text-primary);
        }
        .works-headline em {
          font-style: normal;
          color: var(--accent);
        }

        .works-lead {
          margin-top: 18px;
          font-size: 16px;
          line-height: 1.8;
          max-width: 620px;
          color: var(--text-muted);
          font-weight: 300;
        }

        .works-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 36px;
        }
        .works-filter-btn {
          position: relative;
          padding: 8px 18px;
          border-radius: 9999px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .04em;
          border: 1px solid var(--border-subtle);
          background: var(--card-bg);
          color: var(--text-muted);
          cursor: pointer;
          transition: color .2s, border-color .2s;
          outline: none;
        }
        .works-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }
        .works-filter-btn.active {
          color: var(--accent);
          border-color: var(--border-hover);
          background: var(--accent-subtle);
          font-weight: 600;
        }

        .works-grid {
          margin-top: 36px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          align-items: stretch;
        }

        .project-card-wrapper {
          perspective: 1000px;
          display: flex;
        }

        .project-card {
          position: relative;
          width: 100%;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-card);
          transition: border-color .25s, box-shadow .25s;
          backdrop-filter: blur(8px);
        }
        .project-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-hover);
        }

        .card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--border-subtle);
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .45s cubic-bezier(.25,.46,.45,.94), filter .45s;
        }
        .project-card:hover .card-img {
          transform: scale(1.04);
        }

        .card-category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          background: rgba(15, 23, 42, 0.75);
          color: #ffffff;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8, 10, 15, 0.6);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity .25s ease;
          z-index: 2;
        }
        @media (hover: hover) {
          .project-card:hover .card-overlay {
            opacity: 1;
          }
        }
        .card-overlay-links {
          display: flex;
          gap: 10px;
        }
        .overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 99px;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: .05em;
          text-decoration: none;
          background: var(--accent);
          color: var(--accent-contrast);
          transition: transform .18s, background .18s;
        }
        .overlay-btn:hover {
          transform: scale(1.04);
          background: var(--accent-hover);
        }
        .overlay-btn--ghost {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
        }
        .overlay-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 21px;
          font-weight: 700;
          letter-spacing: -.02em;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .card-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-muted);
          font-weight: 300;
          margin-bottom: 18px;
          flex: 1;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .04em;
          padding: 4px 10px;
          border-radius: 99px;
          border: 1px solid var(--border-subtle);
          background: var(--accent-subtle);
          color: var(--tag-color, var(--text-muted));
          transition: background .2s, border-color .2s;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .card-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: .04em;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          transition: all .2s;
        }
        .card-action-btn--primary {
          background: var(--accent-subtle);
          color: var(--accent);
          border: 1px solid var(--border-hover);
        }
        .card-action-btn--primary:hover {
          background: var(--accent);
          color: var(--accent-contrast);
        }
        .card-action-btn--ghost {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }
        .card-action-btn--ghost:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }

        .works-footer {
          margin-top: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .works-footer-line {
          flex: 1;
          max-width: 140px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-medium));
        }
        .works-footer-line:last-child {
          background: linear-gradient(90deg, var(--border-medium), transparent);
        }
        .works-footer-text {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 300;
        }
        .works-footer-link {
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid var(--border-hover);
          padding-bottom: 1px;
          transition: border-color .2s, color .2s;
        }
        .works-footer-link:hover {
          color: var(--accent-hover);
        }
      `}</style>

      <div className="works-root">
        {/* Header — clean, bold headline without banned kicker */}
        <motion.div variants={textVariant()} className="works-header">
          <h2 className="works-headline">
            Selected <em>Projects.</em>
          </h2>
          <motion.p variants={fadeIn("", "", 0.1, 0.8)} className="works-lead">
            A curated selection of things I've built — spanning full-stack web
            apps, mobile experiences, and everything in between. Each project reflects
            how I think, architect, and ship.
          </motion.p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="works-filters" role="tablist" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? projects.length
                : cat.id === "web"
                ? projects.filter((p) => p.category === "Web" || p.category === "Full-Stack").length
                : cat.id === "mobile"
                ? projects.filter((p) => p.category === "Mobile").length
                : projects.filter((p) => p.category === "Tools" || p.category === "Data").length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat.id)}
                className={`works-filter-btn ${isSelected ? "active" : ""}`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-60 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid with layout animation */}
        <motion.div layout className="works-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.name} index={index} {...project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeIn("up", "", 0.3, 0.8)} className="works-footer">
          <div className="works-footer-line" />
          <p className="works-footer-text">
            More repositories on{" "}
            <a
              href="https://github.com/SfAtRhl"
              target="_blank"
              rel="noreferrer"
              className="works-footer-link"
            >
              github.com/SfAtRhl ↗
            </a>
          </p>
          <div className="works-footer-line" />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
