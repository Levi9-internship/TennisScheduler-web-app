import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link} from 'react-router-dom'

export const NavbarStart = () => {
    return (
        <Navbar bg="light" expand="lg" fixed='top'>
        <Container>
          <Navbar.Brand href="/">Tennis scheduler </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/registration">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}