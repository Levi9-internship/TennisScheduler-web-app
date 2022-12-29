import { useState, useEffect } from "react";
import AddTimeslot from "./AddTimeslot";
import { postTimeslot } from "../api/TimeslotApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/courts.css";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import DeleteTennisCourt from "./DeleteTennisCourt";
import { Button } from "react-bootstrap";

export const TennisCourtInfo = ({ id, image, name, surfaceType, description, refresh}) => {

  const [timeslotErrors, setTimeslotErrors] = useState("");
  const [buttonName, setButtonName] = useState("New");
  const [showAddTimeslot, setAddTimeslot] = useState(false);
  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    whoAmI()
  }, []);

  const getUserRole = () => {
    if (localStorage.getItem("token"))
      return jwtDecode(localStorage.getItem("token")).role;
    else return ""
  }

  const whoAmI = () => {
    if (getUserRole() === 'ROLE_TENNIS_PLAYER')
      setTennisPlayer(true);
    if (getUserRole() === 'ROLE_ADMIN')
      setAdmin(true);
  }

  const addTimeslot = async (timeslot) => {

    let newTimeslot = {
      dateStart: `${timeslot.timeslotDate}T${timeslot.startTime}:02.174Z`,
      dateEnd: `${timeslot.timeslotDate}T${timeslot.endTime}:02.174Z`,
      personId: timeslot.person,
      courtId: timeslot.id
    };
    postTimeslot(newTimeslot).then(() => {
      setTimeslotErrors("");
      toast.success('You sucessfully reserved your timeslot!', { position: toast.POSITION.BOTTOM_CENTER })
    }).catch((errorMessage) => {
      setTimeslotErrors(errorMessage.response.data.message[0].defaultMessage);
    })

  }

  const add = () => {
    setAddTimeslot(!showAddTimeslot);
    showAddTimeslot ? setButtonName("New") : setButtonName("Close form")
  }

  return (
    <>
      <div className="courtItem" >
        <img className="courtImage" src={require('../images/' + image)} />
        <div className="courtInfo">
          <h3> {name} </h3>
          <p> {description} </p>
          <p> {surfaceType} </p>
        </div>
        { (admin || tennisPlayer) ? <button className="addTimeslotBtn" onClick={add}>{buttonName}</button> : ""}
        { admin ? <span><Link to={`/tennis-court/${id}`}>
          <button className="addTimeslotBtn" >Change</button>
        </Link>
        <button className="addTimeslotBtn"  onClick={() => { setShowModal(true) }}> Delete</button>
        </span> : ""}
      </div>
      {showAddTimeslot && <AddTimeslot errorMessage={timeslotErrors} id={id} onAdd={addTimeslot} />}
      { showModal && <DeleteTennisCourt show={showModal} close={() => setShowModal(false)} idTennisCourt= {id} refresh = {refresh}></DeleteTennisCourt>}
      <ToastContainer></ToastContainer>
    </>
  );
};
