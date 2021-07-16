import React, { useState, useEffect } from "react";
import "./BurgerNav.scss";
import Burger from "../../assets/icons/sidebar-burger.svg";
import Close from "../../assets/icons/close.svg";

const BurgerNav = ({ isHiding }) => {
  return (
    <React.Fragment>
      <nav className={isHiding ? "burger-nav__main hide" : "burger-nav__main"}></nav>
      <div className={isHiding ? "burger-nav__second hide" : "burger-nav__second"}></div>
    </React.Fragment>
  );
};

export default BurgerNav;
