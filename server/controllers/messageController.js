const Message = require('../models/messageModel');
const Order = require('../models/orderModel');

// Send a message
const sendMessage = async (req, res) => {
  const { receiverId, orderId, content } = req.body;
  const senderId = req.user.userId;

  if (!receiverId || !orderId || !content) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (order.status !== 'new') {
      if (order.passenger !== senderId && order.driver !== senderId) {
        return res.status(403).json({ message: 'You are not authorized to send messages for this order.' });
      }

      if (order.passenger !== receiverId && order.driver !== receiverId) {
        return res.status(403).json({ message: 'Receiver is not part of this order.' });
      }
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      order: orderId,
      content,
      status: 'unread',
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Fetch messages for a specific order
const getMessagesForOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (!order.passengers.includes(userId) && order.driver !== userId) {
      return res.status(403).json({ message: 'You are not authorized to view messages for this order.' });
    }

    const messages = await Message.find({ order: orderId })
      .or([{ sender: userId }, { receiver: userId }])
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .sort('timestamp');

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

// Get unread messages count for a user
const getUnreadMessagesCount = async (req, res) => {
    const userId = req.user.userId;
  
    try {
      const count = await Message.countDocuments({ receiver: userId, rstatus: 'unread' });
      res.status(200).json({ unreadMessagesCount: count });
    } catch (error) {
      console.error('Error fetching unread messages count:', error);
      res.status(500).json({ message: 'Error fetching unread messages count', error });
    }
  };

  // Mark messages as read
const markMessagesAsRead = async (req, res) => {
  const { messageIds } = req.body;
  const userId = req.user.userId;

  if (!messageIds || !Array.isArray(messageIds)) {
    return res.status(400).json({ message: 'Invalid message IDs.' });
  }

  try {
    const result = await Message.updateMany(
      { _id: { $in: messageIds }, receiver: userId, status: 'unread' },
      { $set: { status: 'read' } }
    );

    res.status(200).json({ message: 'Messages marked as read.', result });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Error marking messages as read', error });
  }
};

module.exports = {
  sendMessage,
  getMessagesForOrder,
  getUnreadMessagesCount,
  markMessagesAsRead,
};