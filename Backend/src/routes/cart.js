const express = require('express');

const { requireSignin, userMiddleware } = require('../common-middleware/index');
const { addItemToCart, getCartItems, removeCartItems } = require('../controller/cart');
const router = express.Router()


router.post("/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart)

router.post("/user/getCartItems",requireSignin,userMiddleware,getCartItems)
router.post('/user/cart/remveItem',requireSignin,userMiddleware,removeCartItems)
module.exports = router;