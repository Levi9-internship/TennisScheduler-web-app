import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Registration = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const registrationSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
  };

  const validation = (form) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form.name) errors.name = "Name is required!";
    if (!form.surname) errors.surname = "Surname is required!";
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
    return errors;
  };

  return (
    <div className="auth-form-container">
      <h2 className="header-style"> Register</h2>
      <form onSubmit={registrationSubmit} className="register-form">
        <label htmlFor="name"> Your name</label>
        <input
          type="text"
          value={formValues.name}
          onChange={handleChange}
          placeholder="John"
          id="name"
          name="name"
        />
        <p className="errors"> {formErrors.name}</p>
        <label htmlFor="surname"> Your surname</label>
        <input
          type="text"
          value={formValues.surname}
          onChange={handleChange}
          placeholder="Marks"
          id="surname"
          name="surname"
        />
        <p className="errors"> {formErrors.surname}</p>
        <label htmlFor="email"> Your email</label>
        <input
          type="text"
          value={formValues.email}
          onChange={handleChange}
          placeholder="youremail@mail.com"
          id="email"
          name="email"
        />
        <p className="errors"> {formErrors.email}</p>
        <label htmlFor="password"> Your password</label>
        <input
          type="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="********"
          id="password"
          name="password"
        />
        <p className="errors"> {formErrors.password}</p>
        <label htmlFor="confirmPassword"> Confirm password</label>
        <input
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          id="confirmPassword"
          name="confirmPassword"
        />
        <p className="errors"> {formErrors.confirmPassword}</p>
        <button className="loginButton" type="submit"> Register</button>
      </form>
      <Link to="/login">
        {" "}
        <button className="link-button">
          Already have an account? Log in here.{" "}
        </button>
      </Link>
    </div>
  );
};
