import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    //there will be login request, it's done on another branch, for now it's hardcoded
    localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJUZW5uaXNTY2hlZHVsZXIiLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NjY4MTIxMjgsImV4cCI6MTY2Njg5ODUyOH0.2RPmmBO7q8lqX4KrJ0bGijzvYPaNkwwI7XRP4U-3Fk40KP7l5dhgoD6evhHNXlNlbu9yLvmF7uYCR-7OtSq-QA")
    localStorage.setItem("role", "ROLE_ADMIN")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const validation = (form) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form.email) errors.email = "Email is required!";
    else if (!regex.test(form.email))
      errors.email = "This is not a valid email format!";
    if (!form.password) errors.password = "Password is required!";

    return errors;
  };

  return (
    <div className="auth-form-container">
      <h2 className="header-style"> Login</h2>
      <form onSubmit={loginSubmit} className="login-form">
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
        <button className="loginButton" type="submit"> Log in</button>
        <p className="errors">{loginMessage}</p>
      </form>
      <Link to="/registration">
        {" "}
        <button className="link-button">
          {" "}
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
};
