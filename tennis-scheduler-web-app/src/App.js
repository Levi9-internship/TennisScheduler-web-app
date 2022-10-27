import './App.css';
import React from "react"
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { TennisCourts } from './components/TennisCourts';
import { NavbarStart } from './components/Navbar';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';
import { TennisPlayers } from './components/TennisPlayers';

function App() {
  return (
    <div className="App">
      <NavbarStart />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/" element={<TennisCourts />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />}  />
        <Route path="/profile-info" element={<EditProfile />} />
        <Route path="/players" element={<TennisPlayers />} />
      </Routes>
    </div>
  );
}

export default App;
