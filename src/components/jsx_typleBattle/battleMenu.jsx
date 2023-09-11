import React from "react"; 
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

function BattleMenu() {
    const navigate = useNavigate();

    function changeScreen(screen) {
        navigate(`/typleBattle/${screen}`)
    }

    return <div>
        <Navbar />
        <h1>Typle Battles</h1>
        <button onClick={() => changeScreen("casual")}>Play a friend</button>
        <button onClick={() => changeScreen("ranked")}>Ranked</button>
    </div>
}

export default BattleMenu;