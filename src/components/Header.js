import React from "react";
import logo from "../../images/hungryNites_logo.png";
const Title = () => {
  return (
    <>
      <a href="/">
        <img className="h-20 w-22" src={logo} alt="" />
      </a>
    </>
  );
};
const Header = () => {
  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#FEFDB8] shadow-xl">
        <Title />
        <div className="items-end">
          <ul className="flex space-x-5 text-xl px-4">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
