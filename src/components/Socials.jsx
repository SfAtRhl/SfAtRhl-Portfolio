import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "./icons";

const Socials = ({ className }) => {
  return (
    <div className={`hidden text-xs xl:text-3xl   ${className}`}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
        <Link to={"https://twitter.com/Akwaq007"} target="_blank">
          <FaXTwitter />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
        <Link to={"https://github.com/SfAtRhl"} target="_blank">
          <FaGithub />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
        <Link
          to={"https://www.linkedin.com/in/soufyane-ait-rehail/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
      </motion.div>
    </div>
  );
};

export default Socials;
