import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelDetails, joinChannel } from "../actions/channelActions";

const ChannelDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const channelId = location.state?.channelId;

  const channelDetails = useSelector((state) => state.channelDetails);
  const { loading, error, channel } = channelDetails;

   const channelJoin = useSelector((state) => state.channelJoin);
   const { successJoin, errorJoin } = channelJoin;

  //const channelInfo = JSON.parse(sessionStorage.getItem("channelInfo"));

  useEffect(() => {
    dispatch(fetchChannelDetails(id));
    }, [dispatch]);

  const joinHandler = (id) => {
       dispatch(joinChannel(id));
   };

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {!channel && (
        <AlertMessage variant="info" message="No channel found" />
      )}
      <Container>
        {channel && (
          <Table striped hover bordered className="table-sm">
            <thead color="blue">
              <tr className="text-center">
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
                <tr key={channel._id} className="text-center">
                  <td>{channel.name}</td>
                  <td>{channel.description}</td>
                  <td>
                    <LinkContainer to={`/channels/${channel._id}/message`}>
                      <Button variant="" className="mb-2">
                          Send Message
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/admin/message/new">
                      <Button variant="" className="mb-2">
                          Join Channel
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ChannelDetailsPage;