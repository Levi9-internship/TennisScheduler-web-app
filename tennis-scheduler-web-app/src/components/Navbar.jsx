import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';


export const NavbarStart = () => {
  const [tennisPlayer, setTennisPlayer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    whoAmI()
  }, []);

  const logout = () => {
    localStorage.clear();
    navigation('');
    window.location.reload();
  }

  const whoAmI = () => {
    if (getUserRole() === 'ROLE_TENNIS_PLAYER')
      setTennisPlayer(true);
    if (getUserRole() === 'ROLE_ADMIN')
      setAdmin(true);
  }

const getUserRole = () => {
  if(localStorage.getItem("token"))
   return jwtDecode(localStorage.getItem("token")).role;
   else return ""
}

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Link className="nav-link-brand" to="/">
          Tennis scheduler{" "}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(() => {
            if (!admin && !tennisPlayer) {
              return (
                <Nav className="me-auto">
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/registration">Register</Link>
                </Nav>
              )
            } else {
              return (
                <>
                  <Nav className="me-auto">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </Nav>
                  <button className="logout-button" onClick={logout}>Log out</button>
                </>
              )
            }
          })()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
