import React from "react"
import '../styles/ProfileComponent.css';
import { Link } from "react-router-dom";
export const EditProfile = () => {

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
                                <img className="profile-photo-edit" src={require('../images/user_profile.png')} />
                            </div>

                            <div className="col-md-7 informations">
                                <form>
                                    <label htmlFor="name" > Name</label>
                                    <input type="text" className="form-control" id="name" value={'name'} />
                                    <label htmlFor="surname" > Surname</label>
                                    <input type="text" className="form-control" id="surname" value={'surname'} />
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" value={'email'} />
                                    <label htmlFor="phone">Phone number</label>
                                    <input type="text" className="form-control" id="phone" value={'426554848'} />
                                    <label htmlFor="gender">Gender</label>
                                    <div className="row ">
                                        <div className="col">
                                            <input className="form-check-input" type="radio" name="gender" id="male" />
                                            <label className="form-check-label" for="male"> Male</label>
                                        </div>
                                        <div className="col">
                                            <input class="form-check-input" type="radio" name="gender" id="female" />
                                            <label class="form-check-label" for="female"> Female </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label>Street</label>
                                            <input type="text" className="form-control" id="street" value={'street'} />
                                        </div>
                                        <div className="col">
                                            <label>Street number</label>
                                            <input type="text" className="form-control" id="number" value={'14'} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label>City</label>
                                            <input type="text" className="form-control" id="city" value={'Sabac'} />
                                        </div>
                                        <div className="col">
                                            <label>Country</label>
                                            <input type="text" className="form-control" id="country" value={'Srbija'} />
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col">
                                        <Link to="/profile">   <button className="button-edit"> Cancel</button></Link>
                                    </div>
                                    <div className="col">
                                        <Link to="/profile">   <button className="button-save"> Save changes</button></Link></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}