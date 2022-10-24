import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const AddTimeslot = () => {

  const [date,setDate] = useState(new Date());
  const [startTime,setStartTime] = useState(new Date().getTime());
  const [endTime,setEndTime] = useState(new Date().getTime());

  return (
    <Form className='form'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Choose date:</Form.Label>
      <Form.Control 
      type="date" 
      value={date}
      onChange={(e)=>setDate(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Start time:</Form.Label>
      <Form.Control
      type="time"
      value={startTime}
      onChange={(e)=>setStartTime(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>End time:</Form.Label>
      <Form.Control type="time"
      value={endTime}
      onChange={(e)=>setEndTime(e.target.value)} />
    </Form.Group>
    <Button variant="primary" type="submit">
      Add timeslot
    </Button>
  </Form>
  )
}

export default AddTimeslot