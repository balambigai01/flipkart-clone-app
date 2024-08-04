const { requireSignin, userMiddleware } = require('../common-middleware')
const { addOrder, getOrder, getOrders } = require('../controller/order')

const router=require('express').Router()
router.post('/addorder',requireSignin,userMiddleware,addOrder)
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post('/getOrder',requireSignin,userMiddleware,getOrder)

module.exports = router