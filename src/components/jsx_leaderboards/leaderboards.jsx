import React from "react";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

function Leaderboards() {
    const navigate = useNavigate();

    const changeScreen = (screen) => {
        navigate(`/leaderboards/${screen}`);
      };

    return <div>
        <Navbar/>
        <h1>Leaderboards</h1>
        <p>Welcome to Leaderboards</p>
        <div className="board-btn-div">
            <button className="board-btn left" onClick={() => changeScreen("levels")}>Levels Leaderboard</button>
            <button className="board-btn mid" onClick={() => changeScreen("battle")}>Battle Leaderboard</button>
            <button className="board-btn right" onClick={() => changeScreen("typle")}>Typle Leaderboard</button>
        </div>
    </div>
}

export default Leaderboards;