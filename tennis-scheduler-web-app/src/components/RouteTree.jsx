import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './Login'
import { Registration } from "./Registration";
import { StartPage  } from "./StartPage";


const RouterTree = () => {
    return (
            <Routes>
                <Route path="/login" element={ <Login />} /> 
                <Route path="/registration" element={ <Registration />} /> 
                <Route path="/" element={ <StartPage />} /> 
            </Routes>
    )
}

export default RouterTree;