const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticateToken");
const {
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    acceptOrder,
    cancelOrderByDriver,
    cancelOrderByPassenger,
    startOrder,
    completeOrStopOrder,
}=require("../controllers/orderController")

router.get('/', getAllOrder);
router.post('/', createOrder);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);
router.put('/accept/:orderId', authenticateToken, acceptOrder);
router.put('/cancel/driver/:orderId', authenticateToken, cancelOrderByDriver);
router.put('/cancel/passenger/:orderId', authenticateToken, cancelOrderByPassenger);
router.put('/start/:orderId', authenticateToken, startOrder);
router.put('/completeorstop/:orderId', authenticateToken, completeOrStopOrder);

module.exports=router;