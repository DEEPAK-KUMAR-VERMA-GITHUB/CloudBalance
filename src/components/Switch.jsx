import React from "react";

const Switch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 bg-gray-300 peer-focus:outline-none 
        rounded-full peer 
        peer-checked:bg-blue-600 
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all
        peer-checked:after:translate-x-full peer-checked:after:border-white"
      ></div>
    </label>
  );
};

export default Switch;
