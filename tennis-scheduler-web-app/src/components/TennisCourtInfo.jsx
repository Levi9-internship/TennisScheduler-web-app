import { useState } from "react";
import AddTimeslot from "./AddTimeslot";
import {postTimeslot} from "../api/TimeslotApi"
import "../styles/courts.css";

export const TennisCourtInfo = ({ id, image, name, surfaceType, description }) => {

  const [timeslotErrors, setTimeslotErrors] = useState("");
  const [buttonName, setButtonName] = useState("Add timeslot");
  const [showAddTimeslot, setAddTimeslot] = useState(false);

  const addTimeslot = async(timeslot) => {

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
        <div className="courtImage" style={{ backgroundImage: `url(${image})` }}>
          {" "}
        </div>
        <div className="courtInfo">
          <h1> {name} </h1>
          <p> {description} </p>
          <p> {surfaceType} </p>
        </div>
        <button className="addTimeslotBtn" onClick={add}>{buttonName}</button>
      </div>
      {showAddTimeslot && <AddTimeslot errorMessage={timeslotErrors} id={id} onAdd={addTimeslot} />}
    </>
  );
};
