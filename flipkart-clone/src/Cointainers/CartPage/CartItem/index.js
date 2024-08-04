import React, { useState } from 'react'
import { generatePublicUrl } from '../../../urlconfig'
import './style.css'
import PropTypes from 'prop-types';

const CartItem = ({ cartItem, onQuantityInc, onQuantityDec, onRemoveCartItem }) => {
  const { _id, name, price, img, quantity: initialQuantity } = cartItem || {};
  const [quantity, setQty] = useState(initialQuantity || 1);

  const onQuantityIncrement = () => {
    const newQty = quantity + 1;
    setQty(newQty);
    onQuantityInc(_id, newQty);
  };

  const onQuantityDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQty(newQty);
      onQuantityDec(_id, newQty);
    }
  };

  return (
    <div className='cartItemContainer'>
      <div className='flexRow'>
        <div className='cartProImgContainer'>
          <img src={generatePublicUrl(img)} alt={name} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '5px 0' }}>
        <div className='quantityControl'>
          <button onClick={onQuantityDecrement}>-</button>
          <input value={quantity} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className='cartActionBtn'>Save for later</button>
        <button className='cartActionBtn' onClick={() => onRemoveCartItem(_id)}>Remove</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onQuantityInc: PropTypes.func.isRequired,
  onQuantityDec: PropTypes.func.isRequired,
  onRemoveCartItem: PropTypes.func.isRequired,
};

export default CartItem;

