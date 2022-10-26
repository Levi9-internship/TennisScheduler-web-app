import React, { useState } from "react";
import { useEffect } from "react";
import TennisCourtInfo from "./TennisCourtInfo";
import RolandGarrosCentral from "../assets/RolandGarrosCentral.jpg";
import {getTennisCourts} from "../api/TennisCourtApi";
import "../styles/courts.css";

export const TennisCourts = () => {

  const [tennisCourts, setTennisCourts] = useState([]);

  useEffect(() => {
    getTennisCourts().then((response) => setTennisCourts(response.data));
  }, []);
  
  return (
    <div className="court">
      <h1 className="courtTitle">Tennis courts</h1>
      <div className="courtList">
        {tennisCourts.map((tennisCourt) => (
          <div className="courtItemBtn" key={tennisCourt.id}>
            <TennisCourtInfo
              id={tennisCourt.id}
              image={RolandGarrosCentral}
              name={tennisCourt.name}
              description={tennisCourt.description}
              surfaceType={tennisCourt.surfaceType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
