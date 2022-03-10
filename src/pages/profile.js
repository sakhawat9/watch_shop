/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Layout from "../common/Layout";
import Title from "../common/Title";
import { Store } from "../utils/Store";

function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    setValue("name", userInfo?.name);
    setValue("email", userInfo?.email);
    setValue("img", userInfo?.img);
    setValue("facebook", userInfo?.facebook);
    setValue("linkedIn", userInfo?.linkedIn);
    setValue("twitter", userInfo?.twitter);
  }, []);

  const submitHandler = async ({
    name,
    email,
    img,
    facebook,
    twitter,
    linkedIn,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password don't match",
      });
      return;
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
          img,
          facebook,
          linkedIn,
          twitter,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      Swal.fire({
        icon: "success",
        text: "Profile updated successfully",
      });
      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Profile updated failed" : "",
      });
    }
  };

  return (
    <Layout title={`${userInfo.name} profile | Restaurant Website.`}>
      <div className="profile">
      <div className="profile__area">
        <div className="lg:col-span-5"></div>
        <div className="profile__area__wrapper">
          <div className="profile__area__wrapper__content">
            <Title title="Update your account" subtitle="" description="" />
            <form
              onSubmit={handleSubmit(submitHandler)}
            >
              <label>
                <span>
                  Name<span className="text-red-600"> *</span>
                </span>
                <span className="block">
                  <input
                    onChange={() => {}}
                    type="text"
                    name="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "You most enter name",
                      },
                    })}
                    className={` ${errors.name ? "ring-2 ring-red-500" : null}`}
                    placeholder="Full name"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.name?.message}
                  </span>
                </span>
              </label>
              <label>
                <span >
                  Password<span className="text-red-600"> *</span>
                </span>
                <span className="block">
                  <input
                    type="password"
                    name="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "You most enter password",
                      },
                      minLength: {
                        value: 6,
                        message: "Password lenth is more then 5",
                      },
                    })}
                    className={`${
                      errors.password ? "ring-2 ring-red-500" : null
                    }`}
                    placeholder="Password"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.password?.message}
                  </span>
                </span>
              </label>
              <label>
                <span>
                  Conform Password<span className="text-red-600"> *</span>
                </span>
                <span className="block">
                  <input
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "You most enter confirm Password",
                      },
                      minLength: {
                        value: 6,
                        message: "confirm Password lenth is more then 5",
                      },
                    })}
                    className={`${
                      errors.confirmPassword ? "ring-2 ring-red-500" : null
                    }`}
                    placeholder="Confirm Password"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.confirmPassword?.message}
                  </span>
                </span>
              </label>
              <label>
                <span>Image</span>
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
                <span>Facebook</span>
                <span className="block">
                  <input
                    onChange={() => {}}
                    type="text"
                    name="facebook"
                    {...register("facebook", {})}
                    placeholder="Facebook URL"
                  />
                  <span className="py-2 text-sm text-red-400"></span>
                </span>
              </label>
              <label>
                <span>LinkedIn</span>
                <span className="block">
                  <input
                    onChange={() => {}}
                    type="text"
                    name="linkedIn"
                    {...register("linkedIn", {})}
                    placeholder="LinkedIn URL"
                  />
                  <span className="py-2 text-sm text-red-400"></span>
                </span>
              </label>
              <label>
                <span>Twitter</span>
                <span className="block">
                  <input
                    onChange={() => {}}
                    type="text"
                    name="twitter"
                    {...register("twitter", {})}
                    placeholder="Twitter URL"
                  />
                  <span className="py-2 text-sm text-red-400"></span>
                </span>
              </label>
              <span className="block w-full mx-auto lg:w-4/5 ">
                <input
                  type="submit"
                  className="w-full px-6 py-3 text-lg text-center text-white border-0 rounded cursor-pointer bg-primary-500 focus:outline-none hover:bg-aquamarine-800"
                  value="Update Account"
                />
              </span>
            </form>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
