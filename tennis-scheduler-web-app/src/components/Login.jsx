import React, { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'   

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [pass, setPassword] = useState('')

    const loginSubmit = (e) => {
        e.preventDefault(e)
        console.log(email)
        console.log(pass)
    }

    return (
        
            <div className="auth-form-container">
                <h2 className="header-style"> Login</h2>
                <form onSubmit={loginSubmit} className="login-form">
                    <label htmlFor="email"> Your email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@mail.com" id="email" name="email" />
                    <label htmlFor="password"> Your password</label>
                    <input type="password" value={pass} onChange={(e) => setPassword(e.target.value)} placeholder="********" id="password" name="password" />
                    <button type="submit"> Log in</button>
                </form>
               <Link to="/registration" > <button className="link-button">  Don't have an account? Register here.</button></Link> 
            </div>
   
    )

}

