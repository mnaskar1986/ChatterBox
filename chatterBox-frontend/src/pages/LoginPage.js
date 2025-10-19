import React, { useEffect } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = useSelector((state) => state.login);
  const { loading, success, error, userInfo } = userLogin;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  });

  return (
    <>
      {loading && <Spinner animation="grow" />}
      {error && <AlertMessage variant="danger" message={error} />}
      {success && <AlertMessage variant="success" message={success} />}
      <FormGroup className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="txt"
          id="username"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <LinkContainer to={`/channels/public`}>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
      >
        Login
      </Button>
      </LinkContainer>

      <Row>
        <Col>
          New user? <Link to="/register">Sign Up</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
