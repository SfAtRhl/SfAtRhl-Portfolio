import { Button } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useEffect, useMemo, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, slideIn } from "../utils/motion";
import { useCharacterAnimations } from "../components/context/CharacterAnimations";
const RobotCanvas = lazy(() => import("../components/canvas/Robot"));

const Hero = () => {
  const greetings = useMemo(() => {
    return ["Hello", "ⴰⵣⵓⵍ", "Bonjour", "Salam"];
  }, []);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex(
        (prevIndex) => (prevIndex + 1) % greetings.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [greetings]);

  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();
  return (
    <section className={`relative w-full h-screen `}>
      <div
        className={`absolute inset-0 top-[140px] md:top-0  max-w-7xl mx-auto ${styles.paddingX} flex md:flex-row flex-col justify-center items-center `}
      >
        <div className="md:w-1/2 flex flex-col justify-center   ">
          <div className="flex flex-row justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                className={`${styles.heroHeadText} text-black`}
                layout
                key={currentGreetingIndex}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.2,
                    delay: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                {greetings[currentGreetingIndex]}{" "}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                layout
                key={currentGreetingIndex}
                initial={{
                  opacity: 0,
                  y: -10,
                  rotate: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: [10.5, -10.5, 10.5, -10.5, 0],
                  transition: {
                    duration: 0.5,
                    delay: 0.7,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="xl:text-5xl 2xl:text-6xl select-none"
              >
                👋
              </motion.span>
            </AnimatePresence>
          </div>
          <p className={`${styles.heroSubText} mt-2  `}>
            A self-taught web developer, crafting digital wonders basis with
            code. Building dreams one pixel at a time, all while chasing the
            elusive bug that dared to challenge my brilliance.
            <br className="sm:block hidden" />
            in other words, i'm a problems solver (except my own 😣).
          </p>
          <div className="flex flex-row gap-4 pt-4 font-semibold justify-center">
            <motion.button
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              variants={fadeIn("up", "", 0.2, 0.5)}
              className="text-xs px-6 py-2 md:text-sm 2xl:text-base border rounded-md border-slate-900 bg-slate-900 text-slate-100 
          dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/5 shadow-slate-900/50 shadow-lg"
              aria-label={"Resume"}
            >
              <a href="/ait_rehail.pdf" target="_blank">
                Resume
              </a>
            </motion.button>
            <motion.button
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              variants={fadeIn("up", "", 0.3, 0.8)}
              className="text-xs px-6 py-2 md:text-sm 2xl:text-base border rounded-md border-slate-900 bg-slate-900 text-slate-100 
          dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/5 shadow-slate-900/50 shadow-lg"
              aria-label={"contact"}
            >
              <a href={`#contact`}>Contact me</a>
            </motion.button>
          </div>
        </div>
        <div className="md:w-1/2 w-full h-3/4 relative md:p-0 max-h-min">
          <motion.div
            variants={slideIn("right", "tween", 0.4, 1)}
            className="md:h-full h-[350px]  flex justify-center items-center"
          >
            <RobotCanvas />
            <div className="hidden md:block absolute bottom-14 right-0 px-4 space-x-1 space-y-1 items-center text-center">
              {animations.map((animation, index) => (
                <Button
                  key={animation}
                  aria-label={animation}
                  className={`px-4 py-2 rounded-lg text-sm  ${
                    index === animationIndex ? "bg-blue-500" : "bg-black"
                  } `}
                  variant={
                    index === animationIndex ? "bg-black" : "bg-blue-500"
                  }
                  onClick={() => setAnimationIndex(index)}
                >
                  {animation}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary  flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default SectionWrapper(Hero, "Whoami");
