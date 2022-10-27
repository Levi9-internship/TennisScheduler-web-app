import { useState, useEffect } from "react"
import { getTennisCourts } from "../api/TennisCourtApi";
import { getPerson } from "../api/PersonApi";
import UpdateTimeslot from "./UpdateTimeslot";
import moment from 'moment'
import { deleteTimeslot } from "../api/TimeslotApi";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../styles/timeslot.css'


const Timeslot = ({ timesl, setTimeslots, timeslots}) => {
  console.log(timesl.id)
  const date = moment(timesl.dateEnd).format('YYYY-MM-DD');
  const startTime = moment.utc(timesl.dateStart).format("HH:mm:ss");
  const endTime = moment.utc(timesl.dateEnd).format("HH:mm:ss")

  const [tennisCourts, setTennisCourts] = useState([]);
  const [persons, setPerson] = useState([]);
  const [showUpdateTimeslotForm, setUpdateTimeslotForm] = useState(false);
  const [buttonName, setButtonName] = useState("Update timeslot");
  const [timeslot, setTimeslot] = useState(timesl);

  useEffect(() => {
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
    })
  }, []);
  useEffect(() => {
    getPerson().then((data) => {
      setPerson(data.data);
    })
  }, []);

  const eraseTimeslot = () => {
    deleteTimeslot(timesl.id);
    setTimeslots(timeslots.filter((timeslot) => timeslot.id !== timesl.id))
  }

  const addForm = () => {
    setUpdateTimeslotForm(!showUpdateTimeslotForm);
    showUpdateTimeslotForm ? setButtonName("Update timeslot") : setButtonName("Close form")
  }
  return (
    <>
      <ListGroup className='timeslotItem'>
        <ListGroup.Item className='date'><b>Date:</b> {date}</ListGroup.Item>
        <ListGroup.Item className='startTime'>Start time: {startTime}</ListGroup.Item>
        <ListGroup.Item className='endTime'>End time: {endTime}</ListGroup.Item>
        <ListGroup.Item className="personTimeslot">
          {persons.map(person => (
            <span className="personInfo" key={person.id}>
              {person.id === timesl.personId ? `Name: ${person.firstName} ${person.lastName}` : null}
            </span>
          ))}
        </ListGroup.Item>
        <ListGroup.Item className="courtTimeslot">
          {tennisCourts.map(tennisCourt => (
            <span key={tennisCourt.id}>
              {tennisCourt.id === timesl.courtId ? `Tennis court: ${tennisCourt.name}` : null}
            </span>
          ))}
        </ListGroup.Item>
        <div className="btnWrapper">
          <Button className="updateTimeslotBtn" variant="warning" onClick={addForm}>{buttonName}</Button>
          <Button className='deleteTimeslotBtn' variant="danger" onClick={eraseTimeslot}>Delete timeslot</Button>
        </div>
        {showUpdateTimeslotForm && <UpdateTimeslot
          existingTimeslot={timeslot}
          setTimeslot={setTimeslot}
          timeslotId={timesl.id}
          courtId={timesl.courtId}
          date={date}
          startTime={startTime}
          endTime={endTime}
          tennisCourts={tennisCourts}
          setTennisCourts={setTennisCourts}
          persId={timesl.personId}
          persons={persons}
          setPerson={setPerson}
          setTimeslots={setTimeslots}
        />}
      </ListGroup>

    </>
  )
}

export default Timeslot