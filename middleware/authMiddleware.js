const jwt=require('jsonwebtoken');
const User=require('../models/userModel.js');
const asyncHandler=require('express-async-handler');


//uses of protect?
//Validate user input to limit SQL injections and XSS attacks. ...
//Implement strong authentication. ...
//Avoid errors that reveal too much.
const protect=asyncHandler(async(req,res,next)=>
{
    let token;

  

        //What is req headers Authorization?
//The HTTP Authorization request header can be used to provide credentials that 
//authenticate a user agent with a server, allowing access to a protected resource. 
//The Authorization header is usually, but not always, sent 
//after the user agent first attempts to request a protected resource without credentials.
if(
     req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
      
            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
            req.user = await User.findById(decoded.id).select("-password");
      
            next();
        }catch(error){
            res.status(401);
            throw new Error("not authorized,token failed");
        }
    }

    if(!token)
    {
        res.status(401);
        throw new Error("Not authorized,no token");
    }
});



module.exports={protect};