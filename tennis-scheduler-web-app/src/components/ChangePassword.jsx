import React, { useState } from "react"
import { Modal } from "react-bootstrap";
import '../styles/ProfileComponent.css';
import '../App.css'

export const ChangePassword = props => {

    const [formValues, setFormValues] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [formErrors, setFormErrors] = useState({});
    const [passwordMessage, setPasswordMessage] = useState("");

    const changePasswordSubmit = e => {
        e.preventDefault();
        setFormErrors(validation(formValues));
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues((formValues) => ({ ...formValues, [name]: value }));
    };

    const validation = form => {
        const errors = {};
        if (!form.oldPassword) errors.oldPassword = "Old password is required!";
        if (!form.newPassword) errors.newPassword = "New password is required!";
        else if (form.oldPassword === form.newPassword) errors.newPassword = "New password must be deferent then old one!"
        if (!form.confirmPassword) errors.confirmPassword = "Confirm password is required";
        else if (form.newPassword !== form.confirmPassword) errors.confirmPassword = "New password and confirm password must be the same!"

        return errors;
    };

    return (
        <Modal show={props.show} cancel={props.close} size="sm" centered>
            <Modal.Header>
                <Modal.Title>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={changePasswordSubmit}>
                    <label htmlFor="oldPassword">Old password</label>
                    <input type="password" value={formValues.oldPassword} placeholder="********" name="oldPassword"
                        className="form-control" id="oldPassword" onChange={handleChange} />
                    <p className="errors">{formErrors.oldPassword}</p>
                    <label htmlFor="newPassword"> New password</label>
                    <input type="password" placeholder="********" id="newPassword" name="newPassword" className="form-control"
                        value={formValues.newPassword} onChange={handleChange} />
                    <p className="errors">{formErrors.newPassword}</p>
                    <label htmlFor="confirmPassword"> Confirm password</label>
                    <input type="password" placeholder="********" id="confirmPassword" name="confirmPassword"
                        className="form-control" onChange={handleChange} value={formValues.confirmPassword} />
                    <p className="errors">{formErrors.confirmPassword}</p>
                </form>
                <p className="errors">{passwordMessage} </p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.close} className="button-profile">Cancel</button>
                <button type="submit" onClick={changePasswordSubmit} className="button-forms">Save</button>
            </Modal.Footer>
        </Modal>
    )
}