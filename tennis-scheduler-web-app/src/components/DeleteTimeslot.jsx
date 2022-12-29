import { Modal } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ProfileComponent.css';
import '../App.css';
import { deleteTimeslot } from "../api/TimeslotApi";

const DeleteTimeslot = ({refresh, show, close, idTimeslot}) => {

    const cancelTimeslot = () => {
        deleteTimeslot(idTimeslot)
            .then(() => refresh())
      }

    return (
        <Modal show={show} size="sm" centered>
            <Modal.Header>
                <Modal.Title>Cancel timeslot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={cancelTimeslot}>
                    <label htmlFor="labelForCancelation">Do you want to cancel this timeslot?</label>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={close} className="button-profile">No</button>
                <button type="submit" onClick={cancelTimeslot} className="button-forms">Yes</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTimeslot