/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Layout from "../common/Layout";
import Title from "../common/Title";
import { Store } from "../utils/Store";

const ReviewForm = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    setValue("name", userInfo?.name);
    setValue("email", userInfo?.email);
    setValue("img", userInfo?.img);
    setValue("description", userInfo?.description);
  }, []);

  const router = useRouter();

  const submitHandler = async ({ name, email, img, description }) => {
    try {
      const { data } = await axios.post("/api/review", {
        name,
        email,
        img,
        description,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Swal.fire({
        icon: "success",
        text: "Your Email successfully",
      });
      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <Layout title="Watch Shop Review | ECommerce-Website.">
      <div className="register">
        <div className="register__area">
          <div className="lg:col-span-5"></div>
          <div className="register__area__wrapper">
            <div className="register__area__wrapper__content">
              <Title title="Add Review" subtitle="" description="" />

              <form
                className="register__form"
                onSubmit={handleSubmit(submitHandler)}
              >
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "You most enter name",
                      },
                    })}
                    className={`${errors.name ? "ring-2 ring-red-500" : null}`}
                    placeholder="Full name"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.name?.message}
                  </span>
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="Email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "You most enter email address",
                      },
                      minLength: {
                        value: 8,
                        message: "This is not long enough to be an email",
                      },
                      maxLength: {
                        value: 120,
                        message: "This is too long",
                      },
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "invalid email address",
                      },
                    })}
                    className={`${errors.email ? "ring-2 ring-red-500" : null}`}
                    placeholder="Email"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.email?.message}
                  </span>
                </label>
                <label>
                  <span className="login__form__title">Image</span>
                  <span className="block">
                    <input
                      onChange={() => {}}
                      type="text"
                      name="img"
                      {...register("img", {})}
                      placeholder="Image URL"
                    />
                    <span className="py-2 text-sm text-red-400"></span>
                  </span>
                </label>
                <label>
                  <span>Description</span>
                  <input
                    type="text"
                    name="description"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "You most enter description",
                      },
                    })}
                    className={`${
                      errors.description ? "ring-2 ring-red-500" : null
                    }`}
                    placeholder="Your Description"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.description?.message}
                  </span>
                </label>
                <span className="w-full">
                  <input
                    type="submit"
                    className="w-full text-white py-2 rounded bg-primary-500"
                    value="Add Review"
                  />
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewForm;
