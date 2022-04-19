/* eslint-disable @next/next/no-img-element */
import "animate.css/animate.min.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import Title from "../common/Title";

const zoomIn = cssTransition({
  enter: "animate__animated animate__zoomIn",
  exit: "animate__animated animate__zoomIn",
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmitForm(values) {
    let config = {
      method: "post",
      url: `/contact`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    try {
      const response = await axios(config);
      if (response.status === 200) {
        toast.success("Your mail submitted!", {
          position: toast.POSITION.TOP_CENTER,
          transition: zoomIn,
        });
        reset();
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout title="Contact Us | ECommerce-Website.">
      <ToastContainer />

      <div className="contact">
        <div className="container">
          <div className="contact__wrapper">
            <div className="register__wrapper__content">
              <div className="w-full">
                <Title
                  title="Contact Us"
                  subtitle="Fill In Your Information & We Will Be In Touch As Soon As We Can"
                />
                <form onSubmit={handleSubmit(onSubmitForm)}>
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
                      className={`${
                        errors.name ? "ring-2 ring-red-500" : null
                      }`}
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
                      className={`${
                        errors.email ? "ring-2 ring-red-500" : null
                      }`}
                      placeholder="Email"
                    />
                    <span className="py-2 text-sm text-red-400">
                      {errors?.email?.message}
                    </span>
                  </label>

                  <label>
                    <span>Phone</span>
                    <input
                      type="text"
                      name="phone"
                      {...register("phone")}
                      placeholder="Phone"
                    />
                  </label>

                  <label>
                    <span>Message</span>

                    <textarea
                      name="message"
                      {...register("message", {
                        required: {
                          value: true,
                          message: "You need to enter your message",
                        },
                        maxLength: {
                          value: 1000,
                          message:
                            "You message can't be more than 1000 characters",
                        },
                        minLength: {
                          value: 50,
                          message: "You message must be longer then this!",
                        },
                      })}
                      className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.message ? "ring-2 ring-red-500" : null}`}
                      placeholder="Message"
                    />
                    <span className="py-2 text-sm text-red-400">
                      {errors?.message?.message}
                    </span>
                  </label>
                  <div className="w-2/3 mx-auto">
                    <input
                      type="submit"
                      className="w-full text-center py-2 font-semibold text-white rounded bg-primary-500"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="contact__wrapper__image">
              <img
                src="https://res.cloudinary.com/medsy/image/upload/v1650325024/5124556_smenwm.jpg"
                alt="Contact us"
              />
            </div>
          </div>
        </div>
      </div>
      <ContactAvailable />
    </Layout>
  );
}
