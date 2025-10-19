import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Channel from "../components/Channels";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listChannels, joinChannel, fetchChannelDetails } from "../actions/channelActions";

const ChannelListPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const channelList = useSelector((state) => state.channelList);
  const { loading, error, success, channels } = channelList;

   const channelJoin = useSelector((state) => state.channelJoin);
   const { successJoin, errorJoin } = channelJoin;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(listChannels());
    }, [dispatch]);

  const joinChannelHandler = (id) => {
         dispatch(joinChannel(id, userInfo._id))
       };
  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {!channels && (
        <AlertMessage variant="info" message="No channels found" />
      )}
      <Container>
        <div id="contentheader">
          <h3>Public Channels</h3>
        </div>
        {channels && channels.length > 0 && (
        //   <Row>
        //   {channels.map((channel) => (
        //     <Col key={channel._id} md={6} sm={12} lg={4}>
        //       <Channel channel={channel} />
        //     </Col>
        //   ))}
        // </Row>
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
                    <LinkContainer to={`/channels/${channel._id}/message`}>
                      <Button variant="link" className="mb-2">
                          Send Message
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {!loading && (<LinkContainer to="/channels">
          <Button variant="info" className="my-3">
            Create Channel
          </Button>
        </LinkContainer>)}
      </Container>
    </>
  );
};

export default ChannelListPage;