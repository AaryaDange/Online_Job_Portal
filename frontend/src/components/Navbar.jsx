import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigationbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Check on initial render

    // Listen for login/logout events
    window.addEventListener("login", checkAuth);
    window.addEventListener("logout", checkAuth);

    return () => {
      window.removeEventListener("login", checkAuth);
      window.removeEventListener("logout", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout")); // 👈 Dispatch logout event
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className='navi'>
          <img
            src="https://img.icons8.com/?size=100&id=LrUXL2L7nW5P&format=png&color=FFFFFF"
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-4"
          />
          <span>SmartHire Careers</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ms-auto d-flex align-items-center gap-3">
    <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
    <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
    <Nav.Link as={Link} to="/about">About Us</Nav.Link>
    <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

    {isAuthenticated && (
      <>
        <Nav.Link as={Link} to="/edit-jobs">Edit Jobs</Nav.Link>
        <Nav.Link as={Link} to="/post-job">Post Job</Nav.Link>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </>
    )}

    {!isAuthenticated && (
      <Button variant="outline-light" as={Link} to="/Signin">Login</Button>
    )}
  </Nav>
</Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Navigationbar;
