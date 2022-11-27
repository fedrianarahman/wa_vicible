import "./Navigation2.css";
import React from "react";
import { AuthContext } from "../../App";
// bootstrap
import { Navbar,Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export const Navigation = () => {
    const  {onLogout}  = React.useContext(AuthContext);
    const token = window.localStorage.getItem("token");

    return (
        <>
       <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home2">Logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#features">WA Blaste</Nav.Link>
            <Nav.Link href="#pricing">Set up</Nav.Link>
          </Nav>
          {token && (
                <button type="button" className="btn-custom"  onClick={onLogout}>
                    Sign Out
                </button>
            )}
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
        
        </>
    );
};