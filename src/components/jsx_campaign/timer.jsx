import React, { useState } from 'react';

function Timer({ timerOnOff, elapsedTime, setElapsedTime}) {
  React.useEffect(() => {
    //intervalId is what is what the setInterval method puts data into
    let intervalId;
    let startTime;

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

    return () => {
      clearInterval(intervalId);
    };
  }, [timerOnOff]);

  return (
    <div>
      <p>Time: {elapsedTime/1000} secondes</p>
    </div>
  );
}

export default Timer;