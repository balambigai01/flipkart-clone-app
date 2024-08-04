
const {check,validationResult}=require('express-validator')
exports.validateSignupRequest=[
    check('firstName')
    .notEmpty()
    .withMessage("provide the firstname"),
    check('lastName')
    .notEmpty()
    .withMessage("provide the lastname"),
    check('email')
    .isEmail()
    .withMessage("provide the emailid"),
    check('password')
    .isLength({min:6})
    .withMessage("password should be strong")

]
exports.validateSigninRequest=[
    check('email')
    .isEmail()
    .withMessage("provide the emailid"),
    check('password')
    .isLength({min:6})
    .withMessage("password should be strong")

]
exports.isRequestValidated=(req,resp,next)=>{
    const errors=validationResult(req)
    if(errors.array().length>0){
        return resp.status(400).json({error:errors.array()[0].msg})}
    next()
}