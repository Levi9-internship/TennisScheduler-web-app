import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getLoggedUser, changeProfileInformation } from "../api/PersonApi";
import '../styles/ProfileComponent.css';
import 'react-toastify/dist/ReactToastify.css';


export const EditProfile = () => {
    const [user, setUser] = useState({ id: 0, firstName: "", lastName: "", email: "", phoneNumber: "", birthday: undefined, gender: undefined, address: { id: 0, street: "", city: "", number: undefined, country: "" } });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("")
    const [isFormEmpty, setIsFormEmpty] = useState(true)

    useEffect(() => {
        getLoggedUser().then((response) => setUser(response.data)).catch(() => setErrorMessage("Something went wrong, try again."))
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const editProfileSubmit = e => {
        e.preventDefault();
        setFormErrors(validation(user));
        if (Object.keys(formErrors).length === 0 && !isFormEmpty) {
            changeProfileInformation(user).then((response) => {
                setUser(response.data);
                toast.success("You successfully changed your data!", { position: toast.POSITION.BOTTOM_CENTER })
            }).catch(() => toast.error("Failed to change information. Try again", { position: toast.POSITION.BOTTOM_CENTER }))
        }
    };

    const validation = form => {
        const errors = {};
        const phoneRegex = new RegExp(/^$|^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
        const lettersRegex = new RegExp(/^$|^[A-Za-z ]+$/);
        const streetNumberRegex = new RegExp("^\\d+$");

        if (!form.firstName) errors.name = "Name is required!";
        if (!form.lastName) errors.surname = "Surname is required!";
        if (!phoneRegex.test(form.phoneNumber)) errors.phoneNumber = "Please enter valid format for phone number!"
        if (!lettersRegex.test(form.address.country)) errors.country = "Only letters are valid!"
        if (!lettersRegex.test(form.address.city)) errors.city = "Only letters are valid!"
        if (!lettersRegex.test(form.address.street)) errors.street = "Only letters are valid!"
        if (!streetNumberRegex.test(form.address.number)) errors.number = "Only numbers are allowed!"
        setIsFormEmpty(false);
        return errors;
    };

    return (
        <div className="home-card">
            <div className="card">
                <div className="card-header">
                    Your personal informations
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="profile-photo-edit" src={require('../images/user_profile.png')} />
                        </div>
                        <div className="col-md-7 informations">
                            <form onSubmit={editProfileSubmit}>
                                <label htmlFor="name"> Name</label>
                                <input type="text" value={user.firstName} onChange={handleChange} className="form-control" id="name" name="firstName" />
                                <p className="errors">{formErrors.name}</p>
                                <label htmlFor="surname"> Surname</label>
                                <input type="text" value={user.lastName} onChange={handleChange} className="form-control" id="surname" name="lastName" />
                                <p className="errors">{formErrors.surname}</p>
                                <label htmlFor="phone">Phone number</label>
                                <input type="number" value={user.phoneNumber} onChange={handleChange} className="form-control" id="phone" name="phoneNumber" />
                                <p className="errors">{formErrors.phoneNumber} </p>
                                <label htmlFor="gender">Gender</label>
                                <div className="row ">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value={'MALE'} checked={user.gender === 'MALE'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="male"> Male</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value={"FEMALE"} checked={user.gender === 'FEMALE'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="female"> Female </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>Street</label>
                                        <input type="text" className="form-control" defaultValue={user.address.street} onChange={(e) => user.address.street = e.target.value} />
                                        <p className="errors"> {formErrors.street}</p>
                                    </div>
                                    <div className="col">
                                        <label>Street number</label>
                                        <input type="text" className="form-control" defaultValue={user.address.number} onChange={(e) => user.address.number = e.target.value} />
                                        <p className="errors"> {formErrors.number}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>City</label>
                                        <input type="text" className="form-control" defaultValue={user.address.city} onChange={(e) => user.address.city = e.target.value} />
                                        <p className="errors"> {formErrors.city}</p>
                                    </div>
                                    <div className="col">
                                        <label>Country</label>
                                        <input type="text" className="form-control" defaultValue={user.address.country} onChange={(e) => user.address.country = e.target.value} />
                                        <p className="errors"> {formErrors.country}</p>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col">
                                    <Link to="/profile"><button className="button-edit"> Cancel</button></Link>
                                </div>
                                <div className="col">
                                    <button className="button-save" type="submit" onClick={editProfileSubmit}> Save changes</button></div>
                            </div>
                            <p className="errors">{errorMessage}</p>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}