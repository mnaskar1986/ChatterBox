import React, { useEffect } from "react";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelDetails } from "../actions/channelActions";
import Channel from "../components/Channels";

const ChannelDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const channelId = location.state?.channelId;

  const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const channelDetails = useSelector((state) => state.channelDetails);
  const { loading, error, channel } = channelDetails;

   const channelJoin = useSelector((state) => state.channelJoin);
   const { successJoin, errorJoin } = channelJoin;

  useEffect(() => {
    dispatch(fetchChannelDetails(id));
    }, [dispatch]);

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {!channel && (
        <AlertMessage variant="info" message="No channel found" />
      )}
      <h3>Channel Details</h3>
      <LinkContainer to={`/channels/public`}>
        <Button variant="link"
              type="submit"
              className="mb-3">
              All public channels
        </Button>
      </LinkContainer>
      <Container>
        {channel && (
          <Row>
            <Col key={channel._id} md={6} sm={12} lg={4}>
              <Channel channel={channel} />
            </Col>
          </Row>
          // <Table striped hover bordered className="table-sm">
          //   <thead color="blue">
          //     <tr className="text-center">
          //       <th>Name</th>
          //       <th>Description</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //       <tr key={channel._id} className="text-center">
          //         <td>{channel.name}</td>
          //         <td>{channel.description}</td>
          //         <td>
          //           {/* <LinkContainer to={`/channels/${channel._id}/message`}>
          //             <Button variant="link" className="mb-2">
          //                 Send Message
          //             </Button>
          //           </LinkContainer> */}

          //           <LinkContainer to={`/channels/${channel._id}/messages`}>
          //             <Button variant="link" className="mb-2">
          //             {/* onClick={ getMessagesHandler }> */}
          //               Messages
          //             </Button>
          //           </LinkContainer>
          //         </td>
          //       </tr>
          //   </tbody>
          // </Table>
          
        )}
      </Container>
    </>
  );
};

export default ChannelDetailsPage;