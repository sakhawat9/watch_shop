/* eslint-disable react/jsx-key */
// import Title from "components/common/Title";
import React from "react";
import Title from "../../common/Title";

const ViewAllOrder = ({ orderWatch }) => {
  return (
    <div className="all-order__area__viewAllOrder">
      <Title title="All Order" subtitle="" description="" />
      <table>
        <thead >
          <tr>
            <th>User name</th>
            <th>Food name</th>
            <th>Price</th>
            <th>Payment with</th>
            <th>Phone</th>
            <th>Billing address</th>
            <th>Card last digit</th>
          </tr>
        </thead>
        <tbody>
          {orderWatch.map((data) => (
            <tr>
              <td>{data.userInfo.name}</td>
              <td>{data.cartItems[0]?.name}</td>
              <td>{data.cartItems[0]?.price}</td>
              <td className="px-4 py-2 uppercase">{data.paymentInfo.brand}</td>
              <td>{data.phone}</td>
              <td>{data.address}</td>
              <td>{data.paymentInfo.last4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllOrder;
