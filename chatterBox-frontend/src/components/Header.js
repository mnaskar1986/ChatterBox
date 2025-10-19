//import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const loggedInUser = useSelector((state) => state.login.userInfo);

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
            {/* {loggedInUser && (<LinkContainer to="/messages">
                <Nav.Link>
                  <i className="bi bi-envelope"> Messages</i>
                </Nav.Link>
              </LinkContainer>)} */}

              {/* {loggedInUser && (
                <LinkContainer to="/orders">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Orders</i>
                  </Nav.Link>
                </LinkContainer>
              )} */}

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

              {/* {loggedInUser && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/categories">
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
