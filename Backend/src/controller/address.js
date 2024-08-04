const UserAddress =require('../models/address')

exports.addAddress=(req,res)=>{
    const {payload}=req.body
    if(payload.address){
        if(payload.address._id){
        UserAddress.findOneAndUpdate({user:req.user._id,'address._id':payload.address._id},{
            $set:{
                'address.$':payload.address
            },
        })
        .exec((error,address)=>{
           
            if(address) {
                return res.status(201).json({address})
            }
            if(error) return res.status(400).json({error:'SOMETHING WENT WORNG'})
        })
    }else{
        UserAddress.findOneAndUpdate({user:req.user._id},{
            $push:{
                address:payload.address
            },
        },{new:true,upsert:true})
        .exec((error,address)=>{
           
            if(address) {
                return res.status(201).json({address})
            }
            if(error) return res.status(400).json({error:'SOMETHING WENT WORNG'})
        })
    }
}else{
    res.status(400).json({error:'params address required'})
}

}
exports.getAddress=(req,res)=>{
    UserAddress.findOne({user:req.user._id}).exec((error,UserAddress)=>{
        if(error) return res.status(400).json({error})
        if(UserAddress){
            res.status(200).json({UserAddress})
        }
    })
}