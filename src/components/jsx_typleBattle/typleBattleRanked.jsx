import React from "react";
import Navbar from "../navbar";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";
import axios from "axios";

function TypleBattleRanked() {
    const {apiUrl} = useContext(ApiContext);
    const {user} = useContext(UserContext);

    const [elo, setElo] = useState(0);
    const [wins, setWins] = useState(0);

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userBattleStats/${user}`)
                .then(response => {
                    setElo(response.data.elo);
                    setWins(response.data.wins);    
                })
        }
    })
    return <div>
        <Navbar />
        <h1>Ranked</h1>
        <h3>Battle wins: {wins}</h3>
        <h3>Battle elo: {elo}</h3>
    </div>
}

export default TypleBattleRanked;