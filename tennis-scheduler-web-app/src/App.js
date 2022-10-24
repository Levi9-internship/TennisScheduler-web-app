import './App.css';
import React from "react"
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { TennisCourts } from './components/TennisCourts';
import { NavbarStart } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';

function App() {

  return (
    <div className="App">
      <NavbarStart />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/" element={<TennisCourts />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
