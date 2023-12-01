// MessageSeller.jsx
import React, { useEffect, useState } from 'react';
import './MessageSeller.css';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:3001'); // Update with your server URL

function MessageSeller() {
  const [conversations, setConversations] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch conversations when the component mounts
    fetchConversations();

    // Listen for incoming messages
    socket.on('message', handleIncomingMessage);

    return () => {
      // Cleanup socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      // Replace this with your API endpoint or server route to fetch conversations
      const response = await fetch('/messages/conversations');
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const openConversation = (conversationId) => {
    setActiveConversation(conversationId);
    const conversationContainer = document.getElementById('conversation');
    conversationContainer.innerHTML = '';
    const conversation = conversations[conversationId];
    if (conversation) {
      conversation.forEach((message) => {
        renderMessage(message);
      });
    }
  };

  const renderMessage = (message) => {
    const conversationContainer = document.getElementById('conversation');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${message.sender}: ${message.text}`;
    conversationContainer.appendChild(messageDiv);
  };

  const sendMessage = () => {
    if (activeConversation && newMessage.trim() !== '') {
      // Emit the message to the server
      socket.emit('message', {
        recipientId: activeConversation,
        text: newMessage,
      });

      // Clear the input field
      setNewMessage('');
    }
  };

  const handleIncomingMessage = (message) => {
    // Handle incoming messages from the server
    if (message.sender !== 'SYSTEM') {
      if (!conversations[message.sender]) {
        // Add a new conversation if it doesn't exist
        setConversations((prevConversations) => ({
          ...prevConversations,
          [message.sender]: [],
        }));
      }
      setConversations((prevConversations) => ({
        ...prevConversations,
        [message.sender]: [...prevConversations[message.sender], message],
      }));
      if (activeConversation === message.sender) {
        renderMessage(message);
      }
    }
  };

  return (
    <div>
      <header>
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
        <span className="tagline">...bid the BITS way</span>
      </header>

      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/bid">Bid</Link></li>
          <li><Link to="/your-bids">Your BIDS</Link></li>
          <li id="message"><Link to="/message-seller">Message Seller</Link></li>
          <li><Link to="/wallet">Wallet</Link></li>
          <li><Link to="/profile-bid">Profile</Link></li>
          <li><Link to="/inventory">Sell</Link></li>
        </ul>
      </nav>

      <div className="container">
        <div className="chat-section">
          <div className="chat-list" id="chatList">
            <ul>
              {Object.keys(conversations).map((conversationId) => (
                <li
                  key={conversationId}
                  className={activeConversation === conversationId ? 'active' : ''}
                  onClick={() => openConversation(conversationId)}
                >
                  {conversationId}
                </li>
              ))}
            </ul>
          </div>
          <div className="conversation">
            <div className="msg-header">
              <div className="container1">
                <div className="active">
                  <p>User name</p>
                </div>
              </div>
            </div>
            <div className="chat-page">
              <div className="msg-inbox">
                <div className="chats">
                  <div className="msg-page">
                    <div id="conversation"></div>
                  </div>
                </div>
              </div>
              <div className="msg-bottom">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <span className="input-group-text send-icon" onClick={sendMessage}>
                    <i className="bi bi-send"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSeller;
