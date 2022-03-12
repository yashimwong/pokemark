import { HTMLAttributes } from "react";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {}

const MainContainer = ({ children, ...props }: MainContainerProps) => {
  return (
    <div className="ml-52" {...props}>
      {children}
    </div>
  );
};

export default MainContainer;
