
const Footer = ({ leftText, rightText, isCollapsed }) => {
  return (
    <footer
      className={`${
        isCollapsed ? "ml-14" : "ml-49"
      } flex items-center justify-between px-5 py-2 bg-gray-200 text-gray-500`}
    >
      <div className="">{leftText}</div>
      <div className="">{rightText}</div>
    </footer>
  );
};

export default Footer;
