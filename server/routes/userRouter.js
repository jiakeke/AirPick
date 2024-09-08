const express = require('express');
const router = express.Router();
const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}=require("../controllers/userControllers")

router.get('/',getAllUser)

router.post('/',createUser)

router.get('/:userId',getUserById)

router.put('/:userId',updateUser)

router.delete('/:userId',deleteUser)

module.exports=router;

