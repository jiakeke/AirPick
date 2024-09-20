const jwt=require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET ;

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

    jwt.verify(token,JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(403).json({message:'Token is not valid'});
        }
        req.user=decode;
        next();
    })

}

module.exports =authenticateToken;