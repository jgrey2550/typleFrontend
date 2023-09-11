import React, { useState } from "react";
import dailyTyple from "./pictures/dailyTyple.png";
import typleBattle from "./pictures/typleBattle.png";
import typle from "./pictures/typle.png";
import campaign from "./pictures/campaign.png";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  //change screen to /whatever with useNavigate through react-router-dom
  const changeScreen = (screen) => {
    navigate(`/${screen}`);
  };

  return (
    <div>
    <Navbar/>
    <h1>Menu</h1>
      <div className="menu-div">
        <div className="menu-div-inner">
          <img src={campaign} onClick={() => changeScreen("Campaign")} /> 
          <img src={typle} onClick={() => changeScreen("Typle")} />
        </div>
        <div className="menu-div-inner"> 
          <img src={dailyTyple} onClick={() => changeScreen("DailyTyple")} />
          <img src={typleBattle} onClick={() => changeScreen("TypleBattle")} />
        </div>
      </div>
    </div>
  );
}

export default Menu;