import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>MOCK API Testing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">User_List1</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/add">Add User</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/list">List2 </Link>&nbsp;&nbsp;&nbsp;
            <Link to="/form1">Form1 </Link>&nbsp;&nbsp;&nbsp;
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;