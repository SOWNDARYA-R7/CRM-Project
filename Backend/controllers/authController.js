const jwt = require("jsonwebtoken");
const login = async(req,res)=>{
    const {email,password} = req.body;
    if(
        email === "sowndaryaramraj@gmail.com" &&
        password === "Sound"
    ){
        const token = jwt.sign(
            {
                email,
                role:"admin"    
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );
        return res.json({success:true,
            token
        });
    }
    return res.status(401).json({success:false})
}
module.exports =  { login };