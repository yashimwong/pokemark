import { HTMLAttributes } from "react";
import classNames from "classnames";

const MainContainer = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("flex justify-center w-full mt-12", className)} {...props}>
            <div className="flex w-11/12">{children}</div>
        </div>
    );
};

export default MainContainer;
