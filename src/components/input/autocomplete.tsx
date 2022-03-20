import React, { HTMLAttributes } from "react";

interface AutoComplete extends HTMLAttributes<HTMLInputElement> {
    data: Array<{ key: string; value: string }>;
}

const AutoComplete = ({ data, ...props }: AutoComplete) => {
    const [input_value, setInputValue] = React.useState("");

    return (
        <div>
            <input className="" value={input_value} onChange={(e) => setInputValue(e.target.value)} />
            <div>
                {data.map(({ key, value }) => {
                    return <div key={key}>{key}</div>;
                })}
            </div>
        </div>
    );
};

export default AutoComplete;
