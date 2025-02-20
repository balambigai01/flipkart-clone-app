const User=require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
const shortid = require('shortid')

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };
exports.signup=(req,resp)=>{
    User.findOne({email:req.body.email})
    .exec(async(error,user)=>{
        if(user) return resp.status(400).json({
            message:"user is already registered"
        })
   
    const {firstName,lastName,email,password} = req.body;
    const hash_password=await bcrypt.hash(password,10)
    const _user=new User({firstName,lastName,email,hash_password,userName:shortid.generate()})
    _user.save((error,user)=>{
        if(error){
            return resp.status(400).json({
                message:"something went wrong"
            })
        }
        if(user){
            const token = generateJwtToken(user._id, user.role);
            const { _id, firstName, lastName, email, role, fullName } = user;
            return resp.status(201).json({
              token,
              user: { _id, firstName, lastName, email, role, fullName },
            });
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
        if(isPassword && user.role==='user'){
            //const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
            const token=generateJwtToken(user._id,user.role)
            const {_id,firstName,lastName,email,role,fullname}=user
           
            resp.status(200).json({
                token,
                user:{
                    _id,firstName,lastName,email,role,fullname
                }
            })
        }
        else{
            return resp.status(400).json({message:"Something Went Wrong"})
        }
    }
    else{
        return resp.status(400).json({message:"something went wrong"})
    }
  })
}

