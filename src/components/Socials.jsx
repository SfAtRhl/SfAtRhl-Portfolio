import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "./icons";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/SfAtRhl",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soufyane-ait-rehail/",
    icon: FaLinkedin,
  },
  {
    name: "X",
    url: "https://twitter.com/Akwaq007",
    icon: FaXTwitter,
  },
];

const Socials = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
            aria-label={`Visit ${item.name} profile (opens in new tab)`}
            title={item.name}
          >
            <Icon size={14} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default Socials;
