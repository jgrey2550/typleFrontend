import React, { useState, useContext, useEffect } from "react";
import Keyboard from './keyboard';
import Words from './words';
import Logo from '../logo';
import EndScreen from "./endScreen";
import Timer from "./timer";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";


//takign in levelNum in from app screen to know which level to display
function InGame({levelNum, onScreenChangeCampaign, changeScreen}) {
    const {apiUrl} = useContext(ApiContext);

    //completion boolean 1 for incomplet then switches to 2 when complete
    //also timer on off that's value is passed into timer and function is passed into words
    //also index to control which index in text user is at
    //elapsed time and function to update time also
    const [timerOnOff, setTimerOnOff] = useState(0);
    const [completion, setCompletion] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [gotSkin, setGotSkin] = useState(0);
    //so the skin is only axios.get once

    const {user} = useContext(UserContext);
    const [equiptSkin, setEquiptSkin] = useState("Default");

    useEffect(() => {
        if(gotSkin === 0) {
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setEquiptSkin(response.data.equiptSkin)
                    setGotSkin(1);
                })
                .catch(error => {
                    console.log('Error fetching user info:', error);
                });
        }
    })

    const changeTimer = (newTimeKey) => {
        setTimerOnOff(newTimeKey);
    }

    const timerReset = () => {
        setTimerOnOff(2);
    }

    const changeIndex = (newIndex) => {
        setCurrentIndex(newIndex);
    }

    const resetIndex = () => {
        setCurrentIndex(0);
    }

    const handleCompletionChange = (completionNum) => {
        setCompletion(completionNum);
    };

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Logo/>
{/* passes in completion so can update when level completed and add <endscreen> */}
        <Words levelNum={levelNum} setCompletion={handleCompletionChange} changeTimer={changeTimer} changeIndex={changeIndex} currentIndex={currentIndex}/>
        <Keyboard equiptSkin={equiptSkin}/>
        <Timer timerOnOff={timerOnOff} setElapsedTime={setElapsedTime} elapsedTime={elapsedTime}/>
        {completion === 2 ? (<EndScreen onScreenChangeCampaign={onScreenChangeCampaign} changeScreen={changeScreen} timerReset={timerReset} resetIndex={resetIndex} handleCompletionChange={handleCompletionChange} elapsedTime={elapsedTime} levelNum={levelNum}/>) : null}
    </div>
}

export default InGame;
