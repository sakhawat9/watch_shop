/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Dashboard/Sidebar";
import User from "../../models/User";
import db from "../../utils/db";
import { AiTwotoneDelete } from "react-icons/ai";
import { Store } from "../../utils/Store";
import Swal from "sweetalert2";

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

const manageUser = ({ users }) => {
  console.log(users);
  return (
    <>
      <Head>
        <title>Manage User | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <div className="grid grid-cols-12 gap-4">
            {users.map((user) => (
              <Card key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Card = ({ user }) => {
  const { img, name, email, _id } = user;

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
      await axios.delete(`/api/admin/user/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      Swal.fire({
        icon: "success",
        text: "User deleted successfully",
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
    <div className="col-span-12 p-2 rounded md:col-span-3 relative shadow">
      <div className="flex items-center gap-4">
        <div className="">
          <img
            className="w-56 rounded object-cover h-32"
            src={img}
            alt={name}
          />
        </div>
        <div className="w-full">
          <h3 className="text-lg">{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <AiTwotoneDelete
          onClick={() => deleteHandler(_id)}
          className="bg-primary hover:bg-primary-600 text-4xl rounded p-2 text-white"
        />
      </div>
    </div>
  );
};

export default manageUser;

export async function getServerSideProps() {
  await db.connect();
  const user = await User.find({}).lean();
  await db.disconnect();
  return {
    props: {
      users: user.map(db.convertDocToObj),
    },
  };
}
