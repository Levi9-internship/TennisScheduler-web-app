import React, { useState } from "react";
import { useEffect } from "react";
import RolandGarrosCentral from "../assets/RolandGarrosCentral.jpg";
import TennisCourtInfo from "./TennisCourtInfo";
import "../styles/courts.css";
import { getTennisCourts } from "../api/TennisCourtApi";
import AddTimeslot from "./AddTimeslot";


export const TennisCourts = () => {
  const [tennisCourts, setTennisCourts] = useState([]);

  useEffect(() => {
    async function getCourts() {
      getTennisCourts().then((data) => {
        setTennisCourts(data.data);
        console.log(data.data);
      });
    }
    getCourts();
  }, []);
  return (
    <>
      <div className="court">
        <h1 className="courtTitle">Tennis courts</h1>
        <div className="courtList">
          {tennisCourts.map((tennisCourt) => (
              <div className="courtItemBtn" key={tennisCourt.id}>
              <TennisCourtInfo
                image={RolandGarrosCentral}
                name={tennisCourt.name}
                description={tennisCourt.description}
                surfaceType={tennisCourt.surfaceType}
              />
              <AddTimeslot/>
              </div>
          )
          )}
        </div>
      </div>
    </>
  );
};
