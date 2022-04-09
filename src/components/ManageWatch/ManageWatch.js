/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useReducer } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin7Line, RiFileEditLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Store } from "../../utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
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

const ManageWatch = ({ watch }) => {
  const { image, name, slug, _id } = watch;

  const { state } = useContext(Store);
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
      await axios.delete(`/api/admin/watch/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      Swal.fire({
        icon: "success",
        text: "Watch deleted successfully",
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
    <div className="manageWatch__wrapper__items">
      <div className="manageWatch__wrapper__items__wrapper">
        <div className="">
          <Image width="500" height="500" src={image} alt="" />
          <h5 className="manageWatch__wrapper__items__wrapper__title">
            {name}
          </h5>
        </div>
        <div className="manageWatch__wrapper__items__wrapper__icons">
          <Link href={`/watch/${slug}`}>
            <a>
              <button>
                <AiFillEye />
              </button>
            </a>
          </Link>
          <Link href={`/dashboard/watch/${_id}`}>
            <a>
              <button className="mx-4">
                <RiFileEditLine />
              </button>
            </a>
          </Link>
          <button onClick={() => deleteHandler(_id)}>
            <RiDeleteBin7Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWatch;
