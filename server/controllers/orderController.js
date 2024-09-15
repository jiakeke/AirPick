const Order = require('../models/orderModel');

const getAllOrder=(req,res)=>{
    const allOrder=Order.getAllOrder();
    res.json(allOrder);
}

const createOrder=(req,res)=>{
    const newOrder =Order.addOneOrder({...req.body});
    if(newOrder){
        res.json(newOrder);
    }
    else{
        res.status(500).json({ message: "Failed to create order" });
    }
}

const getOrderById=(req,res)=>{
    const orderId=req.params.orderId;
    const order=Order.findOrderById(orderId);
    if(order){
        res.json(order)
    }else{
        res.status(404).json({message:"Order not found"})
    }
}

const updateOrder=(req,res)=>{
    const orderId=req.params.orderId;
    const updateOrder=Order.updateOrderById(orderId,req.body);
    if(updateOrder){
        res.json(updateOrder)
    }else{
        res.status(404).json({message:"Order not found"})
    }
}

const deleteOrder=(req,res)=>{
    const orderId=req.params.orderId;
    const isDeleted=Order.deleteOrderById(orderId);
    if (isDeleted) {
        res.json({ message: "Order deleted successfully" });
      } else {
        // Handle deletion failure (e.g., car not found)
        res.status(404).json({ message: "Order not found" });
      }
}

module.exports={
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};