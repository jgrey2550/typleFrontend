import React, { useState, useEffect } from 'react';

//importing levels
const levels = {
  level1: require('../texts/level1.txt'),
  level2: require('../texts/level2.txt'),
  level3: require('../texts/level3.txt'),
  level4: require('../texts/level4.txt'),
  level5: require('../texts/level5.txt'),
  level6: require('../texts/level6.txt'),
  level7: require('../texts/level7.txt'),
  level8: require('../texts/level8.txt'),
  level9: require('../texts/level9.txt'),
  level10: require('../texts/level10.txt')
};

function Words({levelNum, setCompletion, changeTimer, changeIndex, currentIndex}) {
    //setting up useState variables to have text displayed for the level "text"
    // current userInput and currentIndex that user is on relative to text
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');

  //getting the level name from the level number
  const levelString = "level" + levelNum;
  // console.log(levelNum);

  //fetching text from ./texts/level1.txt and setting text variable to the contents of ./texts/level1.txt
  useEffect(() => {
    fetch(levels[levelString])
      .then((response) => response.text())
      .then((textContent) => {
        setText(textContent);
      });
  }, [levelString]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        //handling keypresses and storing key to const key
        //same as saying const key = event.key
      const { key } = event;

      //gets currentChar in level
      const currentChar = text[currentIndex];

      if (key === currentChar) {
        //set userInput by concatenating previous input + new key
        //default callBack for seetUserInput is the previous value of userInput and prevInput is a generic name
        setUserInput((prevInput) => prevInput + key);
        changeIndex((prevIndex) => prevIndex + 1);
        if(currentIndex === (text.length - 1)) {
          //when completed adds <endscreen> in <inGame>
          //also stops timer
          setCompletion(2);
          changeTimer(0);
        }
        if(currentIndex === 0) {
          //starts timer when user starts
          changeTimer(1);
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
      </center>
    </div>
  );
}

export default Words;