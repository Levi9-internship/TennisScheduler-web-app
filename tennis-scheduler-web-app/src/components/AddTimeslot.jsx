import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal } from "react-bootstrap";
import { getAllPerson } from "../api/PersonApi";
import {getTennisCourts} from "../api/TennisCourtApi";
import jwtDecode from 'jwt-decode'
import "../styles/courts.css";


const AddTimeslot = ({ show, close, onAdd, id, errorMessage,isError }) => {
  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [timeslotDate, setTimeslotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [invalidDate, setInvalidDate] = useState("");
  const [invalidStarTime, setInvalidStartTime] = useState("");
  const [invalidEndTime, setInvalidEndTime] = useState("");
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState(1);
  const [courtId, setTennisCourtId] = useState(1);
  const [tennisCourts, setTennisCourts] = useState([]);

  useEffect(() => {
    whoAmI();
    getAllPerson().then((data) => {
      setPersons(data.data);
      setPerson(data.data[0].id);
    });
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
      setTennisCourtId(data.data[0].id);
    });
  }, []);

  const whoAmI = () => {
      if (getUserRole() === 'ROLE_TENNIS_PLAYER')
        setTennisPlayer(true);
      if (getUserRole() === 'ROLE_ADMIN')
        setAdmin(true);
    }

  const getUserRole = () => {
  if (localStorage.getItem("token"))
      return jwtDecode(localStorage.getItem("token")).role;
  else return ""
  }

  const onSubmit = (e) => {

    e.preventDefault();

    setInvalidDate("");
    setInvalidStartTime("");
    setInvalidEndTime("");

    if (timeslotDate === "") 
      setInvalidDate("Please choose date");
    if (startTime === "") 
      setInvalidStartTime("Please choose start time");
    if (endTime === "") 
      setInvalidEndTime("Please choose end time");

    if(endTime==="" || startTime==="" || timeslotDate=="")
      return

    if (id != -1){
      onAdd({ id, startTime, endTime, timeslotDate, person })
    }
    else{
      onAdd({ "id" : courtId, startTime, endTime, timeslotDate, person })
    }
    if(isError)
      close(e)

    setTimeslotDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <Modal show={show} size="lg" centered>
      <Form className='form' onSubmit={onSubmit}>
        <div className="form-position"> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose date:</Form.Label>
          <Form.Control
            type="date"
            value={timeslotDate}
            onChange={(e) => setTimeslotDate(e.target.value.toString())} />
          <Form.Text className="text-muted">
            <p>{invalidDate}</p>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Start time:</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value.toString())} />
          <Form.Text className="text-muted">
            <p>{invalidStarTime}</p>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>End time:</Form.Label>
          <Form.Control type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value.toString())} />
          <Form.Text className="text-muted">
            <p>{invalidEndTime}</p>
          </Form.Text>
        </Form.Group>
        {admin ? <div><Form.Group>
                  <Form.Label>Choose person:</Form.Label>
                  <Form.Select className='personSelect' onChange={(e) => {
                      setPerson(e.target.value)}}>
                      {persons.map(person => (
                          <option key={person.id}
                              value={person.id}>
                              {person.firstName} {person.lastName}
                          </option>
                      ))}
                  </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Choose tennis court:</Form.Label>
                    <Form.Select className='tennisCourtsSelect'
                        onChange={(e) => {
                        setTennisCourtId(e.target.value)
                    }}>
                        {tennisCourts.map(tennisCourt => (
                            <option key={tennisCourt.id} value={tennisCourt.id}>
                                {tennisCourt.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
              </div> : "" }
          <div className='buttonsForm'>
          <div className='saveResBtn'>   
          <Button variant="primary" type="submit">
            Save reservation
          </Button>
          <Form.Text className="text-muted">
            <p>{errorMessage}</p>
          </Form.Text>
          </div>
          <div>
          <Button variant="primary" onClick={close}>
            Close
          </Button>
          </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default AddTimeslot