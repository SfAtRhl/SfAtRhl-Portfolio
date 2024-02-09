import { motion } from "framer-motion";
import React from "react";
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

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  web_link,
}) => {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <motion.div variants={fadeIn("up", "", index * 0.5, 0.75)}>
      <div className="bg-tertiary dark:bg-tertiary-black shadow-md p-4 rounded-2xl sm:w-[360px] w-full border-2 dark:border-white border-primary text-primary dark:text-tertiary  ">
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl shadow-md border-2"
          />
          <div className="absolute inset-0 flex flex-col justify-start items-end space-y-[2px] m-2 ">
            {/* card-img_hover */}
            {web_link && (
              <div
                onClick={() => handleLinkClick(web_link)}
                className="bg-black w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-tertiary"
              >
                <FaGlobe />
              </div>
            )}
            {source_code_link && (
              <div
                onClick={() => handleLinkClick(source_code_link)}
                className="bg-black w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-tertiary"
              >
                <FaGithub />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] md:h-20">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 ">
          {tags.map((tag) => {
            return (
              <div key={index} target="_blank" shallow href={tag.name || "#"}>
                {(() => {
                  switch (tag.name) {
                    case "javascript":
                      return <SiJavascript />;
                    case "tailwind":
                      return <SiTailwindcss />;
                    case "flutter":
                      return <SiFlutter />;
                    case "css":
                      return <SiCss3 />;
                    case "react":
                      return <SiReact />;
                    case "nextjs":
                      return <TbBrandNextjs />;
                    case "docker":
                      return <SiDocker />;
                    case "framer-motion":
                      return <TbBrandFramerMotion />;
                    case "express":
                      return <SiExpress />;
                    case "dart":
                      return <SiDart />;
                    case "nodejs":
                      return <SiNodedotjs />;
                    case "mongodb":
                      return <SiMongodb />;
                    case "html":
                      return <SiHtml5 />;
                    case "firebase":
                      return <SiFirebase />;
                    default:
                      return null;
                  }
                })()}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 dark:text-secondary text-black text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      <motion.p
        variants={fadeIn("up", "", 1.2, 1)}
        className="text-center pt-12"
      >
        <p className="dark:text-tertiary text-tertiary-black">
          You can find more project's here{" "}
          <a
            onClick={() => window.open("https://github.com/SfAtRhl", "_blank")}
            className="font-bold hover:underline cursor-pointer "
          >
            github/SfAtRhl
          </a>
        </p>
      </motion.p>
    </>
  );
};

export default SectionWrapper(Works, "projects");
