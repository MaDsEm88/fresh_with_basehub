import classNames from "classnames";
interface HeroProps {
  children: React.ReactNode;
}

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}








export const HeroBlogTitle = ({ children, className }: HeroElementProps) => {
  return (
    <h1
      className={classNames(
        "max-w-full  relative  justify-left items-center text-left mx-auto text-4xl lg:text-5xl font-manrope_1 bg-gradient-to-br from-[#292929d0] dark:from-[#f1f1f1d0] via-[#242424] dark:via-[#e0e0e0d0] to-black/80 dark:to-white/80 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const HeroBlogSubtitle = ({ children, className }: HeroElementProps) => {
  return (
    <p
      className={classNames(
        "px-0   w-full justify-center items-center text-left mx-auto text-sm  xl:text-base font-manrope_1 font-medium opacity-80 text-neutral-500 dark:text-neutral-500",
        className
      )}
    >
      {children}
    </p>
  );
};





export const Hero = ({ children }: HeroProps) => {
  return <div className="text-center">{children}</div>;
};
