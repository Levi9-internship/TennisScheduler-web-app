import React, { useState, useEffect  } from "react";
import { getTennisPlayers } from "../api/PersonApi";
import Table from 'react-bootstrap/Table';
import { TennisPlayerInfo } from "./TennisPlayerInfo";

export const TennisPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = () => {
        getTennisPlayers().then((response) => setPlayers(response.data)).catch(() => setMessage("Failed loading information"));
    }

    return (
        <>
            <h1>{message}</h1>
            <Table striped border hover className="player-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((tennisPlayer) => {
                        return (
                            <TennisPlayerInfo
                                id={tennisPlayer.id}
                                firstName={tennisPlayer.firstName}
                                lastName= {tennisPlayer.lastName}
                                email={tennisPlayer.email}
                                birthday={tennisPlayer.birthday}
                                gender={tennisPlayer.gender}
                            />
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
};