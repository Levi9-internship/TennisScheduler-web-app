import React, { useState, useEffect } from "react";
import RolandGarrosCentral from "../assets/RolandGarrosCentral.jpg";
import { TennisCourtInfo } from "./TennisCourtInfo";
import "../styles/courts.css";
import { getTennisCourts } from "../api/TennisCourtApi";

export const TennisCourts = () => {
  const [tennisCourts, setTennisCourts] = useState([]);

  useEffect(() => {
    getCourts();
  }, []);

  async function getCourts() {
    getTennisCourts()
      .then((data) => {
        setTennisCourts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="court">
        <h1 className="courtTitle">Tennis courts</h1>
        <div className="courtList">
          {tennisCourts.map((tennisCourt, key) => {
            return (
              <TennisCourtInfo
                key={key}
                image={RolandGarrosCentral}
                name={tennisCourt.name}
                description={tennisCourt.description}
                surfaceType={tennisCourt.surfaceType}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
