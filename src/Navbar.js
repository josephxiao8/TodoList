import React from "react";
import "./index.css";
import logo from "./logoNoPadding.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="block w-28 mx-auto mt-8"></img>;
    </Link>
  );
};

export default Navbar;
