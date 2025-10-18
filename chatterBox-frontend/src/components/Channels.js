import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Channels = ({ channel }) => {
  console.log(channel);
  return (
    <Card className="p-3 my-3 rounded">
      <Card.Body>
        <Link to={`/channels/${channel._id}`}>
          <Card.Title as="div">
            <strong>{channel.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">{channel.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Channels;
