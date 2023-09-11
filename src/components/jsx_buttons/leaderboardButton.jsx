import React from "react";
import { useNavigate } from "react-router-dom";

function LeaderboardButton({changeScreen}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/leaderboards')
    }

    return <div>
        <p className="navButton" onClick={handleClick}>Leaderboards</p>
    </div>
}

export default LeaderboardButton;