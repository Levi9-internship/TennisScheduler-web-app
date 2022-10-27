import React, { useState, useEffect } from "react";
import {TennisCourtInfo} from "./TennisCourtInfo";
import {getTennisCourts} from "../api/TennisCourtApi";
import { Link } from "react-router-dom";

import "../styles/courts.css";

export const TennisCourts = () => {
  const [tennisCourts, setTennisCourts] = useState([]);
  const [errorTenniCourt, setErrorTennisCourt] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
      setErrorTennisCourt("");
      setIsShow(false);
    })
    .catch((error) => {
      setErrorTennisCourt("Couldn't load tennis courts.");
      setIsShow(true);
    });
  },[]);

  return (
    <div className="court">
      {/* <h1 className="courtTitle">Tennis courts</h1> */}
      {isShow ? <h2 className="error-msg">{errorTenniCourt}</h2> : null}
      <div className="courtList">
        {tennisCourts.map((tennisCourt) => (
          <div className="courtItemCard" key={tennisCourt.id}>
            <TennisCourtInfo
              id={tennisCourt.id}
              image={tennisCourt.image}
              name={tennisCourt.name}
              description={tennisCourt.description}
              surfaceType={tennisCourt.surfaceType}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
  


