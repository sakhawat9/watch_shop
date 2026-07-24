import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { Store } from "../utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

const AddNewWatch = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [delPrice, setDelPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/admin/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: "UPLOAD_SUCCESS" });
      setImg(data.secure_url);

      Swal.fire({
        icon: "success",
        title: "Image",
        text: "Image uploaded successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/addWatch/addWatch", {
        name,
        slug,
        shortDesc,
        category,
        price,
        delPrice,
        description,
        img,
      });
      Swal.fire({
        icon: "success",
        text: "Watch uploaded successfully",
      });

      router.push("/allProducts");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="add-watch__wrapper__content">
          <div className="gap-4 md:flex">
            <div className="add-watch__wrapper__content__similar-input">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                name="name"
                placeholder="Write your watch name here..."
              />
            </div>
            <div className="add-watch__wrapper__content__similar-input">
              <label htmlFor="slug">Slug</label>
              <input
                onChange={(e) => setSlug(e.target.value)}
                id="slug"
                type="text"
                name="slug"
                placeholder="Write your watch name here..."
              />
            </div>
          </div>

          <div className="gap-4 md:flex">
            <div className="add-watch__wrapper__content__short-desc-input">
              <label htmlFor="shortDesc">Short Description</label>
              <textarea
                onChange={(e) => setShortDesc(e.target.value)}
                name="shortDesc"
                placeholder="Write short description"
                id="shortDesc"
              ></textarea>
            </div>

            <div className="add-watch__wrapper__content__category-input">
              <label htmlFor="category">Watch Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                name="category"
              >
                <option value="javascript">Select Category</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="kidgirls">Kid Girls</option>
                <option value="kidbyes">Kid Boys</option>
              </select>
            </div>
          </div>

          <div className="gap-4 md:flex">
            <div className="add-watch__wrapper__content__similar-input">
              <label htmlFor="price">Watch Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                type="number"
                name="price"
                placeholder="Write your watch price here..."
              />
            </div>
            <div className="add-watch__wrapper__content__similar-input">
              <label htmlFor="delPrice">Watch Del Price</label>
              <input
                onChange={(e) => setDelPrice(e.target.value)}
                id="delPrice"
                type="number"
                name="delPrice"
                placeholder="Write your watch delPrice here..."
              />
            </div>
          </div>

          <div className="add-watch__wrapper__content__textarea-input">
            <label htmlFor="description">Watch Overview</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your watch overview..."
              id="description"
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex mt-6 mb-8">
            <div className="max-w-xs rounded-lg shadow-xl md:max-w-2xl bg-gray-50">
              <div className="m-4 ">
                <label className="inline-block mb-2 text-gray-500">
                  Upload thumbnail
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center cursor-pointer pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Attach a file
                      </p>
                    </div>
                    <input
                      disabled={!setImg}
                      onChange={uploadHandler}
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      className="opacity-0"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <input
            className="mx-auto text-center md:w-1/3 btn-brand"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewWatch;
