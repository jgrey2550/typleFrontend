import React from "react";
import { useState, useEffect, useContext } from "react";

import Keyboard from "../jsx_campaign/keyboard";
import { ApiContext } from "../../contexts/apiContext";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";
import WordsBattle from "./wordsBattle";

function BattleOverlay({code}) {
    const {apiUrl} = useContext(ApiContext);
    const {user} = useContext(UserContext);
    const [equiptSkin, setEquiptSkin] = useState("Default");
    const [paragraph, setParagraph] = useState('testing test');

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setEquiptSkin(response.data.equiptSkin)
                    console.log(equiptSkin);
                })
                .catch(error => {
                    console.log('Error fetching user info:', error);
                });
        }
    })

    return <div>
        <WordsBattle text={paragraph} code={code}/>
        <Keyboard equiptSkin={equiptSkin}/>
    </div>
}

export default BattleOverlay;