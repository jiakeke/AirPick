const User=({first_name,last_name,password,email,category,phone,balance})=>{

    return(
    <div>
        <h2>User Info</h2>
        <p>username</p>
        <p>first_name:{first_name}</p>
        <p>last_name:{last_name}</p>
        <p>password:{password}</p>
        <p>email:{email}</p>
        <p>category:{category}</p>
        <p>phone:{phone}</p>
        <p>balance:{balance}</p>
    
    </div>
    )
};

export default User;