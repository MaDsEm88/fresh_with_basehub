import { ComponentChildren, FunctionalComponent, h } from "preact";

import classNames from "classnames";

export const Container: FunctionalComponent<{
  children: ComponentChildren;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "mx-auto w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
