import React, { useState } from "react";
import { useEffect } from "react";
import { getTennisPlayers } from "../api/PersonApi";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import Moment from 'moment'

export const TennisPlayers = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = () => {
    getTennisPlayers().then((response) => {setPlayers(response.data)})
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
     <Table striped border hover className="player-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th>Profile</th>
        </tr>
      </thead>
     
         <tbody>
      { players.map((tennisPlayer, index) => {
          return   (
              <tr>
                <td>{tennisPlayer.firstName} </td>
                <td>{tennisPlayer.lastName} </td>
                <td>{tennisPlayer.email} </td>
                <td>{Moment(tennisPlayer.birthday).format('MMMM Do YYYY.')} </td>
                <td>{tennisPlayer.gender} </td>
                <td> <Link to={{pathname: "/profile/"+tennisPlayer.id}} className="profile-info-link"> See profile</Link></td>
                </tr>
            )})}
        </tbody>
    </Table>
    </>
  );
};