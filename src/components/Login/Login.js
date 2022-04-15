/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Title from "../../common/Title";
import { Store } from "../../utils/Store";

const Login = () => {
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

  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      Swal.fire(`Welcome`, "You logged in successfully!", "success");
      router.push(redirect || "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Your email or password is not valid." : "",
      });
    }
  };

  return (
    <div className="login relative">
      <div className="login__area">
        <div className="login__area__wrapper">
          <div className="login__area__wrapper__content">
            <Title title="Log in now" subtitle="" description="" />
            <form onSubmit={handleSubmit(submitHandler)}>
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
                  className={`
           ${errors.email ? "ring-2 ring-red-500" : null}`}
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
                  className={`
               ${errors.password ? "ring-2 ring-red-500" : null}`}
                  placeholder="password"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.password?.message}
                </span>
              </label>
              <div className="tracking-wide text-gray-900">
                <Link href="#">
                  <a className="text-red-500 border-b border-red-500">
                    Forgot Password?
                  </a>
                </Link>
              </div>
              <input
                type="submit"
                className="w-full py-2 my-2 font-semibold text-center text-white rounded bg-primary hover:bg-primary-600"
                value="Log in now"
              />
            </form>
            <p className="text-center d-block">
              Don't have an account?
              <Link href="/register">
                <a className="text-red-500 border-b border-red-500">
                  Create an account
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-10 ">
        <Link href={"/"}>
          <a>
            <h2 className="btn btn-default">Home</h2>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
