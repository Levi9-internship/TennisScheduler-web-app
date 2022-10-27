import React, { useState, useEffect } from "react";
import Moment from 'moment';
import { useNavigate} from "react-router-dom";

export const TennisPlayerInfo = (props) => {
    const [player, setPlayers] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        setPlayers(props);
      }, []);

    const goToProfile = () => {
        console.log(props)
        navigate("/profile/"+props.id);
    }

    return (
            <tr onClick={goToProfile}>
                <td>{props.firstName} </td>
                <td>{props.lastName} </td>
                <td>{props.email} </td>
                <td>{Moment(props.birthday).format('MMMM Do YYYY.')} </td>
                <td>{props.gender} </td>
            </tr>
    )
};