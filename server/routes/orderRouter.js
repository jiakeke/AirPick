const express = require('express');
const router = express.Router();
const {
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}=require("../controllers/orderController")

router.get('/',getAllOrder)

router.post('/',createOrder)

router.get('/:userId',getOrderById)

router.put('/:userId',updateOrder)

router.delete('/:userId',deleteOrder)

module.exports=router;