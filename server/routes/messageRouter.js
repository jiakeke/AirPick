const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticateToken");
const {
    sendMessage, 
    getUnreadMessagesCount,
    markMessagesAsRead,
    getUserMessages
}=require("../controllers/messageController");

router.post('/send', authenticateToken, sendMessage);
router.get('', authenticateToken, getUserMessages);
router.get('/unread-count', authenticateToken, getUnreadMessagesCount);
router.post('/mark-read', authenticateToken, markMessagesAsRead);

module.exports = router;