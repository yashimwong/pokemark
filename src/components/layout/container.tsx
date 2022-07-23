import { HTMLAttributes } from "react";
import classNames from "classnames";

const MainContainer = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("flex justify-center w-full mt-14", className)} {...props}>
            <div className="flex w-11/12 max-w-6xl">{children}</div>
        </div>
    );
};

export default MainContainer;
