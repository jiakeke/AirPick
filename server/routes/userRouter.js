const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticateToken");
const {
    // getAllUsers,
    // createUser,
    getUser,
    updateUser,
    // deleteUser,
    userRegist,
    userLogin,
}=require("../controllers/userControllers")

// router.get('/',getAllUsers)

// router.post('/',createUser)

router.post('/regist',userRegist)

router.get('/login',userLogin)

router.get('/',authenticateToken,getUser)

router.put('/',authenticateToken,updateUser)

// router.delete('/',deleteUser)

module.exports=router;

