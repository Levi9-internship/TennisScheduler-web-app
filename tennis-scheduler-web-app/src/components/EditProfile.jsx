import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getLoggedUser, changeProfileInformation } from "../api/PersonApi";
import '../styles/ProfileComponent.css';
import 'react-toastify/dist/ReactToastify.css';


export const EditProfile = () => {
    const [user, setUser] = useState({ id: 0, firstName: "", lastName: "", email: "", phoneNumber: "", birthday: undefined, gender: undefined, address: { id: 0, street: "", city: "", number: undefined, country: "" } });

    const [errorName, setErrorName] = useState("")
    const [errorSurname, setErrorSurname] = useState("")
    const [isFormEmpty, setIsFormEmpty] = useState(true)
    const [errorMessage,setErrorMessage]=useState("");

    useEffect(() => {
        getLoggedUser().then((response) => setUser(response.data)).catch(() => setErrorMessage("Something went wrong, try again."))
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const editProfileSubmit = e => {
        e.preventDefault();
        
        setErrorSurname("")
        setErrorName("")

        if (user.firstName === "")
            setErrorName("name isnt valid");
        if (user.lastName === "") 
            setErrorSurname("surname isnt valid");
        
        if(user.firstName === "" || user.lastName === "")
            return

        changeProfileInformation(user).then((response) => {
            setUser(response.data);
            toast.success("You successfully changed your data!", { position: toast.POSITION.BOTTOM_CENTER })
        }).catch(() => toast.error("Failed to change information. Try again", { position: toast.POSITION.BOTTOM_CENTER }))
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
                                <p className="errors">{errorName}</p>
                                <label htmlFor="surname"> Surname</label>
                                <input type="text" value={user.lastName} onChange={handleChange} className="form-control" id="surname" name="lastName" />
                                <p className="errors">{errorSurname}</p>
                                <label htmlFor="phone">Phone number</label>
                                <input type="number" value={user.phoneNumber} onChange={handleChange} className="form-control" id="phone" name="phoneNumber" />
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
                                    </div>
                                    <div className="col">
                                        <label>Street number</label>
                                        <input type="text" className="form-control" defaultValue={user.address.number} onChange={(e) => user.address.number = e.target.value} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>City</label>
                                        <input type="text" className="form-control" defaultValue={user.address.city} onChange={(e) => user.address.city = e.target.value} />
                                    </div>
                                    <div className="col">
                                        <label>Country</label>
                                        <input type="text" className="form-control" defaultValue={user.address.country} onChange={(e) => user.address.country = e.target.value} />
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