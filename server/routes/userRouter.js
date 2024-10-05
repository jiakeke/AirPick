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
    userForgotPassword,
    userResetPassword,
    deposit,
    withDrawal,
    getBalance,
}=require("../controllers/userControllers")

// router.get('/',getAllUsers)

// router.post('/',createUser)

router.post('/regist',userRegist)

router.post('/login',userLogin)

router.post('/forgot_password', userForgotPassword)
router.post('/reset_password/:token', userResetPassword)

router.put('/deposit',authenticateToken,deposit)

router.put('/withDrawal',authenticateToken,withDrawal)
router.get('/balance',authenticateToken,getBalance)

router.get('/',authenticateToken,getUser)

router.put('/',authenticateToken,updateUser)



// router.delete('/',deleteUser)

module.exports=router;

