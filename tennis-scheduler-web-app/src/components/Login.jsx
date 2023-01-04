import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { login } from "../api/PersonApi";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const loginSubmit = e => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    if (Object.keys(formErrors).length === 0) {
      login(formValues).then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/');
        window.location.reload();
      }).catch(() => toast.error('Wrong credentials, try again.', { position: toast.POSITION.BOTTOM_CENTER }))
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const validation = form => {
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
        <input type="text" value={formValues.email} onChange={handleChange} placeholder="email" id="email" name="email" />
        <p className="errors"> {formErrors.email}</p>
        <label htmlFor="password"> Your password</label>
        <input type="password" value={formValues.password} onChange={handleChange} placeholder="********" id="password" name="password" />
        <p className="errors"> {formErrors.password}</p>
        <button type="submit" className="button-forms"> Log in</button>
        <ToastContainer />
      </form>
      <Link to="/registration">
        <button className="link-button">
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
};
