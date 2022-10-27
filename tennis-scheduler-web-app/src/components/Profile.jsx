import React, { useState, useEffect } from "react"
import '../styles/ProfileComponent.css';
import { Link, useParams } from 'react-router-dom'
import { ChangePassword } from "./ChangePassword";
import { getLoggedUser, getUserById } from "../api/PersonApi";
import Moment from 'moment';

export const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({ id: undefined, firstName: "", lastName: "", email: "", phoneNumber: "", birthday: undefined, gender: undefined, address: { id: "", street: "", city: "", number: undefined, country: "" } });
    const [errorMessage, setErrorMessage] = useState("");
    const [check, setCheck] = useState(false);

    const id = useParams().id

    useEffect(() => {
        if (id)
            getUserById(parseInt(id)).then((response) => setUser(response.data)).catch(() => setErrorMessage("Failed to load profile informations."))
        else {
            getLoggedUser().then((response) => setUser(response.data)).catch(() => setErrorMessage("Failed to load profile informations."))
            setCheck(true)
        }
    }, []);

    useEffect(() => {
        if (parseInt(id) === user.id) setCheck(true);
    }, [])

    return (
        <div className="home-card">
            <div className="card">
                <div className="card-header">
                    Your personal informations
                </div>
                <div className="card-body">
                    <h1>{errorMessage}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <img className="profile-photo" src={require('../images/user_profile.png')} />
                        </div>
                        <div className="col informations">
                            <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                            <p>{user.email}</p>
                            <p>{user.phoneNumber}</p>
                            <p>{Moment(user.birthday).format('MMMM Do YYYY.')}</p>
                            <p>{user.gender}</p>
                            <p>{user.address.street} {user.address.number}, {user.address.city} {user.address.country}</p>
                            {(() => {
                                if (check) {
                                    return (
                                        <div className="row">
                                            <div className="col">
                                                <ChangePassword show={showModal} close={() => setShowModal(false)}>
                                                </ChangePassword>
                                                <button type="button" className="button-profile" onClick={() => { setShowModal(true) }}>
                                                    Change password
                                                </button>
                                            </div>
                                            <div className="col">
                                                <Link to={{ pathname: "/profile-info" }}><button className="button-profile"> Edit profile</button> </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}