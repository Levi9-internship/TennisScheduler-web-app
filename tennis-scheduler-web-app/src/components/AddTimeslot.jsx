import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import "../styles/courts.css";

const AddTimeslot = ({ onAdd, id, errorMessage}) => {

  const [timeslotDate, setTimeslotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSubmit = (e) => {

    e.preventDefault();

    onAdd({ id, startTime, endTime, timeslotDate });

    setTimeslotDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <Form className='form' onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Choose date:</Form.Label>
        <Form.Control
          type="date"
          value={timeslotDate}
          onChange={(e) => setTimeslotDate(e.target.value.toString())} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Start time:</Form.Label>
        <Form.Control
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value.toString())} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>End time:</Form.Label>
        <Form.Control type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value.toString())} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save reservation
      </Button>
      <Form.Text className="text-muted">
        <p>{errorMessage}</p>
      </Form.Text>
    </Form>
  )
}

export default AddTimeslot