import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";
import { updateOrder } from "../../actions";

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={orderItem._id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 50px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId ? item.productId.name : "Product name not available"}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status, index) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                  key={index}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "0  90px 0 70px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status, index) => (
                  <React.Fragment key={index}>
                    {!status.isCompleted ? (
                      <option key={status.type} value={status.type}>
                        {status.type}
                      </option>
                    ) : null}
                  </React.Fragment>
                ))}
              </select>
            </div>

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button onClick={() => onOrderUpdate(orderItem._id)}>
                confirm
              </button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
