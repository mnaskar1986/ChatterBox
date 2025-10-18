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
  const { loading, error, channels } = channelList;

   const channelJoin = useSelector((state) => state.channelJoin);
   const { successJoin, errorJoin } = channelJoin;

  //const channelInfo = JSON.parse(sessionStorage.getItem("channelInfo"));

  useEffect(() => {
    dispatch(listChannels());
    }, [dispatch]);

  //   const handleDetails = (id) => {
  //      dispatch(fetchChannelDetails(id));
  //  };

  const joinHandler = (id) => {
       dispatch(joinChannel(id));
   };
  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {channels && channels.length == 0 && (
        <AlertMessage variant="info" message="No channels found" />
      )}
      <Container>
        {!loading && (<LinkContainer to="/channels">
          <Button variant="info" className="my-3">
            Create Channel
          </Button>
        </LinkContainer>)}
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
                  {/* <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td> */}
                  <td>
                    {/* <LinkContainer to={`/admin/user/${user._id}/edit`}> */}
                      {/* <Button variant="info" className="mb-3" onClick={() => window.location.href=`/admin/channel/${channel._id}/edit`}>
                        Edit Channel
                      </Button> */}
                    {/* </LinkContainer> */}
                    <LinkContainer to={`/channels/${channel._id}`}>
                      <Button variant="primary" className="my-3">
                        Details
                      </Button>
                    </LinkContainer>
                    {/* <LinkContainer to="/admin/message/new">
                      <Button variant="info" className="mb-3">
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