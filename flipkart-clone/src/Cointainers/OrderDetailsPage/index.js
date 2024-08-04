import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import { useParams } from 'react-router-dom';
import "./style.css";
import Layout from "../../Components/Layout";
import Card from "../../Components/UI/Card";
import Price from "../../Components/UI/Card/Price"; // Assuming you have a Price component
import { generatePublicUrl } from "../../urlconfig";

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const { orderDetails, error } = useSelector((state) => state.user);
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder({ orderId }));
    }
  }, [dispatch, orderId]);

  if (error) {
    return (
      <Layout>
        <div style={{ width: "1160px", margin: "10px auto", color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div style={{ width: "1160px", margin: "10px auto" }}>
        <Card style={{ margin: "10px 0" }}>
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Delivery Address</div>
              <div className="delName">{orderDetails.address.name}</div>
              <div className="delAddress">{orderDetails.address.address}</div>
              <div className="delPhoneNumber">Phone number: {orderDetails.address.mobileNumber}</div>
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle">More Actions</div>
              <div className="delName">Download Invoice</div>
            </div>
          </div>
        </Card>

        {orderDetails.items.map((item, index) => {
          // Safeguard checks
          const { productId } = item;
          const productName = productId?.name || "Product name unavailable";
          const productImg = productId?.productPictures?.[0]?.img || "defaultImagePath.jpg"; // Provide a default image path

          return (
            <Card key={index} style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}>
              <div className="flexRow">
                <div className="delItemImgContainer">
                  <img src={generatePublicUrl(productImg)} alt={productName} />
                </div>
                <div style={{ width: "250px" }}>
                  <div className="delItemName">{productName}</div>
                  <Price value={item.payablePrice} />
                </div>
              </div>
              <div style={{ padding: "25px 50px" }}>
                <div className="orderTrack">
                  {orderDetails.orderStatus.map((status, index) => (
                    <div key={index} className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
                      <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontWeight: "500", fontSize: 14 }}>
                {orderDetails.orderStatus[3].isCompleted &&
                  `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
              </div>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
