import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { generatePublicUrl } from "../../urlconfig";
import './style.css';
import { Breed } from "../../Components/MaterialUI";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log("user", user);

  return (
    <Layout>
      <div style={{ maxWidth: '1160px', margin: '5px auto' }}>
        <Breed breed={[
          { name: 'Home', href: '/' },
          { name: 'My Accounts', href: '/account' },
          { name: 'My Orders', href: '/account/orders' }
        ]} breedIcon={<IoIosArrowForward />} />
      
        {user.orders && user.orders.length > 0 ? (
          user.orders.map((order) =>
            order.items.map((item) => {
              // Safeguard checks
              const { productId } = item;
              const productName = productId?.name || "Product name unavailable";
              const productImg = productId?.productPictures?.[0]?.img || "defaultImagePath.jpg"; // Provide a default image path

              return (
                <Card key={item._id} style={{ maxWidth: "1200px", margin: "5px 0" }}>
                  <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                    <div className="orderImgContainer">
                      <img className="orderImg" src={generatePublicUrl(productImg)} alt={productName} />
                    </div>
                    <div className="orderRow">
                      <div className="orderName">{productName}</div>
                      <div className="orderPrice">{item.payablePrice}</div>
                      <div>{order.paymentStatus}</div>
                    </div>
                  </Link>
                </Card>
              );
            })
          )
        ) : (
          <div>No orders found</div>
        )}
      </div>
    </Layout>
  );
};

export default OrderPage;
