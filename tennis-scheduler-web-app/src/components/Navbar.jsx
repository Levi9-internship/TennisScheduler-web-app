import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import jwtDecode from 'jwt-decode'

export const NavbarStart = () => {

  const getUserRole = () => {
    if (localStorage.getItem("token"))
      return jwtDecode(localStorage.getItem("token")).role;
    else return ""
  }

  useEffect(() => {
    whoAmI()
  }, []);

  const whoAmI = () => {
    if (getUserRole() === 'ROLE_TENNIS_PLAYER')
      setTennisPlayer(true);
    if (getUserRole() === 'ROLE_ADMIN')
      setAdmin(true);
  }

  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);


  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Link className="nav-link-brand" to="/">
          Tennis scheduler{" "}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/registration">
              Register
            </Link>
            {admin ? <span>
            <Link className="nav-link" to="/timeslots">
              Timeslots
            </Link></span> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
