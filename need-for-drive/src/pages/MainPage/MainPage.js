import React, { useState, useEffect } from "react";
import BurgerNav from "../../components/Burger/BurgerNav";
import SideBar from "../../components/SideBar/SideBar";
import StartScreen from "../../components/StartScreen/StartScreen";
import Slider from "../../components/Slider/Slider";
import "./MainPage.scss";

const MainPage = () => {
  const [swapBurger, setSwapBurger] = useState(true);
  return (
    <div className="main-page">
      <SideBar isBurgerHiding={swapBurger} setIsBurgerHiding={setSwapBurger} />
      <StartScreen />
      <BurgerNav isHiding={swapBurger} />
      <Slider/>
    </div>
  );
};

export default MainPage;
