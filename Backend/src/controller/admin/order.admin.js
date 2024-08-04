const Order = require('../../models/order');

exports.updateOrder = (req, res) => {
  Order.findOneAndUpdate(
    {
      _id: req.body.orderId,
      'orderStatus.type': req.body.type,
    },
    {
      $set: {
        'orderStatus.$.date': new Date(),
        'orderStatus.$.isCompleted': true,
      },
    },
    { new: true } // This option returns the modified document
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) return res.status(201).json({ order });
    return res.status(400).json({ message: 'Order not found' });
  });
};
exports.getCustomerOrders=async(req,res)=> {
  const orders=await Order.find({})
  .populate('items.productId','name')
  .exec()
  res.status(200).json({orders})
}