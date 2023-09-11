import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";

function BasicInfo() {
    const {apiUrl} = useContext(ApiContext);
    
    const {user } = useContext(UserContext);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [coins, setCoins] = useState(null);
    const [equiptSkin, setEquiptSkin] = useState("hulabalu");
    const [elo, setElo] = useState(0);
    const [wins, setWins] = useState(0);

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/user/${user}`)
                .then(response => {
                    setUsername(response.data.username);
                    setPassword(response.data.password);
                })
                .catch(error => {
                    console.log('Error fetching user info:', error);
                });
            
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setCoins(response.data.coins);
                    setEquiptSkin(response.data.equiptSkin)
                })
                .catch(error => {
                    console.log('Error fetching user info:', error);
                });
            axios.get(`${apiUrl}/api/userBattleStats/${user}`)
                .then(response => {
                    setElo(response.data.elo);
                    setWins(response.data.wins);
                })
                .catch(error => {
                    console.log('Error fetching user info:', error);
                });
        }
    })

    return <div>
        <h3>Username: {username}</h3>
        <h3>Password: {password}</h3>
        <h3>Coins: {coins}</h3>
        <h3>Equipt Skin: {equiptSkin}</h3>
        <h3>Battle wins: {wins}</h3>
        <h3>Battle elo: {elo}</h3>
    </div>
}

export default BasicInfo;
