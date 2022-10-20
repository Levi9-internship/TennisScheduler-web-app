import './App.css';
import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { StartPage } from './components/StartPage';
import { NavbarStart } from './components/Navbar';
import { HomePage } from './components/HomePage';


function App() {

  return (
    <>
      <div className="App">
        <NavbarStart />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<StartPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
