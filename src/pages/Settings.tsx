enum Height {
  metre = "metre",
  feet = "feet",
}

const Settings = () => {
  return (
    <div className="flex flex-row justify-center items-start h-screen">
      <div className="w-8/12 shadow mt-8">
        <div className="bg-gray-900 p-4">
          <h1 className="text-gray-50 text-lg">Settings</h1>
        </div>
        <div className="py-2 px-4">
          Height Units:
          <select>
            {Object.keys(Height).map((k) => {
              return (
                <option key={k} value={k}>
                  {k}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
