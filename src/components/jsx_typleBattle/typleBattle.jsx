import React, { useState, useContext, useEffect } from "react";
import Navbar from "../navbar";
import { io } from "socket.io-client";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";
import axios from "axios";
import BattleOverlay from "./battleOverlay";

const socket = io.connect("https://our-bruin-398600.uc.r.appspot.com");
// http://localhost:3001        for local
// https://our-bruin-398600.uc.r.appspot.com

function TypleBattle() {
    const { user } = useContext(UserContext);
    const [username, setUsername] = useState(null);
    const { apiUrl } = useContext(ApiContext);
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        if (user) {
            axios.get(`${apiUrl}/api/user/${user}`)
                .then(response => {
                    setUsername(response.data.username);
                    setMembers(prevMembers => {
                        const uniqueMembers = [...new Set([...prevMembers, ...members, response.data.username])];
                        return uniqueMembers;
                    });
                })
                // adds members, username, prevMembers all together and removes duplicates
                .catch(error => {
                    console.error("Error fetching username:", error);
                });
        }
    }, [user, apiUrl]);
    //updates whenever user or apiUrl change

    const [battleCode, setBattleCode] = useState("");
    const [members, setMembers] = useState([]);

    function createBattle() {
        const generatedCode = "test";
        console.log("Creating battle with code:", generatedCode);
        setRoomCode(generatedCode);
        socket.emit('createBattle', generatedCode);
    }

    function joinBattle() {
        if (battleCode.trim() !== "") {
            console.log("Joining battle with code:", battleCode);
            let joinInfo = {
                code: battleCode,
                user: username
            }
            socket.emit('joinBattle', joinInfo);
            setRoomCode(battleCode);
        }
    }

    function disconnect() {
        const leaveInfo = {
            username: username,
            code: roomCode
        }
        socket.emit('room leave', leaveInfo);
    }

    useEffect(() => {
        socket.on('room join', handleRoomJoin);
        socket.on('room leave', handleRoomLeave);
        socket.on('room update', handleRoomUpdate);

        return () => {
            socket.off('room join', handleRoomJoin);
            socket.off('room leave', handleRoomLeave);
            socket.off('room update', handleRoomUpdate);
        };
    }, [username, members, roomCode]);
    //another useEffect so functions actually actually call
    //socket.on when component loads and off when component unmounts

    function handleRoomJoin(user) {
        if (!members.includes(user)) {
            setMembers(prevMembers => [...prevMembers, user]);
        }
        if (user !== username && username !== null) {
            alert("username " + user + " Joined");
            const updateInfo = {
                members: members,
                code: roomCode
            }
            socket.emit('room update', updateInfo);
        }
    }

    function handleRoomUpdate(members) {
        setMembers(prevMembers => {
            const uniqueMembers = [...new Set([...prevMembers, ...members])];
            return uniqueMembers;
        });
    }

    function handleRoomLeave(user) {
        if (user !== username) {
            const updatedMembers = members.filter(member => member !== user);
            setMembers(updatedMembers);
        } else {
            setMembers([username]);
        }
        alert(user + " left the room");
        setRoomCode('');
    }

    return (
        <div>
            <Navbar />
            <h1>Typle Battle</h1>
            <p>Welcome to Typle Battle</p>
            {roomCode == '' ? <p>Not in a room</p> : <p>Code: {roomCode}</p>}
            <button onClick={createBattle}>Create Battle</button>
            <div>
                <input
                    type="text"
                    placeholder="Enter Battle Code"
                    value={battleCode}
                    onChange={(e) => setBattleCode(e.target.value)}
                />
                <button onClick={joinBattle}>Join Battle</button>
            </div>
            <button onClick={disconnect}>Leave Room</button>
            <div>
                <h2>Members:</h2>
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul>
            </div>
            {members.length > 1 && <div>
                <h1>fjdsk</h1>
                <BattleOverlay members={members} code={roomCode}/>
            </div>}
        </div>
    );
}

export default TypleBattle;