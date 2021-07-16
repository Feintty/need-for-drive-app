import React, { useState, useEffect } from "react";
import BurgerNav from "../../components/Burger/BurgerNav";
import SideBar from "../../components/SideBar/SideBar";
import StartScreen from "../../components/StartScreen/StartScreen";
import "./MainPage.scss";

const MainPage = () => {
  const [swapBurger, setSwapBurger] = useState(true);
  return (
    <div className="main-page">
      <SideBar isBurgerHiding={swapBurger} setIsBurgerHiding={setSwapBurger} />
      <StartScreen />
      <BurgerNav isHiding={swapBurger} />
    </div>
  );
};

export default MainPage;
