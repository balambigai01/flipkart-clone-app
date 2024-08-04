const express=require('express');
const { signup, signin, requireSignin } = require('../controller/auth');
const { validateSignupRequest,validateSigninRequest} = require('../validator/auth');
const {isRequestValidated} =require('../validator/auth')

const router=express.Router()

router.post("/signup",validateSignupRequest,isRequestValidated,signup)
router.post("/signin",validateSigninRequest,isRequestValidated,signin)
{/*{router.post("/profile",requireSignin ,(req,resp) =>{
    resp.status(200).json({user:"profile"})
})}*/}
module.exports=router;
