import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { register } from "../api/PersonApi";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const Registration = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "MALE",
    address: {
      street: "",
      number: undefined,
      city: "",
      country: ""
    }
  });
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError , setPasswordError] = useState("");
  const [confirmPasswordError , setConfirmPasswordError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const registrationSubmit = e => {
    e.preventDefault();

    validation(formValues);

    // if(!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.email)

    register(formValues).then(() => {
      toast.success('You registred sucessfully, go and log in with your email and password', { position: toast.POSITION.BOTTOM_CENTER });
      navigate('/login');
    }).catch((error) => {
      if (error.response.status === 401) {
        toast.error('This email is taken', { position: toast.POSITION.BOTTOM_CENTER });
      } else {
        toast.error('Something went wrong, try again later.', { position: toast.POSITION.BOTTOM_CENTER });
      }
    })
    
  };

  const validation = (form) => {
    setNameError("")
    setSurnameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form.firstName) setNameError("Name is required!");
    if (!form.lastName) setSurnameError("Surname is required!");
    if (!form.email) setEmailError("Email is required!");
    else if (!regex.test(form.email))
      setEmailError("This is not a valid email format!");
    if (!form.password) setPasswordError("Password is required!");
    else if (form.password.length < 8)
      setPasswordError("Password must have minimum 8 characters");
    if (!form.confirmPassword)
      setConfirmPasswordError("Confirm password is required!");
    else if (form.confirmPassword !== form.password)
      setConfirmPasswordError("Passwords must be equals!");
    
    return
  };

  return (
    <div className="auth-form-container">
      <h2 className="header-style"> Register</h2>
      <form onSubmit={registrationSubmit} className="register-form">
        <label htmlFor="firstName"> Your name</label>
        <input type="text" value={formValues.firstName} onChange={handleChange} placeholder="Name" id="firstName" name="firstName" />
        <p className="errors"> {nameError}</p>
        <label htmlFor="surname"> Your surname</label>
        <input type="text" value={formValues.lastName} onChange={handleChange} placeholder="Surname" id="lastName" name="lastName" />
        <p className="errors"> {surnameError}</p>
        <label htmlFor="email"> Your email</label>
        <input type="text" value={formValues.email} onChange={handleChange} placeholder="Email" id="email" name="email" />
        <p className="errors"> {emailError}</p>
        <label htmlFor="gender">Gender</label>
        <div className="row gender-row">
          <div className="col">
            <input className="form-check-input" type="radio" name="gender" id="male" value={'MALE'} checked={formValues.gender === 'MALE'} onChange={handleChange} />
            <label className="form-check-label" htmlFor="male"> M </label>
          </div>
          <div className="col">
            <input className="form-check-input" type="radio" name="gender" id="female" value={"FEMALE"} checked={formValues.gender === 'FEMALE'} onChange={handleChange} />
            <label className="form-check-label" htmlFor="female"> F </label>
          </div>
        </div>
        <label htmlFor="password"> Your password</label>
        <input type="password" value={formValues.password} onChange={handleChange} placeholder="********" id="password" name="password" />
        <p className="errors"> {passwordError}</p>
        <label htmlFor="confirmPassword"> Confirm password</label>
        <input type="password" value={formValues.confirmPassword} onChange={handleChange} placeholder="********" id="confirmPassword" name="confirmPassword" />
        <p className="errors"> {confirmPasswordError}</p>
        <button type="submit" className="button-forms"> Register</button>
        <ToastContainer />
      </form>
      <Link to="/login">
        <button className="link-button">
          Already have an account? Log in here.
        </button>
      </Link>
    </div>
  );
};
