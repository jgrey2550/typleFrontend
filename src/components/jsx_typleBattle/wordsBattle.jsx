import React, { useState, useEffect, useContext } from 'react';
import MenuButton from '../jsx_buttons/menuButton';
import { UserContext } from '../../contexts/userContext';
import { ApiContext } from '../../contexts/apiContext';
import { io } from "socket.io-client";
import axios from 'axios';

const socket = io.connect("http://localhost:3001");
function WordsBattle({text, code}) {
    const {apiUrl} = useContext(ApiContext);
    
    const {user} = useContext(UserContext);
    const [topWPM, setTopWPM] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [oppIndex, setOppIndex] = useState(0);
    const [oppTime, setOppTime] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [finalMessage, setFinalMessage] = useState('');

    //timer part
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerOnOff, setTimerOnOff] = useState(0);
    const [wpm, setWpm] = useState(null);

    const words = text.split(" ");
    //array from text var
    const numWords = words.length;

    function handleKeyUpdate(keyInfo) {
        if(keyInfo.username != user) {
            setOppIndex(keyInfo.index + 1);
        }
    }
    
    function handleFinish(finishInfo) {
        if(finishInfo.username != user) {
            setOppTime(finishInfo.time);
            if(finalTime != null) {
                if(finishInfo.time > finalTime) {
                    setFinalMessage("You Won!");
                } else if(finishInfo.time < finalTime) {
                    setFinalMessage("You Lost!");
                } else {
                    setFinalMessage("You Tied! 2");
                } 
            }
        }
        if((oppTime != null) && (finalTime != null)) {
            if(oppTime > finalTime) {
                setFinalMessage("You Won!");
            } else if(oppTime < finalTime) {
                setFinalMessage("You Lost!");
            } else {
                setFinalMessage("You Tied!");
            } 
        }
    }

    useEffect(() => {
        socket.emit('join word', code);
    }, []);

    useEffect(() => {
        socket.on('key update', handleKeyUpdate);
        socket.on('finish', handleFinish);

        return() => {
            socket.off('key update', handleKeyUpdate);
            socket.off('finish', handleFinish);
        };
    }, [oppIndex, oppTime, finalTime]);


    React.useEffect(() => {
        //intervalId is what is what the setInterval method puts data into
        let intervalId;
        let startTime;

        if(user) {
          axios.get(`${apiUrl}/api/userStats/${user}`)
            .then(response => {
              setTopWPM(response.data.topWPM);
            })
            .catch(error => {
              console.log("error" + error);
            })
        }
    
        if (timerOnOff === 1) {
            startTime = Date.now();
            //setInterval built in java function 2 params (function, interval)
            //so updates time every 1 milisecond
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const newTime = currentTime - startTime;
                setElapsedTime(newTime);
            }, 1);
        }
    
        if(timerOnOff === 2) {
            setElapsedTime(0);
        }

        if(timerOnOff === 3) {
            setWpm((numWords/(elapsedTime/60000)).toFixed(2));
            let wpm = (numWords/(elapsedTime/60000)).toFixed(2);
            if(wpm > topWPM) {
                axios.put(`${apiUrl}/api/userStatsWPM/${user}`, {wpm})
                .then(response => {
                    console.log('User profile updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating user profile:', error);
                });
            }
            setFinalTime(elapsedTime/1000);
            const finishInfo = {
                code: code,
                username: user,
                time: elapsedTime/1000
            }
            socket.emit('finish', finishInfo)
        }
        
        return () => {
          clearInterval(intervalId);
        };
      }, [timerOnOff]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        const { key } = event;
        //gets currentChar in text
        const currentChar = text[currentIndex];

        if (key === currentChar) {
            setCurrentIndex((prevIndex) => prevIndex + 1);

            const keyInfo = {
                code: code,
                username: user,
                index: currentIndex
            }
            socket.emit('key update', keyInfo);

            if(currentIndex === (text.length - 1)) {
                setTimerOnOff(3);
            }
            if(currentIndex === 0) {
            //starts timer when user starts
            setTimerOnOff(1);
            }
        }
      
    };
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, text]);

  //appending text to renderText for as many correct keys user has pushed
    const renderText = () => {
        let renderedText = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            let style = {};

            if (i < currentIndex && i < oppIndex) {
                style.color = 'red'; // both type
            } else if (i < oppIndex) {
                style.color = 'pink'; // Opponent typed this character
            } else if (i < currentIndex) {
                style.color = 'blue'; // u type this character
            } else {
                style.color = 'black'; // Neither typed
            }

            renderedText.push(
                <span key={i} style={style}>
                    {char}
                </span>
            );
        }
        return renderedText;
    };

  return (
    <div>
        <center>
            <h1>Type!</h1>
            <p>{renderText()}</p>
            <p>Time: {elapsedTime/1000} secondes</p>
        </center>
        {timerOnOff === 3 ? (<div className="EndScreen">
            <h1>You completed the Typle!</h1>
            <h2>{finalMessage}</h2>
            <br />
            <p>Time: {elapsedTime/1000} seconds</p>
            <p>Opp Time: {oppTime} seconds</p>
            <br/>
            <p>Words per min: {wpm}</p>
            <MenuButton />
        </div>) : null}
    </div>
  );
}

export default WordsBattle;