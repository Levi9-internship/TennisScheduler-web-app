import { useState } from "react";
import AddTimeslot from "./AddTimeslot";
import { postTimeslot } from "../api/TimeslotApi"
import "../styles/courts.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { deleteTennisCourt } from '../api/TennisCourtApi'

export const TennisCourtInfo = ({ id, image, name, surfaceType, description }) => {

  const [timeslotErrors, setTimeslotErrors] = useState("");
  const [buttonName, setButtonName] = useState("Add timeslot");
  const [showAddTimeslot, setAddTimeslot] = useState(false);
  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    whoAmI()
  }, []);

  const getUserRole = () => {
    if (localStorage.getItem("token"))
      return jwtDecode(localStorage.getItem("token")).role;
    else return ""
  }

  const navigate = useNavigate();

  const whoAmI = () => {
    if (getUserRole() === 'ROLE_TENNIS_PLAYER')
      setTennisPlayer(true);
    if (getUserRole() === 'ROLE_ADMIN')
      setAdmin(true);
  }

  const deleteTC = () => {
    deleteTennisCourt(id).then (
      navigate('/'),
      window.location.reload()
    )
  }

  const addTimeslot = async (timeslot) => {

    let newTimeslot = {
      dateStart: `${timeslot.timeslotDate}T${timeslot.startTime}:02.174Z`,
      dateEnd: `${timeslot.timeslotDate}T${timeslot.endTime}:02.174Z`,
      personId: 1,
      courtId: timeslot.id
    };

    postTimeslot(newTimeslot).then(() => {
      setTimeslotErrors("");
    }).catch((errorMessage) => {
      setTimeslotErrors(errorMessage.response.data.message[0].defaultMessage);
    })

  }

  const add = () => {
    setAddTimeslot(!showAddTimeslot);
    showAddTimeslot ? setButtonName("Add timeslot") : setButtonName("Close form")
  }

  return (
    <>
      <div className="courtItem" >
        <img className="courtImage" src={require('../images/' + image)} />
        <div className="courtInfo">
          <h1> {name} </h1>
          <p> {description} </p>
          <p> {surfaceType} </p>
        </div>
        { (admin && tennisPlayer) ? <button className="addTimeslotBtn" onClick={add}>{buttonName}</button> : ""}
        { admin ? <span><Link to={`/court/${id}`}>
          <button className="addTimeslotBtn" >Change</button>
        </Link>
        <button className="addTimeslotBtn" onClick={deleteTC}> Delete</button>
        </span> : ""}
      </div>
      {showAddTimeslot && <AddTimeslot errorMessage={timeslotErrors} id={id} onAdd={addTimeslot} />}
    </>
  );
};
