const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const shortid = require('shortid')
exports.signup=(req,resp)=>{
    User.findOne({email:req.body.email})
    .exec(async(error,user)=>{
        if(user) return resp.status(400).json({
            message:"admin is already registered"
        })
   
    const {firstName,lastName,email,password} = req.body;
    const hash_password=await bcrypt.hash(password,10)


    const _user=new User({firstName,lastName,email,hash_password,userName:shortid.generate(),role:'admin'})
    _user.save((error,data)=>{
        if(error){
            return resp.status(400).json({
                message:"something went wrong"
            })
        }
        if(data){
            return resp.status(201).json({
                message:"admin created successfully"
            })
        }
    })
})
}
exports.signin=(req,resp)=>{
  User.findOne({email:req.body.email})
  .exec(async(error,user)=>{
    if(error) return resp.status(400).json({error})
    if(user){
       const isPassword= await user.authenticate(req.body.password)
        if( isPassword && user.role==='admin'){
            const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
            const {_id,firstName,lastName,email,role,fullname}=user
            resp.cookie('token',token,{expiresIn:'1d'})
            resp.status(200).json({
                token,
                user:{
                    _id,firstName,lastName,email,role,fullname
                }
            })
        }
        else{
            return resp.status(400).json({message:"invalid password"})
        }
    }
    else{
        return resp.status(400).json({message:"something went wrong"})
    }
  })
}
exports.signout=(req,resp)=>{
    resp.clearCookie('token')
    resp.status(200).json({
       message:'signout successfully...!'
    }) 
}