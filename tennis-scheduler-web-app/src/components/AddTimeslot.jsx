import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal } from "react-bootstrap";
import { getAllPerson } from "../api/PersonApi";
import jwtDecode from 'jwt-decode'
import "../styles/courts.css";


const AddTimeslot = ({ show, close, onAdd, id, errorMessage }) => {
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

  useEffect(() => {
    getAllPerson().then((data) => {
      setPersons(data.data);
    })
  }, []);

  useEffect(() => {
    whoAmI()
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

    onAdd({ id, startTime, endTime, timeslotDate, person });

    setTimeslotDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <Modal show={show} cancel={close} size="lg" centered>

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
        {admin ? <span><Form.Group>
                  <Form.Label>Choose person:</Form.Label>
                  <Form.Select className='personSelect' onChange={(e) => {
                      setPerson(e.target.value)
                      console.log(person)}}>
                      {persons.map(person => (
                          <option key={person.id}
                              value={person.id}>
                              {person.firstName} {person.lastName}
                          </option>
                      ))}
                  </Form.Select>
              </Form.Group>
              </span> : "" }
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