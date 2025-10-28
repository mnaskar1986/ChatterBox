import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Channel from "../components/Channels";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listChannels, joinChannel, fetchChannelDetails } from "../actions/channelActions";
import '../styles/Components.css';  // Styles specific to channel components
import { createChannel } from "../actions/channelActions";

const ChannelListPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const channelList = useSelector((state) => state.channelList);
  const { channels } = channelList;

   const channelJoin = useSelector((state) => state.channelJoin);
   const { successJoin, errorJoin } = channelJoin;

   const [name, setName] = React.useState("");
     const [description, setDescription] = React.useState("");
   
    //  const handleChannelNameChange = (e) => {
    //    setName(e.target.value);
    //  };
   
    //  const handleDescriptionChange = (e) => {
    //    setDescription(e.target.value);
    //  };

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const channelCreate = useSelector((state) => state.channelCreate)
  const {loading, success, error} = channelCreate;

  useEffect(() => {
    dispatch(listChannels());
    }, [dispatch]);

  const joinChannelHandler = (id) => {
       dispatch(joinChannel(id, userInfo._id))
    };
  const createHandler = (event) => {
      event.preventDefault();
      dispatch(createChannel(name, description, userInfo._id))
      window.location.reload();
   };
  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="info" message={error} />}
      {!channels && (
        <AlertMessage variant="info" message="No channels found" />
      )}
      <Container>
        <div id="channel-header">
          <h3>Public Channels</h3>
        </div>
        {/* Form to create a new channel */}
      <form className="channel-form" onSubmit={createHandler}>
        {/* Input for channel name (required) */}
        <input
          className="channel-form-input"
          required
          placeholder="Channel name"
          value={name}
          onChange={e => setName(e.target.value)} // Update name state on input change
        />
        {/* Input for channel description (optional) */}
        <input
          className="channel-form-input"
          required
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)} // Update description state on input change
        />
        {/* Submit button to create the channel */}
        <button className="channel-button" type="submit">
          Create
        </button>
      </form>
        {channels && channels.length > 0 && (
          <Table striped hover bordered className="table-sm">
            <thead>
              <tr  className="text-center">
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
              channels.map((channel, index) => (
                <tr key={channel._id} className="text-center">
                  <td>{channel.name}</td>
                  <td>{channel.description}</td>
                  <td>
                    <LinkContainer to={`/channels/${channel._id}`}>
                      <Button variant="link" className="mb-2">
                        Channel Details
                      </Button>
                    </LinkContainer>
                     <LinkContainer to={`/messages/${channel._id}`}> 
                      <Button variant="link" className="mb-2"
                          onClick={ () => joinChannelHandler(`${channel._id}`)}>
                          Join Channel
                      </Button>
                    </LinkContainer>
                    {/* <LinkContainer to={`/channels/${channel._id}/message`}>
                      <Button variant="link" className="mb-2">
                          Send Message
                      </Button>
                    </LinkContainer> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ChannelListPage;