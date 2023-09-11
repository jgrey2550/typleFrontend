import React, { useState, useEffect, useContext } from 'react';
import MenuButton from '../jsx_buttons/menuButton';
import { UserContext } from '../../contexts/userContext';
import { ApiContext } from '../../contexts/apiContext';
import axios from 'axios';


function WordsTyple({text}) {
    const {apiUrl} = useContext(ApiContext);
    
    const {user} = useContext(UserContext);
    const [topWPM, setTopWPM] = useState(null);

    //timer part
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerOnOff, setTimerOnOff] = useState(0);
    const [wpm, setWpm] = useState(null);

    const words = text.split(" ");
    const numWords = words.length;

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
        }
        
        return () => {
          clearInterval(intervalId);
        };
      }, [timerOnOff]);

  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      //gets currentChar in level
      const currentChar = text[currentIndex];

      if (key === currentChar) {
        setUserInput((prevInput) => prevInput + key);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if(currentIndex === (text.length - 1)) {
            setTimerOnOff(3);
            // console.log(elapsedTime);
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
      const style =
        i < currentIndex
          ? { color: 'blue' }
          : { color: 'black' };
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
            <br />
            <p>Time: {elapsedTime/1000} secondes</p>
            <p>Words per min: {wpm}</p>
            <MenuButton />
        </div>) : null}
    </div>
  );
}

export default WordsTyple;
