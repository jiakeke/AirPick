const User = require("../models/userModel");
require("dotenv").config();
const encryption = require("../utils/encryption");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ creatdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /api/users/regist/
const userRegist = async (req, res) => {
  const { first_name, last_name, email, password, category } = req.body;
  const existUser = await mongoose.models.User.findOne({ email: email });
  if (existUser) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const hashPassword = await encryption.hashPassword(password);
  try {
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      password: hashPassword,
      email: email,
      category: category,
    });
    res.status(201).json({ user: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to regist user", error: error.message });
  }
};

// GET /api/user/login

const userLogin = async (req, res) => {
  console.log("user logging in");
  const { email, password } = req.body;
  try {
    const user_ = await User.findOne({ email });
    if (!user_) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }

    const isMatch = await encryption.comparePasswords(password, user_.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid  Email or Password" });
    }

    const token = jwt.sign(
      { userId: user_._id, email: user_.email, category: user_.category },
      JWT_SECRET,
      { expiresIn: "1h" }
      // 1s: 1 second, 1m: 1 minute, 1h: 1 hour, 1d: 1 day, 1w: 1 week, 1m: 1 month, 1y: 1 year
    );
    const user = { email: user_.email, category: user_.category, token: token };

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// POST /api/user/deposit

const deposit = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user && user.category === "passenger") {
      let preBalance = user.balance;
      let balance = Number(req.body.balance);
      if (isNaN(balance)) {
        return res.status(400).json({ message: 'Invalid balance value' });
      }
      if (balance < 0) {
        return res.status(400).json({ message: " The recharge amount cannot be less than 0!! " });
      }
      const newBalance = parseFloat((preBalance + balance).toFixed(2));
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { balance: newBalance },
        { new: true, overwrite: true }
      );
      if (updatedUser) {
        res.status(200).json({ message: "Deposit successful!" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to deposit", error: error.message });
  }
};

// POST /api/user/withDrawal

const withDrawal = async (req, res) => {
  console.log("user withDrawal", req.user);
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user && user.category === "driver") {
      let preBalance = await user.balance;

      let balance = Number(req.body.balance)
      if (isNaN(balance)) {
        // Handle the error, e.g., return a response indicating invalid input
        return res.status(400).json({ message: 'Invalid balance value' });
      }
      if (balance < 0) {
        return res.status(400).json({ message: " The withdrawal amount cannot be less than 0!! " });
      }
      if (preBalance < balance) {
        return res.status(400).json({ message: " Withdrawals cannot exceed the balance!! " });
      }

      const newBalance = parseFloat((preBalance - balance).toFixed(2));

      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { balance: newBalance },
        { new: true, overwrite: true }
      );
      if (updatedUser) {
        res.status(200).json({ message: "WithDrawal successfully!" })
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }



  } catch (error) {
    res.status(500).json({ message: "Failed to WithDrawal", error: error.message });
  }
}



// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
};
//GET /users/:userId

const getUser = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

//POST /users/:userId

const updateUser = async (req, res) => {
  const { userId } = req.user;
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
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

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
};

// getBalance /users/balance

const getBalance = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      const balance = user.balance;
      res.status(200).json(balance);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

module.exports = {
  //getAllUsers,
  // createUser,
  getUser,
  updateUser,
  // deleteUser,
  userRegist,
  userLogin,
  deposit,
  withDrawal,
  getBalance,
};

