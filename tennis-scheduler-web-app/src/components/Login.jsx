import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export const Login = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const loginSubmit = e => {
        e.preventDefault()
        setFormErrors(validation(formValues));
        setIsSubmit(true);
        //there will be login request, and loginMessage will be set if login is failed
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formErrors);
        }
    }, [formErrors]);

    const validation = form => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!form.email) {
            errors.email = "Email is required!"
        } else if (!regex.test(form.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!form.password) {
            errors.password = "Password is required!"
        }
        return errors;
    }

    return (

        <div className="auth-form-container">
            <h2 className="header-style"> Login</h2>
            <form onSubmit={loginSubmit} className="login-form">
                <label htmlFor="email"> Your email</label>
                <input type="text" value={formValues.email} onChange={handleChange} placeholder="youremail@mail.com" id="email" name="email" />
                <p className="errors"> {formErrors.email}</p>
                <label htmlFor="password"> Your password</label>
                <input type="password" value={formValues.password} onChange={handleChange} placeholder="********" id="password" name="password" />
                <p className="errors"> {formErrors.password}</p>
                <button type="submit"> Log in</button>
                <p className="errors">{loginMessage}</p>
            </form>
            <Link to="/registration" > <button className="link-button">  Don't have an account? Register here.</button></Link>
        </div>

    )

}

