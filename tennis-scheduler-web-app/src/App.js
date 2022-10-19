import './App.css';
import React, { useState } from "react"

import { Login } from './components/Login';
import { Registration } from './components/Registration';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Registration onFormSwitch={toggleForm} />}

    </div>
  );
}

export default App;
