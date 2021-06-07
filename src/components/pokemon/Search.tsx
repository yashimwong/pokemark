import React from "react";

type SearchProps = {
  handleSubmit: (e: React.FormEvent) => void;
  setName: (e: string) => void;
  name: string;
};

const Search = ({ handleSubmit, setName, name }: SearchProps) => {
  return (
    <form
      className="flex flex-col shadow-lg w-4/12 mt-4 py-12 px-8 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1>Enter Pokemon Name:</h1>
      <input
        className="bg-gray-100 py-2 px-2 mt-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Example: pikachu"
        spellCheck="false"
      />
      <div className="flex flex-row justify-end">
        <button
          type="submit"
          className="rounded bg-gradient-to-r from-green-400 to-blue-500 text-gray-50 py-1 px-4 mt-4 hover:from-pink-500 hover:to-yellow-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
