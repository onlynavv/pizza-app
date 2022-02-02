import React from 'react'
// import "./OrderTracking.css"

const OrderTracking = () => {
  // const status = 0;

  return (
    <div className="container">
      <div className="left">
        <div className="row">
          <table className="table">
            <thead>
            <tr className="trTitle">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr className="tr">
              <td>
                <span className="id">129837819237</span>
              </td>
              <td>
                <span className="name">John Doe</span>
              </td>
              <td>
                <span className="address">Elton st. 212-33 LA</span>
              </td>
              <td>
                <span className="total">$79.80</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div>
            <img src="/images/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div>
            <img src="/images/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div>
            <img src="/images/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div>
            <img src="/images/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className="checkedIcon">
              <img
                className="checkedIcon"
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2 className="title">CART TOTAL</h2>
          <div className="totalText">
            <b className="totalTextTitle">Subtotal:</b>$79.60
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Discount:</b>$0.00
          </div>
          <div className="totalText">
            <b className="totalTextTitle">Total:</b>$79.60
          </div>
          <button disabled className="button">
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;