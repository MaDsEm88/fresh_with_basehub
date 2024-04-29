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
              className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 opacity-0"
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
      <div className="text-[12px] text-left justify-left text-zinc-900  ">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
