import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelDetails, getMessages, sendMessage } from '../../services/api';

const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelRes, messagesRes] = await Promise.all([
          getChannelDetails(id),
          getMessages(id),
        ]);
        setChannel(channelRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error('Error fetching channel/messages:', error);
      }
    };
    fetchData();

    // Simulate real-time messaging with polling
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const response = await sendMessage(id, { content: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!channel) return <div>Loading...</div>;

  return (
    <div>
      <h2>{channel.name}</h2>
      <p>{channel.description || 'No description'}</p>
      <div className="border p-3" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.sender.username}: </strong>
            {msg.content} <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="mt-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Channel;