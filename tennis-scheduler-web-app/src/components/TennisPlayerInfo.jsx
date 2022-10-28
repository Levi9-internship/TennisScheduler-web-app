import React, { useState, useEffect } from "react";
import Moment from 'moment';
import { useNavigate } from "react-router-dom";

export const TennisPlayerInfo = (tennisPlayer) => {
    const navigate = useNavigate()

    const goToProfile = () => {
        navigate("/profile/" + tennisPlayer.id);
    }

    return (
        <tr onClick={goToProfile} className="cursor">
            <td>{tennisPlayer.firstName} </td>
            <td>{tennisPlayer.lastName} </td>
            <td>{tennisPlayer.email} </td>
            <td>{tennisPlayer.birthday ? Moment(tennisPlayer.birthday).format('MMMM Do YYYY.') : "/"} </td>
            <td>{tennisPlayer.gender} </td>
        </tr>
    )
};