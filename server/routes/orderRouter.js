const express = require('express');
const router = express.Router();
const {
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}=require("../controllers/orderController")

router.get('/', getAllOrder);
router.post('/', createOrder);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports=router;