import { useState, useEffect } from "react"
import { getTennisCourts } from "../api/TennisCourtApi";
import { getAllPerson } from "../api/PersonApi";
import UpdateTimeslot from "./UpdateTimeslot";
import { deleteTimeslot } from "../api/TimeslotApi";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import moment from "moment/moment";
import '../styles/timeslot.css'


const Timeslot = ({ newTimeslot, setTimeslots, timeslots }) => {

  const date = moment(newTimeslot.dateEnd).format('YYYY-MM-DD');
  const startTime = moment.utc(newTimeslot.dateStart).format("HH:mm:ss");
  const endTime = moment.utc(newTimeslot.dateEnd).format("HH:mm:ss")

  const [tennisCourts, setTennisCourts] = useState([]);
  const [persons, setPerson] = useState([]);
  const [showUpdateTimeslotForm, setUpdateTimeslotForm] = useState(false);
  const [buttonName, setButtonName] = useState("Update timeslot");
  const [timeslot, setTimeslot] = useState(newTimeslot);
  const [errorMessagePersons, setErrorMessagePerson] = useState("");
  const [errorMessageTennisCourts, setErrorMessageTennisCourts] = useState("");
  const [isShowMessagePersons, setIsShowMessagePersons] = useState(false);
  const [isShowMessageTennisCourts, setIsShowTennisCourts] = useState(false);

  useEffect(() => {
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
      setErrorMessageTennisCourts("");
      setIsShowTennisCourts(false);
    }).catch(() => {
      setErrorMessageTennisCourts("Couldn't load tennis courts.");
      setIsShowTennisCourts(true);
    })
  }, []);
  useEffect(() => {
    getAllPerson().then((data) => {
      setPerson(data.data);
      setErrorMessagePerson("");
      setIsShowMessagePersons(false);
    }).catch(() => {
      setErrorMessagePerson("Couldn't load persons.");
      setIsShowMessagePersons(true)
    })
  }, []);

  const eraseTimeslot = () => {
    deleteTimeslot(newTimeslot.id);
    setTimeslots(timeslots.filter((timeslot) => timeslot.id !== newTimeslot.id))
  }

  const addForm = () => {
    setUpdateTimeslotForm(!showUpdateTimeslotForm);
    showUpdateTimeslotForm ? setButtonName("Update timeslot") : setButtonName("Close form")
  }
  return (
    <>

      {isShowMessagePersons ? <h2 className="error-msg">{errorMessagePersons}</h2> : null}
      {isShowMessageTennisCourts ? <h2 className="error-msg">{errorMessageTennisCourts}</h2> : null}
      <ListGroup className='timeslotItem'>
        <ListGroup.Item className='date'>Date: {date}</ListGroup.Item>
        <ListGroup.Item className='startTime'>Start time: {startTime}</ListGroup.Item>
        <ListGroup.Item className='endTime'>End time: {endTime}</ListGroup.Item>
        <ListGroup.Item className="personTimeslot">
          {persons.map(person => (
            <span className="personInfo" key={person.id}>
              {person.id === newTimeslot.personId ? `Name: ${person.firstName} ${person.lastName}` : null}
            </span>
          ))}
        </ListGroup.Item>
        <ListGroup.Item className="courtTimeslot">
          {tennisCourts.map(tennisCourt => (
            <span key={tennisCourt.id}>
              {tennisCourt.id === newTimeslot.courtId ? `Tennis court: ${tennisCourt.name}` : null}
            </span>
          ))}
        </ListGroup.Item>
        <div className="btnWrapper">
          <Button className="updateTimeslotBtn" variant="none" onClick={addForm}>{buttonName}</Button>
          <Button className='deleteTimeslotBtn' variant="none"  onClick={eraseTimeslot}>Cancel timeslot</Button>
        </div>
        {showUpdateTimeslotForm && <UpdateTimeslot
          existingTimeslot={timeslot}
          setTimeslot={setTimeslot}
          timeslotId={newTimeslot.id}
          courtId={newTimeslot.courtId}
          date={date}
          startTime={startTime}
          endTime={endTime}
          tennisCourts={tennisCourts}
          setTennisCourts={setTennisCourts}
          persId={newTimeslot.personId}
          persons={persons}
          setPerson={setPerson}
          timeslots={timeslots}
          setTimeslots={setTimeslots}
        />}
      </ListGroup>

    </>
  )
}

export default Timeslot