// import React, { useEffect } from "react";
// import { Table, Container, Button } from "react-bootstrap";
// import { Row, Col } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
// import AlertMessage from "../components/AlertMessage";
// import { useDispatch, useSelector } from "react-redux";
// import { listMessages } from "../actions/messageActions";

// const MessageListPage = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const messageList = useSelector((state) => state.messageList);
//   const { loading, error, messages } = messageList;

//   useEffect(() => {
//     dispatch(listMessages(id));
//     }, [dispatch]);
//   return (
//     <>
//       {loading && <AlertMessage variant="info" message="Loding..." />}
//       {error && <AlertMessage variant="danger" message={error} />}
//       {messages && messages.length == 0 && (
//         <AlertMessage variant="info" message={"No messages found"} />
//       )}
//       <Container>
//         {messages && messages.length > 0 && (
//           <Table striped hover bordered className="table-sm">
//             <thead>
//               <tr  className="text-center">
//                 <th>Content</th>
//                 <th>Sender</th>
//               </tr>
//             </thead>
//             <tbody>
//               {
//               messages.map((message, index) => (
//                 <tr key={message._id} className="text-center">
//                   <td>{message.content}</td>
//                   <td>{message.sender}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Container>
//     </>
//   );
// };

// export default MessageListPage;

import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Channel from "../components/Channels";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../actions/messageActions";

const MessageListPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, success, messages } = messageList;

  useEffect(() => {
    dispatch(listMessages(id));
    }, [dispatch]);

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {messages && messages.length == 0 && (
        <AlertMessage variant="info" message="No messages found" />
      )}
      <Container>
        <LinkContainer to={`/channels/public`}>
          <Button variant="link"
                      type="submit"
                      className="mb-3">
                      All public channels
          </Button>
        </LinkContainer>
        {messages && messages.length > 0 && (
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
                <th>Messages:</th>
              </tr>
            </thead>
            <tbody>
              {
              messages.map((message, index) => (
                <tr key={message._id} className="text-center">
                  <td>{message.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default MessageListPage;