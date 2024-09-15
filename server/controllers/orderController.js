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

module.exports = {
  getAllOrder,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};