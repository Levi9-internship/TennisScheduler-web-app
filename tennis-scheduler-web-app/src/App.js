import './App.css';
import React from "react"
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { TennisCourts } from './components/TennisCourts';
import { NavbarStart } from './components/Navbar';

function App() {

  return (
    <div className="App">
      <NavbarStart />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<TennisCourts />} />
      </Routes>
    </div>
  );
}

export default App;
