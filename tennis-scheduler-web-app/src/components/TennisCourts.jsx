import React, { useState, useEffect } from "react";
import {TennisCourtInfo} from "./TennisCourtInfo";
import {getTennisCourts} from "../api/TennisCourtApi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    .catch(() => {
      setErrorTennisCourt("Couldn't load tennis courts.");
      setIsShow(true);
    });
  },[]);
  return (
    <div className="court">
      {isShow ? <h2 className="error-msg">{errorTenniCourt}</h2> : null}
      <Container>
        <Row className="justify-content-md-center">
          <div className="courtList" key="unique">
            {tennisCourts.sort((a, b) => a.id > b.id ? 1 : -1).map((tennisCourt)  => (
              <Col sm={4} key={tennisCourt.id} >
              <div className="courtItemCard" >
                <TennisCourtInfo 
                  id={tennisCourt.id}
                  image={tennisCourt.image}
                  name={tennisCourt.name}
                  workingTime={tennisCourt.workingTimeDto}
                  description={tennisCourt.description}
                  surfaceType={tennisCourt.surfaceType}
                />
                </div>
              </Col>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
}