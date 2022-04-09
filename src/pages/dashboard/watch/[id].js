/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Title from "../../../common/Title";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { Store } from "../../../utils/Store";

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

function FoodEdit({ params }) {
  const productId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;

  const [prichard, setPrichard] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/watch/${productId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          setPrichard(data.prichard);
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("name", data.name);
          setValue("slug", data.slug);
          setValue("shortDesc", data.shortDesc);
          setValue("category", data.category);
          setValue("level", data.level);
          setValue("price", data.price);
          setValue("countInStock", data.countInStock);
          setValue("videoUrl", data.videoUrl);
          setValue("image", data.image);
          setValue("bannerImage", data.bannerImage);
          setValue("description", data.description);
          setValue("prichard", data.prichard);
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: err.message ? "Profile updated failed" : "",
          });
        }
      };
      fetchData();
    }
  }, []);

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
      setValue("image", data.secure_url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };
  const uploadBannerImage = async (e) => {
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
      setValue("bannerImage", data.secure_url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  const submitHandler = async ({
    name,
    slug,
    shortDesc,
    category,
    level,
    price,
    countInStock,
    videoUrl,
    image,
    bannerImage,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/watch/${productId}`,
        {
          name,
          slug,
          shortDesc,
          category,
          level,
          price,
          countInStock,
          videoUrl,
          image,
          bannerImage,
          description,
          prichard,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      Swal.fire({
        icon: "success",
        text: "Watch updated successfully",
      });
      router.push("/dashboard/watch/manageWatch");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <>
      <div className="watch-update">
        <Sidebar />
        <div className="watch-update__wrapper section-padding">
          <div className="watch-update__wrapper__area">
            <div className="watch-update__wrapper__area__content">
              <div className="w-full ">
                <Title title="Watch update" subtitle="" description=""></Title>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="md:flex gap-4">
                    <div className="watch-update__wrapper__area__content__name-input">
                      <label>
                        <span className="watch-update__wrapper__area__content__name-input__title">
                          Name
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="name"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("name", {
                              required: {
                                value: true,
                                message: "You most enter name",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__name-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="watch-update__wrapper__area__content__slug-input">
                      <label>
                        <span className="watch-update__wrapper__area__content__slug-input__title">
                          Slug
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="slug"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("slug", {
                              required: {
                                value: true,
                                message: "You most enter slug",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__slug-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="md:flex gap-4">
                    <div className="watch-update__wrapper__area__content__shot-desc-input">
                      <label className="space-y-0.5 w-full  block mx-auto">
                        <span className="watch-update__wrapper__area__content__shot-desc-input__title">
                          ShortDesc
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="shortDesc"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("shortDesc", {
                              required: {
                                value: true,
                                message: "You most enter shortDesc",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__shot-desc-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="watch-update__wrapper__area__content__category-input">
                      <label>
                        <span className="watch-update__wrapper__area__content__category-input__title">
                          Category
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="category"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("category", {
                              required: {
                                value: true,
                                message: "You most enter category",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__category-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="md:flex gap-4">
                    <div className="watch-update__wrapper__area__content__price-input">
                      <label>
                        <span className="watch-update__wrapper__area__content__price-input__title">
                          Price
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="price"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("price", {
                              required: {
                                value: true,
                                message: "You most enter price",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__price-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="watch-update__wrapper__area__content__cont-in-stock-input">
                      <label>
                        <span className="watch-update__wrapper__area__content__cont-in-stock-input__title">
                          CountInStock
                        </span>
                        <span className="block">
                          <input
                            type="text"
                            name="countInStock"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register("countInStock", {
                              required: {
                                value: true,
                                message: "You most enter countInStock",
                              },
                            })}
                            className={`${
                              errors.name ? "ring-2 ring-red-500" : null
                            }`}
                          />
                          <span className="watch-update__wrapper__area__content__cont-in-stock-input__error">
                            {errors?.name?.message}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="watch-update__wrapper__area__content__image-input">
                    <label className="watch-update__wrapper__area__content__image-input">
                      <span className="watch-update__wrapper__area__content__image-input__title">
                        Image
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="image"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("image", {
                            required: {
                              value: true,
                              message: "You most enter image",
                            },
                          })}
                          className={`${
                            errors.name ? "ring-2 ring-red-500" : null
                          }`}
                        />
                        <span className="watch-update__wrapper__area__content__image-input__error">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <button>
                    <input type="file" onChange={uploadHandler} />
                  </button>
                  <div className="watch-update__wrapper__area__content__banner-image-input">
                    <label>
                      <span className="watch-update__wrapper__area__content__banner-image-input__title">
                        Banner Image
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="bannerImage"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("bannerImage", {
                            required: {
                              value: true,
                              message: "You most enter banner image",
                            },
                          })}
                          className={`${
                            errors.name ? "ring-2 ring-red-500" : null
                          }`}
                        />
                        <span className="watch-update__wrapper__area__content__banner-image-input__error">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <button>
                    <input type="file" onChange={uploadBannerImage} />
                  </button>
                  <div className="flex gap-4">
                    <div className="mb-4">
                      <input
                        id="prichard"
                        onClick={(e) => setPrichard(e.target.checked)}
                        className="rounded focus:border-royal-blue "
                        type="radio"
                        name="prichard"
                      />
                      <label htmlFor="prichard">Is prichard</label>
                    </div>
                  </div>
                  <div className="watch-update__wrapper__area__content__desc-input">
                    <label>
                      <span className="watch-update__wrapper__area__content__desc-input__title">
                        Description
                      </span>
                      <span className="block">
                        <textarea
                          type="text"
                          name="description"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("description", {
                            required: {
                              value: true,
                              message: "You most enter description",
                            },
                          })}
                          className={` ${
                            errors.name ? "ring-2 ring-red-500" : null
                          }`}
                        />
                        <span className="watch-update__wrapper__area__content__desc-input__error">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="watch-update__wrapper__area__content__submit">
                    <span>
                      <input type="submit" value="Update Food"></input>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(FoodEdit), { ssr: false });
