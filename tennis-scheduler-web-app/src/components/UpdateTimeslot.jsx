import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateTimeslot } from '../api/TimeslotApi'
import { getAllPerson } from "../api/PersonApi";
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'
import { Modal } from "react-bootstrap";

const UpdateTimeslot = ({ setTimeslots, timeslots, existingTimeslot, setTimeslot, timeslotId, courtId, date, startTime, endTime, tennisCourts, persId, setTennisCourts, persons, setPerson, show, close, refresh }) => {
    const [tennisPlayer, setTennisPlayer] = useState(false);
    const [admin, setAdmin] = useState(false);
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
    const [isError,setIsError] = useState(false); 

    useEffect(() => {
        whoAmI();
        getAllPerson().then((data) => {
            setPerson(data.data);
          })
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

    const addTimeslot = async (timeslot) => {

        let newTimeslot = {
            "id": timeslot.id,
            "dateStart": `${timeslot.updatedDate}T${timeslot.updatedStartTime}.174Z`,
            "dateEnd": `${timeslot.updatedDate}T${timeslot.updatedEndTime}.174Z`,
            "personId": timeslot.personId,
            "courtId": timeslot.tennisCourtId
        };

        await updateTimeslot(timeslot.id, newTimeslot).then(() => {
            setTimeslotErrors("");
            setIsError(false)
            refresh();
        }).catch((errorMessage) => {
            setTimeslotErrors(errorMessage.response.data.message[0].defaultMessage);
            setIsError(false)
        })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        setInvalidDate("");
        setInvalidStartTime("");
        setInvalidEndTime("");

        if (updatedDate === "")
            setInvalidDate("Please choose date");
        if (updatedStartTime === "") 
            setInvalidStartTime("Please choose start time");
        if (updatedEndTime === "") 
            setInvalidEndTime("Please choose end time");
        
        if(updatedDate==="" || updatedStartTime==="" || updatedEndTime=="")
            return

        addTimeslot({ id, updatedStartTime, updatedEndTime, updatedDate, personId, tennisCourtId });

        if(isError)
            close(e)

        setTimeslotDate(updatedDate);
        setStartTime(updatedStartTime);
        setEndTime(updatedEndTime);
        refresh();
    }
    
    return (
        <Modal show={show} size="lg" centered>
            <Form className='form' onSubmit={onSubmit}>
            <div className="form-position"> 
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
            {admin ? <span><Form.Group>
                        <Form.Label>Choose person:</Form.Label>
                        <Form.Select className='personSelect' onChange={(e) => {
                            setPersonId(e.target.value)
                            }} defaultValue={persId}>
                            {persons.map(person => (
                                <option key={person.id}
                                    value={person.id}>
                                    {person.firstName} {person.lastName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    </span> : "" }
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
                <div className='buttonsForm'>
                <div className='saveResBtn'>   
                <Button variant="primary" type="submit">
                Update
                </Button>
                <Form.Text className="text-muted">
                    <p>{timeslotErrors}</p>
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

export default UpdateTimeslot