const User=require('../models/user')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')

const shortid=require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+' -'+ file.originalname )
    }
  })
exports.upload=multer({storage})
  

exports.requireSignin=((req,resp,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,process.env.JWT_SECRET)
        req.user=user 
    }
    else{
        return resp.status(400).json({message:"Authorization required"})
    }
    
    next()
}

)
exports.userMiddleware=(req,resp,next)=>{
    if(req.user.role!=='user'){
        return resp.status(400).json({message:' User Access denied'})
     }
     next()
}
exports.adminMiddleware = (req, res, next) => {
    // Logging to check the presence of req.user and req.user.role
    console.log('req.user:', req.user);
    
    if (!req.user) {
        return res.status(400).json({ message: 'User not authenticated' });
    }

    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Admin Access denied' });
    }

    next();
};
