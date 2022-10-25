import React, { useState } from "react";
import { useEffect } from "react";
import RolandGarrosCentral from "../assets/RolandGarrosCentral.jpg";
import TennisCourtInfo from "./TennisCourtInfo";
import "../styles/courts.css";

export const TennisCourts = () => {

  const [tennisCourts, setTennisCourts] = useState([]);

  useEffect(() => {
    const getCourts = async () => {
      const courtsFromServer = await fetchCourts();
      setTennisCourts(courtsFromServer);
    }
    getCourts();
  }, []);

  const fetchCourts = async () => {
    const res = await fetch('http://localhost:8081/tennis-courts/');
    const data = await res.json();
    return data;
  }

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
