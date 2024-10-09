const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticateToken");
const {
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAvailableOrders,
    getOrdersByUser,
    updateOrderByPassenger,
    acceptOrder,
    cancelOrderByDriver,
    cancelOrderByPassenger,
    startOrder,
    completeOrStopOrder,
}=require("../controllers/orderController")

// router.get('/', getAllOrder); // Disabled during production, used for development purposes
router.get('/orderlist', authenticateToken, getAvailableOrders);
router.get('/myorder', authenticateToken, getOrdersByUser);
router.post('/', authenticateToken, createOrder);
router.get('/:orderId', authenticateToken, getOrderById);
// router.put('/:orderId', updateOrder); // Disabled during production, used for development purposes
// router.delete('/:orderId', deleteOrder); // Disabled during production, used for development purposes
router.put('/update/:orderId', authenticateToken, updateOrderByPassenger);
router.put('/accept/:orderId', authenticateToken, acceptOrder);
router.put('/cancel/driver/:orderId', authenticateToken, cancelOrderByDriver);
router.put('/cancel/passenger/:orderId', authenticateToken, cancelOrderByPassenger);
router.put('/start/:orderId', authenticateToken, startOrder);
router.put('/completeorstop/:orderId', authenticateToken, completeOrStopOrder);

module.exports=router;