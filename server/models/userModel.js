//userdata
// {

//     "first_name": "Gary",
    
//     "last_name": "Jia",
    
//     "password": "M@45mtg$",
    
//     "email": "gary@email.com",
    
//     "phone": "0515556666",
    
//     "category": "driver || passenger",
    
//     "balance": 888,
    
//     }

// let userArray=[];
// let nextId=[];

// function getAllUser(){
//     return userArray;
// }

// function addNewUser(userData){
//     const {first_name,last_name,password,email,phone,category,balance}=userData;
//     if(!first_name||!last_name||!password||!email||!phone||!category||!balance){
//         return false
//     }
//     const newUser={
//         userId:nextId++,
//         ...userData,
//     }
//     userArray.push(newUser)
//     return newUser;

// }

// function findUserById(userId){
//     const userid=Number(userId);
//     const user=userArray.find((user)=>user.userId===userid)
//     return user||false
// }

// function updateUserById(userId,updateData){
//     const user=findUserById(userId);
//     if(user){
//         Object.assign(user,updateData);
//         return user
//     }
// }

// function deleteUserById(userId){
//     const user=findUserById(userId);
//     if(user){
//          const initialLength = userArray.length;
//          userArray = userArray.filter((item) => item.userId !== Number(userId));        
//          return userArray.length < initialLength;
//     }
//     return false;
// }

// const User={
//     getAllUser,
//     addNewUser,
//     findUserById,
//     updateUserById,
//     deleteUserById
// };

// module.exports= User;


const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const userSchema=new Schema(
    {   
        
        first_name:{type:String,require:true},
        last_name:{type:String,require:true},
        password: { type: String, required: true },
        email: { type: String, required: true },
        category: { type: String, required: true },
        phone: { type: String },
        balance: { type: String ,default:0},  
    },
    {timestamps:true}
);
module.exports=mongoose.model('User',userSchema);