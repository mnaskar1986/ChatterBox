import React from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import {useDispatch, useSelector} from 'react-redux'
import { createChannel } from "../actions/channelActions";

const CreateChannelPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleChannelNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const dispatch = useDispatch()
  const channelCreate = useSelector((state) => state.channelCreate)
  const {loading, success, error} = channelCreate
  console.log(loading, success, error)
  
  const createHandler = (event) => {
    event.preventDefault();
    dispatch(createChannel(name, description))
  };

  return (
    <>
      <Container>
        {error && <AlertMessage variant="danger" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Channel name"
              value={name}
              onChange={(e) => handleChannelNameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={createHandler}
          >
            Create Channel
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateChannelPage;
