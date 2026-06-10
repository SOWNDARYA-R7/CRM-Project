const jwt = require("jsonwebtoken");
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"Token Missing"
        });
    }
    const token = authHeader.split(" ")[1];
    
    
    try{
        const decoded =jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    req.user = decoded;
    next();

}
catch(err){
    if(error.name === 'TokenExpiredError'){
        return res.status(401).json({
        success: false,
        message:"Session Expired"
    })
    }
    return res.status(401).json({
        success: false,
        message:"Invalid token"
    })
}
}
module.exports = verifyToken;