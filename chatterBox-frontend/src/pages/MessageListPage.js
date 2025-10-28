import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Channel from "../components/Channels";
import { useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../actions/messageActions";
import { sendMessage } from "../actions/channelActions";

const MessageListPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const messageList = useSelector((state) => state.messageList);
  const { messages } = messageList;

  const [content, setContent] = React.useState("");
  const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };

  const messageSend = useSelector((state) => state.messageSend)
    const {loading, success, error} = messageSend
    console.log(loading, success, error)
    
    const sendMessageHandler = (event) => {
      event.preventDefault();
      dispatch(sendMessage(content, loggedInUser._id, id))
      setContent('');
      window.location.reload();
    };

  useEffect(() => {
    dispatch(listMessages(id));
    }, [dispatch]);

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {/* {messages && messages.length == 0 && (
        <AlertMessage variant="info" message="No messages found" />
      )} */}
      <Container>
        <LinkContainer to={`/channels/public`}>
          <Button variant="link"
                      type="submit"
                      className="mb-3">
                      All public channels
          </Button>
        </LinkContainer>
        <form className="send-form" onSubmit={ sendMessageHandler }>
          {/* Text input for message content, controlled by local state */}
          <input
            className="send-input"
            required
            placeholder="Type a message..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          {/* Submit button to send the message */}
          <button className="send-button" type="submit">
            Send
          </button>
          {/* <LinkContainer to={`/messages/${id}`}> 
            <Button
                type="submit"
                variant="link"
                className="mb-3">
                All Message
            </Button>
          </LinkContainer> */}
        </form>
        <div>
        {messages && messages.length > 0 && (
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
                  <td>{message.sender.username}</td>
                  <td>{new Date(message.createdTs).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </div>
      </Container>
    </>
  );
};

export default MessageListPage;