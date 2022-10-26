import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import '../styles/ProfileComponent.css';
import { getLoggedUser } from "../api/PersonApi";

export const EditProfile = () => {
    const [user, setUser] = useState({ id: 0, firstName: "", lastName: "", email: "", phoneNumber: "", birthday: "", gender: "", address: { id: 0, street: "", city: "", number: 0, country: "" } });
    const [formErrors, setFormErrors] = useState({});
    const [ errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getLoggedUser().then((response) => setUser(response.data)).catch((error) => setErrorMessage("Something went wrong, try again."))
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const editProfileSubmit = e => {
        e.preventDefault();
        setFormErrors(validation(user));
    };

    const validation = form => {
        const errors = {};
        if (!form.firstName) errors.name = "Name is required!";
        if (!form.lastName) errors.surname = "Surname is required!";
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
                                    <input type="text" value={user.phoneNumber} onChange={handleChange} className="form-control" id="phone" name="phoneNumber" />
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
                                            <input type="text" className="form-control" defaultValue={user.address.street} onChange={handleChange} />
                                        </div>
                                        <div className="col">
                                            <label>Street number</label>
                                            <input type="text" className="form-control" defaultValue={user.address.number} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label>City</label>
                                            <input type="text" className="form-control" defaultValue={user.address.city} onChange={handleChange} />
                                        </div>
                                        <div className="col">
                                            <label>Country</label>
                                            <input type="text" className="form-control" defaultValue={user.address.country} onChange={handleChange} />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}