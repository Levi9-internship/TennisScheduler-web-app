import React, { useState, useEffect } from "react";
import RolandGarrosCentral from "../assets/RolandGarrosCentral.jpg";
import { TennisCourtInfo } from "./TennisCourtInfo";
import "../styles/courts.css";
import { getTennisCourts } from "../api/TennisCourtApi";

export const TennisCourts = () => {
  const [tennisCourts, setTennisCourts] = useState([]);
  const [errorTenniCourt, setErrorTennisCourt] = useState("");
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    getCourts();
  }, []);

  async function getCourts() {
    getTennisCourts()
      .then((data) => {
        setTennisCourts(data.data);
        setErrorTennisCourt("");
        setIsShow(false);
      })
      .catch((error) => {
        setErrorTennisCourt("Couldn't load tennis courts.");
        console.log(error);
        setIsShow(true);
      });
  }

  return (
    <div className="court">
      <h1 className="courtTitle">Tennis courts</h1>
      {isShow ? <h2 className="error-msg">{errorTenniCourt}</h2> : null}
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
  );
};
