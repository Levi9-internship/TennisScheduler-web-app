import React, { useState } from "react"
import { useEffect } from "react";
import { getTennisCourts } from "../api/TennisCourtApi";

export const TennisCourts = () => {

    const [tennisCourts, setTennisCourts] = useState([]);

    useEffect(() => {
        async function getCourts(){
            getTennisCourts().then((data) => {
                setTennisCourts(data.data);
               console.log(data.data)
            });
        }
        getCourts();
         console.log(tennisCourts);
    }, [])
    return (
        <> </>
    )
}

