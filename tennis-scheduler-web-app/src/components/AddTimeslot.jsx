import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/courts.css";

const AddTimeslot = ({ onAdd, id, errorMessage }) => {

  const [timeslotDate, setTimeslotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [invalidDate, setInvalidDate] = useState("");
  const [invalidStarTime, setInvalidStartTime] = useState("");
  const [invalidEndTime, setInvalidEndTime] = useState("");

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

    onAdd({ id, startTime, endTime, timeslotDate });

    setTimeslotDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
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
      <Button variant="primary" type="submit">
        Save reservation
      </Button>
      <Form.Text className="text-muted">
        <p>{errorMessage}</p>
      </Form.Text>
      </div>
    </Form>
  )
}

export default AddTimeslot