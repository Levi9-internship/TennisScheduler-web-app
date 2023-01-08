import { Modal } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ProfileComponent.css';
import '../App.css';
import { deleteTennisCourt } from "../api/TennisCourtApi";

const DeleteTennisCourt = ({refresh, show, close, idTennisCourt}) => {

    const deleteCourt = (e) => {
       deleteTennisCourt(idTennisCourt)
            .then(()=>{refresh()})
        close(e)
      }

    return (
        <Modal show={show} size="sm" centered>
            <Modal.Header>
                <Modal.Title>Delete tennis court</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={deleteCourt}>
                    <label htmlFor="labelForCancelation">Do you want to delete this tennis court?</label>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={close} className="button-profile">No</button>
                <button type="submit" onClick={deleteCourt} className="button-forms">Yes</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTennisCourt