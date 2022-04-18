/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Title from "../../common/Title";
import { Store } from "../../utils/Store";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password don't match",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      Swal.fire(`Welcome`, "You signup in successfully!", "success");
      router.push(redirect || "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Your email already added" : "",
      });
    }
  };

  return (
    <div className="register relative">
      <div className="container">
        <div className="register__wrapper">
          <div className="register__wrapper__content">
            <div className="w-full">
              <Title title="Create an account" subtitle="" description="" />
              <form onSubmit={handleSubmit(submitHandler)}>
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
                  <span>Password</span>
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
                </label>
                <label>
                  <span>Conform Password</span>
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
                    className={` ${
                      errors.confirmPassword ? "ring-2 ring-red-500" : null
                    }`}
                    placeholder="Confirm Password"
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.confirmPassword?.message}
                  </span>
                </label>

                <span className="block w-full mx-auto lg:w-2/3">
                  <input
                    type="submit"
                    className="w-full text-center py-2 font-semibold text-white rounded bg-primary-500"
                    value="Create an Account"
                  />
                </span>
              </form>
              <p className="text-center py-2 d-block">
                Already have an account?
                <Link href="/login">
                  <a className="border-b border-red-500 text-red-500">
                    Log in now
                  </a>
                </Link>
              </p>
              <p className="text-center d-block">
                Don't want to create account now?
                <Link href="/">
                  <a className="border-b border-red-500 text-red-500">
                    Go to Home
                  </a>
                </Link>
              </p>
            </div>
          </div>
          <div className="register__wrapper__image">
            <img
              className=""
              src="https://res.cloudinary.com/medsy/image/upload/v1650317997/login_bbixkt.jpg"
              alt="Register"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 ">
        <Link href={"/"}>
          <a>
            <h2 className="py-2 px-4 text-lg my-2 font-semibold text-center text-white rounded bg-primary hover:bg-primary-600">
              Home
            </h2>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
