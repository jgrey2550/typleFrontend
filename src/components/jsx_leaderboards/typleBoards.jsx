import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../contexts/apiContext";
import Navbar from "../navbar";
import axios from "axios";

function TypleBoards() {
  const {apiUrl} = useContext(ApiContext);
  
  const [data, setData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);

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
        const leaderboardData = await Promise.all(
          data.map(async user => {
            const topWPM = user.topWPM;
            const userId = user.userId;
            const username = await getUsername(userId);
            return { topWPM, username };
          })
        );
        leaderboardData.sort((a, b) => b.topWPM - a.topWPM); // Sort by topWPM from largest to smallest
        setLeaderboardData(leaderboardData);
      };

      fetchData();
    }
  }, [data]);

  const getUsername = async userId => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/${userId}`);
      return response.data.username;
    } catch (error) {
      console.log("Error fetching username:", error);
      return null;
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Typle Leaderboards</h1>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Top WPM</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.topWPM}</td>
              <td>{entry.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TypleBoards;
