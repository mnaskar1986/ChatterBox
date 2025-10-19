import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";

const Channels = ({ channel }) => {
  console.log(channel);
  return (
    <Card className="p-3 my-3 rounded">
      <Card.Body>
        {/* <Link to={`/channels/${channel._id}`}> */}
          <Card.Title as="div">
            <strong>Channel Name:</strong>{channel.name}
          </Card.Title>
        {/* </Link> */}
        <strong>Channel Description:</strong>{channel.description}
        <strong>Members:</strong>
        {!channel.members && (
                <div><strong>No member in channel.</strong></div>
              )}
          {channel.members && channel.members.map((member) => (
              <li key={member._id}>
                <strong>Name:</strong>{ member.username }
                {/* Email: { member.email } */}
              </li>
            ))}
      </Card.Body>
    </Card>
  );
};

export default Channels;
