import { HTMLAttributes } from "react";
import classNames from "classnames";

const MainContainer = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("flex justify-center w-full mt-[72px]", className)} {...props}>
            <div className="flex w-[min(1180px,calc(100%-2rem))]">{children}</div>
        </div>
    );
};

export default MainContainer;
