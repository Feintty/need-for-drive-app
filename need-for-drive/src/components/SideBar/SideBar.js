import React, { useState, useEffect } from "react";
import "./SideBar.scss";
import Burger from "../../assets/icons/sidebar-burger.svg";
import Close from "../../assets/icons/close.svg";

const SideBar = ({isBurgerHiding,setIsBurgerHiding}) => {
  const [langSwap,setLangSwap] = useState(true)
  const [burgerSwap,setBurgerSwap] = useState(true)

  return (
    <div className="side-bar">
      <aside className="side-bar__burger">
        <button className="burger__button button-nullstyle"  onClick={()=>{setBurgerSwap(!burgerSwap); setIsBurgerHiding(!isBurgerHiding) }}>
          <img className="burger__img" src={burgerSwap?Burger:Close} />
        </button>
      </aside>
      <aside className="side-bar__lang">
        <button className="lang__button button-round" onClick={()=>setLangSwap(!langSwap)}>{langSwap?<h4>Eng</h4>:<h4>Рус</h4>}</button>
      </aside>
    </div>
  );
};

export default SideBar;
