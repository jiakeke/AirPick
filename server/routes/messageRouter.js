const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticateToken");
const {
    sendMessage, 
    getMessagesForOrder, 
    getUnreadMessagesCount
}=require("../controllers/messageController");

router.post('/send', authenticateToken, sendMessage);
router.get('/order/:orderId', authenticateToken, getMessagesForOrder);
router.get('/unread-count', authenticateToken, getUnreadMessagesCount);

module.exports = router;