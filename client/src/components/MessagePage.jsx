import { useState, useEffect, useRef } from 'react';
import { useMessage } from '../context/MessageContext.jsx';
import useAxios from '../axios';
import './MessagePage.css';

export default function MessagePage() {
  const { updateUnreadCount } = useMessage();
  const [messagesByOrder, setMessagesByOrder] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [newMessage, setNewMessage] = useState({});
  const api = useAxios();
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);

  // Get all messages when the component is mounted
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/api/messages');
        const groupedMessages = groupMessagesByOrder(response.data);
        setMessagesByOrder(groupedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, []);

  // Sort messages by order ID
  const groupMessagesByOrder = (messages) => {
    return messages.reduce((group, message) => {
      const orderId = message.order._id;
      if (!group[orderId]) {
        group[orderId] = [];
      }
      group[orderId].push(message);
      return group;
    }, {});
  };

  // Mark messages as read
  const markMessagesAsRead = async (messageIds) => {
    try {
      await api.post(`/api/messages/mark-read`, { messageIds });
      updateUnreadCount(); // 更新未读消息计数
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  // Open or close message box, and mark unread messages as read
  const toggleExpand = async (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    if (expandedOrderId !== orderId) {
      const unreadMessageIds = messagesByOrder[orderId]
        .filter((message) => message.status === 'unread')
        .map((message) => message._id);
      if (unreadMessageIds.length > 0) {
        await markMessagesAsRead(unreadMessageIds);
      }
    }
  };

  // New message input change handler
  const handleInputChange = (orderId, value) => {
    setNewMessage((prevState) => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  // Send a new message
  const sendMessage = async (orderId) => {
    let receiverId;
    console.log(user.category);
    if (user.category === 'driver') {
      receiverId = messagesByOrder[orderId][0].receiver._id;
    };
    if (user.category === 'passenger') {
      receiverId = messagesByOrder[orderId][0].sender._id;
    };

    try {
      await api.post('/api/messages/send', {
        receiverId,
        orderId,
        content: newMessage[orderId],
      });
      setNewMessage((prevState) => ({
        ...prevState,
        [orderId]: '', // Clear the input field
      }));
      // Refetch messages after sending a new message
      const response = await api.get('/api/messages');
      const groupedMessages = groupMessagesByOrder(response.data);
      setMessagesByOrder(groupedMessages);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Scroll to the bottom of the message box
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messagesByOrder, expandedOrderId]);

  return (
    <div className="message-page">
      {Object.keys(messagesByOrder).map((orderId) => (
        <div key={orderId} className="order-message">
          <button onClick={() => toggleExpand(orderId)} className="order-title-btn">
            Order: {orderId}
          </button>

          {expandedOrderId === orderId && (
            <div className="message-box">
              <div className="messages-container">
                {messagesByOrder[orderId].map((message) => (
                  <div
                    key={message._id}
                    className={message.sender._id === user.userId ? 'message-self' : 'message-other'}
                  >
                    <p>{message.content}</p>
                    <small>{new Date(message.createdAt).toLocaleString()}</small>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="message-input-container">
                <input
                  type="text"
                  value={newMessage[orderId] || ''}
                  onChange={(e) => handleInputChange(orderId, e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button onClick={() => sendMessage(orderId)} className="send-btn">
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}