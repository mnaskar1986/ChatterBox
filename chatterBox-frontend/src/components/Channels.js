import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Channels = ({ channel }) => {
  console.log(channel);
  return (
    <Card className="p-3 my-3 rounded">
      <Card.Body>
        {/* <Link to={`/channels/${channel._id}`}> */}
          <Card.Title as="div">
            Channel Name: <strong>{channel.name}</strong>
          </Card.Title>
        {/* </Link> */}
        Channel Description: <strong>{channel.description}</strong>
      </Card.Body>
    </Card>
  );
};

export default Channels;
