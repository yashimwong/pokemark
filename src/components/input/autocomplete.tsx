import React, { HTMLAttributes } from "react";

type Data = {
    key: string;
    value: string;
};

interface AutoComplete extends HTMLAttributes<HTMLInputElement> {
    data: Data[];
}

const AutoComplete = ({ data, ...props }: AutoComplete) => {
    const [input_value, setInputValue] = React.useState("");
    const [filtered, setFiltered] = React.useState<Data[]>([]);

    const handleKeyPress = () => {
        setFiltered(data.filter((d) => new RegExp(input_value).test(d.key)));
    };

    return (
        <div>
            <input
                className=""
                value={input_value}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <div>
                {filtered.map(({ key, value }) => {
                    return <div key={key}>{key}</div>;
                })}
            </div>
        </div>
    );
};

export default AutoComplete;
