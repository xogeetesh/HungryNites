import React from "react";
import logo from "../images/hungryNites_logo.png";
const title = (
  <>
    <a href="/">
      {/* <img className="h-3" src={logo} alt="" /> */}
      <div className="bg-red-700 h-36">Hey</div>
    </a>
  </>
);
const Header = () => {
  return <>{title}</>;
};
export default Header;
