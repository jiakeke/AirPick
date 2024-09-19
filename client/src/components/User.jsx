const User=({first_name,last_name,email,category,phone})=>{

    return(
    <div>
        <h2>User Info</h2>
        <p>first_name:{first_name}</p>
        <p>last_name:{last_name}</p>
        <p>email:{email}</p>
        <p>category:{category}</p>
        <p>phone:{phone}</p>
    
    </div>
    )
};

export default User;