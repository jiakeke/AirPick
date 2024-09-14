const User=require("../models/userModel")
const mongoose = require("mongoose");
// GET /users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ creatdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
};


//regist 
// const userReg=()=>{
//     todo: createuser
// }

//login



// POST /users
const createUser = async (req, res) => {

    try {
        const newUser = await User.create({ ...req.body })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: "Failed to create user", error: error.message });
    }
}
//GET /users/:userId

const getUserById = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user" });
    }

}

//POST /users/:userId

const updateUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { ...req.body },
            { new: true, overwrite: true }
        );
        if (updatedUser) {
            res.status(200).json(updatedUser)
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update user" });
    }
}


//DELETE /users/:userId

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: userId });
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
}
module.exports={
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};