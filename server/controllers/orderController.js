const Order = require('../models/orderModel');

// Get all orders
const getAllOrder = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve orders", error });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
};

// Update order by ID
const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to update order", error });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};

// Order status workflow
// Driver accepts order -> status from "new" to "pending"
const acceptOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId;
  const userCategory = req.user.category;

  if (userCategory !== 'driver') {
    return res.status(403).json({ message: 'Invalid user type' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order || order.status !== 'new') {
      return res.status(400).json({ message: 'Order cannot be accepted' });
    }

    order.status = 'pending';
    order.driver = userId;

    await order.save();
    res.json({ message: 'Order accepted', order });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting order', error });
  }
};

// Driver cancel order
const cancelOrderByDriver = async (req, res) => {
  const { orderId } = req.params;
  const userCategory = req.user.category;
  const driverId = req.user.userId;
  if (userCategory !== 'driver') {
    return res.status(403).json({ message: 'Invalid user type' });
  }

  try {
    const order = await Order.findOneAndUpdate(
    { _id: orderId, driver: driverId, status: 'pending' },
    { driver: null, status: 'new' },
    { new: true }
    );

    if (!order) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    res.json({ message: 'Order is now available again', order });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error cancelling order' });
  }
};

// Passenger cancel order
const cancelOrderByPassenger = async (req, res) => {
  const { orderId } = req.params;
  const userCategory = req.user.category;
  const passengerId = req.user.userId;
  if (userCategory !== 'passenger') {
    return res.status(403).json({ message: 'Invalid user type' });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { _id: orderId, passenger: passengerId, status: { $in: ['new', 'pending'] } },
      { driverId: null, status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    if (order.driverId) {
      sendNotificationToDriver(order.driverId, { message: 'Passenger cancelled the order' });
    }

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

// Driver starts order -> status from "pending" to "ongoing"
const startOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId; 
  const userCategory = req.user.category; 

  if (userCategory !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can start orders' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order || order.status !== 'pending' || order.driver.toString() !== userId) {
      return res.status(400).json({ message: 'Order cannot be started' });
    }

    order.status = 'ongoing';
    order.updatedAt = Date.now();

    await order.save();
    res.json({ message: 'Order started', order });
  } catch (error) {
    res.status(500).json({ message: 'Error starting order', error: error.message });
  }
};

// Driver completes or stops order
const completeOrStopOrder = async (req, res) => {
  const { orderId } = req.params;
  const { action } = req.body; // action: 'complete' or 'stop'
  const userId = req.user.userId; 
  const userCategory = req.user.category;  

  if (userCategory !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can complete or stop orders' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order || order.status !== 'ongoing' || order.driver.toString() !== userId) {
      return res.status(400).json({ message: 'Action cannot be performed' });
    }

    if (action === 'complete') {
      order.status = 'completed';
    } else if (action === 'stop') {
      order.status = 'pending';
    }

    order.updatedAt = Date.now();
    await order.save();

    res.json({ message: `Order ${action}d`, order });
  } catch (error) {
    res.status(500).json({ message: `Error ${action}ing order`, error });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  acceptOrder,
  cancelOrderByDriver,
  cancelOrderByPassenger,
  startOrder,
  completeOrStopOrder
};