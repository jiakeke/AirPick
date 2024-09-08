const User=require("../models/userModel")

const getAllUser=(req,res)=>{
    const allUser=User.getAllUser();
    res.json(allUser);
}

const createUser=(req,res)=>{
    const newUser =User.addNewUser({...req.body});
    if(newUser){
        res.json(newUser);
    }
    else{
        res.status(500).json({ message: "Failed to create user" });
    }
}

const getUserById=(req,res)=>{
    const userId=req.params.userId;
    const user=User.findUserById(userId);
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message:"user not found"})
    }
}

const updateUser=(req,res)=>{
    const userId=req.params.userId;
    const updateUser=User.updateUserById(userId,req.body);
    if(updateUser){
        res.json(updateUser)
    }else{
        res.status(404).json({message:"user not found"})
    }
}

const deleteUser=(req,res)=>{
    const userId=req.params.userId;
    const isDeleted=User.deleteUserById(userId);
    if (isDeleted) {
        res.json({ message: "user deleted successfully" });
      } else {
        // Handle deletion failure (e.g., car not found)
        res.status(404).json({ message: "user not found" });
      }
}

module.exports={
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};