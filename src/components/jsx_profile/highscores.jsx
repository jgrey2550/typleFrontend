import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";
import axios from "axios";

function Highscores() {
  const {apiUrl} = useContext(ApiContext);
    
    const numLevels = 10;

    const {user } = useContext(UserContext);
    const [userStats, setUserStats] = useState(null);
    const [topWPM, setTopWPM] = useState(null);

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userStats/${user}`)
                .then(response => {
                    setUserStats(response.data);
                    setTopWPM(response.data.topWPM);
                })
                .catch(error => {
                    console.log('Error fetching user stats:', error);
                });
        }
    }, [user]);

    function generateTableBody() {
        const maxLevel = numLevels;
        const allLevels = Array.from({ length: maxLevel }, (_, index) => index + 1);
    
        const levels = userStats?.levels || [];
        const levelTimeMap = new Map();
        levels.forEach((level) => {
          const levelNumber = level.level;
          const fastestTime = level.time;
          levelTimeMap.set(levelNumber, fastestTime);
        });
    
        const tableBody = allLevels.map((levelNumber) => {
          const fastestTime = levelTimeMap.get(levelNumber) || "incomplete";
          return (
            <tr key={levelNumber}>
              <td>{levelNumber}</td>
              <td>{fastestTime}</td>
            </tr>
          );
        });
    
        return tableBody;
      }

    return <div>
        <h1>High scores</h1>
        <table>
            <thead>
                <tr>
                    <td>Level</td>
                    <td>Fastest Time</td>
                </tr>
            </thead>
            <tbody>
            {generateTableBody()}
            </tbody>
        </table>
        <br />
        <h3>Top WPM: {topWPM}</h3>
    </div>
}

export default Highscores;
