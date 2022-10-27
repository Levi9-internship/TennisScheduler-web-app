import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getTimeslot } from "../api/TimeslotApi";
import { updateTimeslot } from '../api/TimeslotApi'
import { useState, useEffect } from 'react';

const UpdateTimeslot = ({ setTimeslots,existingTimeslot, setTimeslot, timeslotId, courtId, date, startTime, endTime, tennisCourts, persId, setTennisCourts, persons, setPerson }) => {

    const [invalidDate, setInvalidDate] = useState("");
    const [invalidStarTime, setInvalidStartTime] = useState("");
    const [invalidEndTime, setInvalidEndTime] = useState("");
    const id = existingTimeslot.id


    const [tennisCourtId, setTennisCourtId] = useState(courtId);
    const [personId, setPersonId] = useState(persId);
    const [timeslotErrors, setTimeslotErrors] = useState("");
    const [updatedDate, setTimeslotDate] = useState(date);
    const [updatedStartTime, setStartTime] = useState(startTime);
    const [updatedEndTime, setEndTime] = useState(endTime);

    const addTimeslot = async (timeslot) => {

        let newTimeslot = {
            "dateStart": `${timeslot.updatedDate}T${timeslot.updatedStartTime}.174Z`,
            "dateEnd": `${timeslot.updatedDate}T${timeslot.updatedEndTime}.174Z`,
            "personId": timeslot.personId,
            "courtId": timeslot.tennisCourtId
        };

        updateTimeslot(id, newTimeslot).then(() => {
            setTimeslotErrors("");
        })
            .catch((errorMessage) => {
                setTimeslotErrors(errorMessage.response.data.message[0].defaultMessage);
            })


        // setTimeslotDate(timeslot.updatedDate.filter((timesl=>timesl.id!==timeslotId)))
        // setTimeslot(timeslots.filter((timeslot)=>timeslot.id!==timeslot.timeslotId,))
        // setTimeslot(timeslots.filter((timeslot)=>timeslot.id!==timeslotId))

        getTimeslot().then((data) => {
            setTimeslots(data.data);
        })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        setInvalidDate("");
        setInvalidStartTime("");
        setInvalidEndTime("");

        if (updatedDate === "") {
            setInvalidDate("Please choose date");
            return
        }
        if (updatedStartTime === "") {
            setInvalidStartTime("Please choose start time");
            return
        }
        if (updatedEndTime === "") {
            setInvalidEndTime("Please choose end time");
            return
        }

        addTimeslot({ id, updatedStartTime, updatedEndTime, updatedDate, personId, tennisCourtId });
        // window.location.reload(false);
        setTimeslotDate(updatedDate);
        setStartTime(updatedStartTime);
        setEndTime(updatedEndTime);

    }

    

    return (
        <Form className='form' onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Choose date:</Form.Label>
                <Form.Control
                    type="date"
                    value={updatedDate}
                    onChange={(e) => setTimeslotDate(e.target.value.toString())} />
                <Form.Text className="text-muted">
                    <p>{invalidDate}</p>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Start time:</Form.Label>
                <Form.Control
                    type="time"
                    value={updatedStartTime}
                    onChange={(e) => setStartTime(e.target.value.toString())} />
                <Form.Text className="text-muted">
                    <p>{invalidStarTime}</p>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>End time:</Form.Label>
                <Form.Control type="time"
                    value={updatedEndTime}
                    onChange={(e) => setEndTime(e.target.value.toString())} />
                <Form.Text className="text-muted">
                    <p>{invalidEndTime}</p>
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose tennis court:</Form.Label>
                <Form.Select className='tennisCourtsSelect' onChange={(e) => {
                    setTennisCourtId(e.target.value)
                }} defaultValue={courtId}>
                    {tennisCourts.map(tennisCourt => (
                        <option key={tennisCourt.id} value={tennisCourt.id}>
                            {tennisCourt.name}
                        </option>
                    ))}

                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose person:</Form.Label>
                <Form.Select className='personSelect' onChange={(e) => {
                    setPersonId(e.target.value)
                }} defaultValue={personId}>
                    {persons.map(person => (
                        <option key={person.id}
                            value={person.id}>
                            {person.firstName} {person.lastName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save reservation
            </Button>
            <Form.Text className="text-muted">
                <p>{timeslotErrors}</p>
            </Form.Text>
        </Form>
    )
}

export default UpdateTimeslot