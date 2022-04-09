/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Title from "../../common/Title";
import { Store } from "../../utils/Store";
import Swal from "sweetalert2";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

const ViewAllOrder = ({ orderWatch }) => {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ successDelete }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
    }
  }, []);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/order/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      Swal.fire({
        icon: "success",
        text: "Order deleted successfully",
      });

      window.location.reload();
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <div className="all-order__area__viewAllOrder">
      <Title title="All Order" subtitle="" description="Welcome to your manage users page." />
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Food name</th>
            <th>Price</th>
            <th>Payment with</th>
            <th>Phone</th>
            <th>Billing address</th>
            <th>Card last digit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orderWatch.map((data) => (
            <tr key={data._id}>
              <td>{data.userInfo.name}</td>
              <td>{data.cartItems[0]?.name}</td>
              <td>{data.cartItems[0]?.price}</td>
              <td className="px-4 py-2 uppercase">{data.paymentInfo.brand}</td>
              <td>{data.shippingAddress.phone}</td>
              <td>{data.shippingAddress.address}</td>
              <td>{data.paymentInfo.last4}</td>
              <td
                className="text-red-600 cursor-pointer bg-red-200"
                onClick={() => deleteHandler(data._id)}
              >
                delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllOrder;
