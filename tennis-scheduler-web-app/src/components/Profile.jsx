import React, { useState } from "react"
import '../styles/ProfileComponent.css';
import { Link } from 'react-router-dom'
import { ChangePassword } from "./ChangePassword";

export const Profile = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="home-card">
                <div className="card">
                    <div class="card-header">
                        Your personal informations
                    </div>
                    <div class="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img className="profile-photo" src={require('../images/user_profile.png')} />
                            </div>
                            <div className="col informations">
                                <h5 class="card-title">Ime i prezime</h5>
                                <p>email</p>
                                <p>broj telefona</p>
                                <p>datum rodjenja</p>
                                <p>pol</p>
                                <p>adresa</p>
                             <div className="row">
                            <div className="col">
                                <ChangePassword show={showModal} close={() => setShowModal(false)}>
                                </ChangePassword>
                                <button type="button" className="button-profile" onClick={() => { setShowModal(true) }}>
                                    Change password
                                </button>
                            </div>
                            <div className="col">
                                <Link to="/profile/125"><button className="button-profile"> Edit profile</button> </Link> </div>
                        </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}