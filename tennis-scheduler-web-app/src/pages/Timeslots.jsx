import { useState, useEffect } from "react";
import Timeslot from "../components/Timeslot";
import { getTimeslot } from "../api/TimeslotApi";


const Timeslots = () => {

  const [timeslots, setTimeslots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getTimeslot().then((data) => {
      setTimeslots(data.data);
      setErrorMessage("");
      setIsShow(false);
    }).catch(()=>{
      setErrorMessage("Couldn't load timeslots.");
      setIsShow(true);
    })
  }, []);
  return (
    <div className="timeslotList">
      <h1>Timeslots</h1>
      {isShow ? <h2 className="error-msg">{errorMessage}</h2> : null}
      {timeslots.map((timeslot) => (
          <Timeslot
            key={timeslot.id}
            newTimeslot={timeslot}
            setTimeslots={setTimeslots}
            timeslots={timeslots}
          />
      ))}
    </div>
  )
}

export default Timeslots