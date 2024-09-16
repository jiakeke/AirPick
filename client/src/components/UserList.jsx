import User from "./User";
import { useState } from "react";
import userService from "../services/userService";

const UserList=(userdata)=>{
    const [users,setUsers] =useState([]);

    const getAllUser=()=>{
        setUsers(userService.getAllUsers);
    }
    return(
        <div>
            {users.map((user,index)=>{
                return <User key={index} id={index} {...user}/>
            })

            }

        </div>
    );



}