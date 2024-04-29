import { useEffect } from "preact/compat";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn.ts";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [npm, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [npm.current]);

  const renderWords = () => {
    return (
      <motion.div ref={npm}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 dark:from-zinc-800 via-zinc-200 dark:via-zinc-800 opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-manrope_1 font-semibold", className)}>
      <div className="">
      <div className="text-[12px] text-left justify-left text-neutral-100  dark:text-neutral-900 to-neutral-200 dark:to-neutral-800 ">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
