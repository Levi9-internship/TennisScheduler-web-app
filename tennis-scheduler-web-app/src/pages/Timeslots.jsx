import { useState, useEffect } from "react";
import Timeslot from "../components/Timeslot";
import { getTimeslot } from "../api/TimeslotApi";
import jwtDecode from "jwt-decode"
import AddTimeslot from "../components/AddTimeslot";
import { postTimeslot } from "../api/TimeslotApi"
import { ToastContainer, toast } from 'react-toastify';


const Timeslots = () => {

  const [timeslots, setTimeslots] = useState([]);
  const [timeslotErrors, setTimeslotErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError,setIsError] = useState(false);
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

  function getAllTimeslots(){
    getTimeslot().then((data) => {
      setTimeslots(data.data);
      setErrorMessage("");
      setIsShow(false);
    }).catch(() => {
      setErrorMessage("Couldn't load timeslots.");
      setIsShow(true);
    })
  }

  const add = () => {
    setShowModal(true);
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
      getAllTimeslots();
      setIsError(false);
    }).catch((errorMessage) => {
      setIsError(true);
      setTimeslotErrors(errorMessage.response.data.message[0].defaultMessage);
    })
    
  }

  const showModalFalse=()=>{
    setShowModal(false)
  }
  useEffect(() => {
    getAllTimeslots();
  }, []);

  return (
    <div className="timeslotList">
      <h1>Timeslots</h1> 
      { admin ? <button className="new" onClick={add}>New timeslot</button> : ""}
      {isShow ? <h2 className="error-msg">{errorMessage}</h2> : null}
      {timeslots.sort((a, b) => a.id > b.id ? 1 : -1).map((timeslot) => (
        <Timeslot
          key={timeslot.id}
          newTimeslot={timeslot}
          setTimeslots={setTimeslots}
          timeslots={timeslots}
          refresh={getAllTimeslots}
        />
      ))}
       {<AddTimeslot show={showModal} close={showModalFalse} isError={isError} errorMessage={timeslotErrors} id={-1} onAdd={addTimeslot} />}
       <ToastContainer></ToastContainer>
    </div>
  )
}

export default Timeslots