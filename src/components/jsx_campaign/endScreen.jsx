import React, {useContext, useEffect, useState} from "react";
import MenuButton from '../jsx_buttons/menuButton';
import CampaignButton from "../jsx_buttons/campaignButton";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";
import axios from "axios";

function EndScreen({levelNum, onScreenChangeCampaign, changeScreen, timerReset, resetIndex, handleCompletionChange, elapsedTime}) {
    const {apiUrl} = useContext(ApiContext);
    
    const coinsAmount = 100

    const { user } = useContext(UserContext);
    const [fastestTime, setFastestTime] = useState(null);
    const [endMessage, setEndMessage] = useState("You didn't beat your fastest time, you suck!");

    function resetLevel() {
        timerReset();
        resetIndex();
        handleCompletionChange(1);
    }

    const finalTime = elapsedTime/1000;

    const newTime = {
        level: levelNum,
        time: finalTime
    }
    

    useEffect(() => {
        axios.put(`${apiUrl}/api/userProfile/${user}/coins`, { coinsAmount })
            .then(response => {
                console.log('User profile updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
            });
        axios.get(`${apiUrl}/api/userStats/${user}`)
            .then(response => {
                const data = response.data.levels;

                const levelObject = data.find(item => item.level === levelNum);

                if (levelObject) {
                    const fastestTime = levelObject.time;
                    console.log(fastestTime);
                    if(fastestTime > finalTime) {
                        setEndMessage("You scored a new fastest time!");
                        setFastestTime(finalTime);
                        axios.put(`${apiUrl}/api/userStats/${user}`, newTime)
                            .then(response => {
                                const updatedUserStats = response.data;
                                console.log(updatedUserStats);
                                // Handle the updated userStats object
                            })
                            .catch(error => {
                                console.log('Error updating user stats:', error);
                                // Handle the error
                            });                        
                    } else {
                        setFastestTime(fastestTime);
                        // setEndMessage("You didn't beat your fastest time, you suck!");
                    }
                } else {
                    setFastestTime(finalTime);
                    setEndMessage("You finished the level for the first time!");
                    axios.put(`${apiUrl}/api/userStats/${user}`, newTime)
                        .then(response => {
                            const updatedUserStats = response.data;
                            console.log(updatedUserStats);
                            // Handle the updated userStats object
                        })
                        .catch(error => {
                            console.log('Error updating user stats:', error);
                            // Handle the error
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching fastest time:', error);
            });
    }, []);


    // console.log(newTime);

    return <div className="EndScreen">
        <h1>You completed level {levelNum}!</h1>
        <br/>
        <h2>{finalTime} seconds</h2>
        <h2>Fastest time: {fastestTime}</h2>
        <br/>
        <p>{endMessage}</p>
        <br/>
        <MenuButton changeScreen={changeScreen}/>
        <CampaignButton onScreenChangeCampaign={onScreenChangeCampaign}/>
        <button onClick={resetLevel}>essayer encore</button>
    </div>
}

export default EndScreen;
