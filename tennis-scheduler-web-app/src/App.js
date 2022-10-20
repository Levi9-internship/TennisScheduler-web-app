import './App.css';
import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import RouterTree from './components/RouteTree';


function App() {
  
  return (
    <div className="App">
     <RouterTree />
   </div>
  );
}

export default App;
