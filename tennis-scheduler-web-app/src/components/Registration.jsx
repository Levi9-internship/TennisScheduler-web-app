import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/PersonApi";

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
      number: 0,
      city: "",
      country: ""
    }
  });

  const [formErrors, setFormErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [colorChange, setColorChange] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const registrationSubmit = e => {
    e.preventDefault();
    setFormErrors(validation(formValues));

    if (Object.keys(formErrors).length === 0 && !isFormEmpty) {
      register(formValues).then(() =>
        setRegistrationMessage("You registred sucessfully, go and log in with your email and password"))
        .catch((error) => {
          console.log(error);
          setRegistrationMessage("Your registration failed, try again!");
          setColorChange(true);
        })
    }
  };

  const validation = form => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form.firstName) errors.name = "Name is required!";
    if (!form.lastName) errors.surname = "Surname is required!";
    if (!form.email) errors.email = "Email is required!";
    else if (!regex.test(form.email))
      errors.email = "This is not a valid email format!";
    if (!form.password) errors.password = "Password is required!";
    else if (form.password.length < 8)
      errors.password = "Password must have minimum 8 characters";
    if (!form.confirmPassword)
      errors.confirmPassword = "Confirm password is required!";
    else if (form.confirmPassword !== form.password)
      errors.confirmPassword = "Passwords must be equals!";
    setIsFormEmpty(false);
    return errors;
  };

  return (
    <div className="auth-form-container">
      <h2 className="header-style"> Register</h2>
      <form onSubmit={registrationSubmit} className="register-form">
        <label htmlFor="firstName"> Your name</label>
        <input type="text" value={formValues.firstName} onChange={handleChange} placeholder="John" id="firstName" name="firstName" />
        <p className="errors"> {formErrors.name}</p>
        <label htmlFor="surname"> Your surname</label>
        <input type="text" value={formValues.lastName} onChange={handleChange} placeholder="Marks" id="lastName" name="lastName" />
        <p className="errors"> {formErrors.surname}</p>
        <label htmlFor="email"> Your email</label>
        <input type="text" value={formValues.email} onChange={handleChange} placeholder="youremail@mail.com" id="email" name="email" />
        <p className="errors"> {formErrors.email}</p>
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
        <p className="errors"> {formErrors.password}</p>
        <label htmlFor="confirmPassword"> Confirm password</label>
        <input type="password" value={formValues.confirmPassword} onChange={handleChange} placeholder="********" id="confirmPassword" name="confirmPassword" />
        <p className="errors"> {formErrors.confirmPassword}</p>
        <button type="submit" className="button-forms"> Register</button>
        <p style={{ backgroundColor: 'white', color: colorChange ? 'red' : 'green' }}> {registrationMessage}</p>
      </form>
      <Link to="/login">
        <button className="link-button">
          Already have an account? Log in here.
        </button>
      </Link>
    </div>
  );
};
