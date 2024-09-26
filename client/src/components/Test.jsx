import React, { useState, useEffect } from "react";
import Service from "../services/userService.js"
function Test(){
    const [balance,setBalance]=useState();
    const handleBalance=(e)=>{
        setBalance(e.target.value)
    }

    const handleDeposit=async ()=>{
       const res= await Service.deposit(balance)
       console.log(res)
    }

    const handleWithDrawal=async ()=>{
        // await Service.withDrawal(balance)
    }
    return(
        <div>
            <form>
                <input className="list" type="number" placeholder="balance" name="name" value={balance} onChange={handleBalance}>
                
                </input>
                <button className="button-add" onClick={handleDeposit}>
                deposit
                </button>
                <input className="list" type="number" placeholder="balance" name="name" value={balance} onChange={handleBalance}>

                </input>
                <button className="button-add" onClick={handleWithDrawal}>
                withDrawal
                </button>
            </form>
        </div>
    )

}

export default Test;