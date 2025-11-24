import React from "react";

const Footer = ({ leftText, rightText }) => {
  return (
    <footer
      className=" absolute bottom-0 left-0 w-full flex items-center justify-between px-5 py-2 bg-gray-200 text-gray-500 mt-5"
    >
      <div className="">{leftText}</div>
      <div className="">{rightText}</div>
    </footer>
  );
};

export default Footer;
