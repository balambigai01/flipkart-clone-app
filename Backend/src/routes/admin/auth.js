const express=require('express');
const {isRequestValidated} =require('../../validator/auth')
const { validateSigninRequest,validateSignupRequest } =require('../../validator/auth') 
const { signup, signin, signout} = require('../../controller/admin/auth');
const {requireSignin} =require('../../common-middleware/index');

const router=express.Router()

router.post("/admin/signup",validateSignupRequest,isRequestValidated,signup)
router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/admin/signout',signout)
module.exports=router;
