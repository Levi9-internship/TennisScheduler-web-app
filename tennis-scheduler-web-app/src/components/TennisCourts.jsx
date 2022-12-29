import React, { useState, useEffect } from "react";
import {TennisCourtInfo} from "./TennisCourtInfo";
import {getTennisCourts} from "../api/TennisCourtApi";

import "../styles/courts.css";

export const TennisCourts = () => {
  const [tennisCourts, setTennisCourts] = useState([]);
  const [errorTenniCourt, setErrorTennisCourt] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getAll = () => {
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
      setErrorTennisCourt("");
      setIsShow(false);
    })
    .catch(() => {
      setErrorTennisCourt("Couldn't load tennis courts.");
      setIsShow(true);
    });
  }

  useEffect(() => {
    getTennisCourts().then((data) => {
      setTennisCourts(data.data);
      setErrorTennisCourt("");
      setIsShow(false);
    })
    .catch(() => {
      setErrorTennisCourt("Couldn't load tennis courts.");
      setIsShow(true);
    });
  },[]);

  return (
    <div className="court">
      {isShow ? <h2 className="error-msg">{errorTenniCourt}</h2> : null}
      <div className="courtList" class="row" key="unique">
        {tennisCourts.sort((a, b) => a.id > b.id ? 1 : -1).map((tennisCourt)  => (
          <div className="courtItemCard" class="col-md-4" key={tennisCourt.id}>
            <TennisCourtInfo
              id={tennisCourt.id}
              image={tennisCourt.image}
              name={tennisCourt.name}
              workingTime={tennisCourt.workingTimeDto}
              description={tennisCourt.description}
              surfaceType={tennisCourt.surfaceType}
              refresh={getAll}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
  


