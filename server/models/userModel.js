/* User Data
{
    "first_name": "Gary",
    "last_name": "Jia",
    "password": "M@45mtg$",
    "email": "gary@email.com",
    "phone": "0515556666",
    "category": "driver || passenger",
    "balance": 888,
}
*/

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {   
        first_name: {
            type:String,
            require:true
        },

        last_name: {
            type:String,
            require:true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        balance: {
            type: String,
            default:0
        },  
    },
    {timestamps:true}
);
module.exports=mongoose.model('User',userSchema);
