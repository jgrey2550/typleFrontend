import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../contexts/apiContext";
import axios from "axios";
import Navbar from "../navbar";

function LevelsBoards() {
  const {apiUrl} = useContext(ApiContext);
  
  const [data, setData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/userStatsAll`)
      .then(response => {
        const userStats = response.data;
        setData(userStats);
      })
      .catch(error => {
        console.log("Error fetching info:", error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        const levelsData = await Promise.all(
          Array.from({ length: 10 }, (_, index) => index + 1).map(
            async levelNumber => {
              const levelTimes = [];
              const usernamePromises = [];
              for (const user of data) {
                const levelInfo = user.levels.find(
                  level => level.level === levelNumber
                );
                if (levelInfo) {
                  const usernamePromise = getUsername(user.userId);
                  usernamePromises.push(usernamePromise);
                  levelTimes.push({ time: levelInfo.time, username: null });
                }
              }
              const usernames = await Promise.all(usernamePromises);
              usernames.forEach((username, i) => {
                levelTimes[i].username = username;
              });
              levelTimes.sort((a, b) => a.time - b.time); // Sort times from lowest to highest
              return levelTimes;
            }
          )
        );
        setLeaderboardData(levelsData);
      };

      fetchData();
    }
  }, [data]);

  const getUsername = async userId => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/${userId}`
      );
      return response.data.username;
    } catch (error) {
      console.log("Error fetching username:", error);
      return null;
    }
  };

  const handleLevelChange = e => {
    setSelectedLevel(parseInt(e.target.value));
  };

  return (
    <div>
      <Navbar />
      <h1>Level Leaderboards</h1>
      <select
        id="level-select"
        value={selectedLevel}
        onChange={handleLevelChange}
      >
        {Array.from({ length: 10 }, (_, index) => index + 1).map(
          levelNumber => (
            <option key={levelNumber} value={levelNumber}>
              Level {levelNumber}
            </option>
          )
        )}
      </select>
      <table>
        <thead>
          <tr>
            <th>Level {selectedLevel}</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData[selectedLevel - 1] &&
            leaderboardData[selectedLevel - 1].map((userInfo, index) => (
              <tr key={index}>
                <td>
                  <p>{index + 1}</p>
                </td>
                <td>
                  <p>{userInfo.time}</p>
                </td>
                <td>
                  <p>{userInfo.username}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelsBoards;
