import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { TennisCourts } from "./components/TennisCourts";
import { NavbarStart } from "./components/Navbar";
import { TennisCourtAddChange } from "./components/TennisCourtAddChange";
import { TennisPlayers } from './components/TennisPlayers';
import Timeslots from "./pages/Timeslots";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <NavbarStart />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/timeslots" element={<Timeslots />} />
        <Route path="/" element={<TennisCourts />} />
        <Route path="/tennis-court" element={<TennisCourtAddChange />} />
        <Route path="/tennis-court/:id" element={<TennisCourtAddChange />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile-info" element={<EditProfile />} />
        <Route path="/players" element={<TennisPlayers />} />
      </Routes>
    </div>
  );
}

export default App;
