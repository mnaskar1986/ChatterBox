//import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const loggedInUser = useSelector((state) => state.login.userInfo);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const dispatch = useDispatch();

  const handleSignOut = (event) => {
    console.log("Inside signOut Function")
    event.preventDefault();
    dispatch(logout());
  };
  console.log(loggedInUser);
  return (
    <header>
      <Navbar
        bg="primary"
        navbar="light"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ChatterBox-A Team Communication Platform</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {loggedInUser && (
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Profile</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && (
                <LinkContainer to="/admin/users">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Users</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && (
                <LinkContainer to="/channels/public">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Channels</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {!loggedInUser && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Log In</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {!loggedInUser && (
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Sign up</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && (
                <LinkContainer to="/" onClick={handleSignOut}>
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Sign Out</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {loggedInUser && (
                  <p class="text-white"><i class="bi bi-hand-wave"> Welcome {userInfo.username}</i></p>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
