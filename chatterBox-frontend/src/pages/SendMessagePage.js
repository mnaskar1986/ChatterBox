import React from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import {useDispatch, useSelector} from 'react-redux'
import { sendMessage } from "../actions/channelActions";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const SendMessagePage = () => {
  const [content, setContent] = React.useState("");

  const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const messageSend = useSelector((state) => state.messageSend)
  const {loading, success, error} = messageSend
  console.log(loading, success, error)
  
  const sendMessageHandler = () => {
    dispatch(sendMessage(content, loggedInUser._id, id))
  };

  return (
    <>
      <Container>
        {error && <AlertMessage variant="danger" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
        <Form>
          <Form.Group controlId="content" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type message"
              value={content}
              onChange={(e) => handleContentChange(e)}
            />
          </Form.Group>
          <LinkContainer to={`/messages/${id}`}> 
            <Button
                type="submit"
                variant="primary"
                className="mb-3"
                onClick={sendMessageHandler}>
                Send Message
            </Button>
          </LinkContainer>
        </Form>
      </Container>
    </>
  );
};

export default SendMessagePage;