import { useState, useEffect } from "react";
import Timeslot from "../components/Timeslot";
import { getTimeslot } from "../api/TimeslotApi";


const Timeslots = () => {

  const [timeslots, setTimeslots] = useState([]);


  useEffect(() => {
    getTimeslot().then((data) => {
      setTimeslots(data.data);
    })
  }, []);
  console.log(timeslots[1])
  return (
    <div className="timeslotList">
      {timeslots.map((timeslot) => (
          <Timeslot
            key={timeslot.id}
            timesl={timeslot}
            setTimeslots={setTimeslots}
            timeslots={timeslots}
          />
      ))}
    </div>
  )
}

export default Timeslots