import React, { useState } from "react"

export const Registration = (props) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPassword] = useState('')

    const registrationSubmit = (e) => {
        e.preventDefault(e)
        console.log(name)
        console.log(surname)
    }

    return (
        <div className="auth-form-container">
            <h2 className="header-style"> Register</h2>
            <form onSubmit={registrationSubmit} className="register-form">
                <label htmlFor="name"> Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John" id="name" name="name" />
                <label htmlFor="surname"> Your surname</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Marks" id="surname" name="surname" />
                <label htmlFor="email"> Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@mail.com" id="email" name="email" />
                <label htmlFor="password"> Your password</label>
                <input type="password" value={pass} onChange={(e) => setPassword(e.target.value)} placeholder="********" id="password" name="password" />
                <button type="submit"> Register</button>
            </form>
            <button className="link-button" onClick={() => props.onFormSwitch('login')}> Already have an account? Log in here. </button>
        </div>
    )
}