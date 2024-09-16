const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    userRegist,
    userLogin,
}=require("../controllers/userControllers")

router.get('/',getAllUsers)

router.post('/',createUser)

router.post('/regist',userRegist)

router.get('/login',userLogin)

router.get('/:userId',getUserById)

router.put('/:userId',updateUser)

router.delete('/:userId',deleteUser)

module.exports=router;

