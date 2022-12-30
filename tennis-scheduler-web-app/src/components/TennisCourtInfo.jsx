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


export const TennisCourtInfo = ({ id, image, name, surfaceType, description, refresh, workingTime }) => {

  const [timeslotErrors, setTimeslotErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  }

  return (
      <div className="courtItem" >
        <img className="courtImage" src={require('../images/' + image)} />
        <div className="courtInfo">
          <h3> {name} </h3>
          <div className="lineWork"></div>
          <div className="headWork">
            <h6>Working time:</h6>
            <div className="workingTime">
              <div className="weekDay"><p>Work day:</p> <div>{workingTime.startWorkingTimeWeekDay.substring(0,5)} - {workingTime.endWorkingTimeWeekDay.substring(0,5)}</div></div>
              <div className="weekEnd"><p>Weekend:</p> <div>{workingTime.startWorkingTimeWeekend.substring(0,5)} - {workingTime.endWorkingTimeWeekend.substring(0,5)}</div></div>
            </div>
          </div>
          <div className="lineWork"></div>
          <div className="desc">
            <h6>Description:</h6>
            <p > {description} </p>
          </div>
          <div className="lineWork"></div>
          <div className="surface">
            <h6>Surface type:</h6>
            <p> {surfaceType.toLowerCase()} </p>
          </div>
          <div className="courtButton">
            { (admin || tennisPlayer) ? <button className="addTimeslotBtn" onClick={add}>{buttonName}</button> : ""}
            { admin ? <span><Link to={`/tennis-court/${id}`}>
              <button className="addTimeslotBtn" >Change</button>
            </Link>
            <button className="addTimeslotBtn"  onClick={() => { setShowModal(true) }}> Delete</button>
            </span> : ""}
          </div>
        </div>
        {showAddTimeslot && <AddTimeslot errorMessage={timeslotErrors} id={id} onAdd={addTimeslot} />}
        { showModal && <DeleteTennisCourt show={showModal} close={() => setShowModal(false)} idTennisCourt= {id} refresh = {refresh}></DeleteTennisCourt>}
        <ToastContainer></ToastContainer>
      </div>
    );
}
