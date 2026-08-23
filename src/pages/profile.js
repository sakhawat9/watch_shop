import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import AccountLayout from "../common/AccountLayout";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";
import { Store } from "../utils/Store";
import { EMAIL_PATTERN } from "../utils/validation";

function Profile() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [status, setStatus] = useState(null);
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/profile");
      return;
    }
    reset({
      name: userInfo.name,
      email: userInfo.email,
      img: userInfo.img,
      facebook: userInfo.facebook,
      linkedIn: userInfo.linkedIn,
      twitter: userInfo.twitter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (values) => {
    setStatus(null);
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          img: values.img,
          facebook: values.facebook,
          linkedIn: values.linkedIn,
          twitter: values.twitter,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );

      dispatch({ type: "USER_LOGIN", payload: data });
      // Stay on the page and confirm inline. The old handler redirected to the
      // homepage on success, so you never saw the saved values.
      setStatus({ type: "success", message: "Your profile has been updated." });
      reset({ ...values, password: "", confirmPassword: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "We couldn't save your changes. Please try again.",
      });
    }
  };

  // Rendered client-side only, so userInfo can be briefly null on first paint.
  if (!userInfo) return null;

  return (
    <AccountLayout
      title="Account settings"
      description="Update your details, avatar and social links."
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="p-6 card sm:p-8"
      >
        {status && (
          <p
            className={`mb-6 alert ${
              status.type === "success" ? "alert-success" : "alert-danger"
            }`}
            role="status"
          >
            {status.type === "success" ? (
              <BiCheckCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
            ) : (
              <BiErrorCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
            )}
            <span>{status.message}</span>
          </p>
        )}

        <section className="pb-2 mb-2">
          <h2 className="mb-5 text-h4">Personal details</h2>

          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name?.message} required>
              {(id, describedBy, invalid) => (
                <input
                  id={id}
                  type="text"
                  autoComplete="name"
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  className={inputClass(invalid)}
                  {...register("name", { required: "Enter your full name" })}
                />
              )}
            </Field>

            <Field label="Email address" error={errors.email?.message} required>
              {(id, describedBy, invalid) => (
                <input
                  id={id}
                  type="email"
                  autoComplete="email"
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  className={inputClass(invalid)}
                  {...register("email", {
                    required: "Enter your email address",
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              )}
            </Field>

            <Field
              label="Avatar image URL"
              hint="Paste a link to a square image."
              className="sm:col-span-2"
            >
              {(id, describedBy) => (
                <input
                  id={id}
                  type="url"
                  placeholder="https://…"
                  aria-describedby={describedBy}
                  className="input"
                  {...register("img")}
                />
              )}
            </Field>
          </div>
        </section>

        <section className="pt-6 mt-2 border-t border-secondary-200">
          <h2 className="mb-1 text-h4">Change password</h2>
          <p className="mb-5 text-sm text-primary-500">
            Leave both fields blank to keep your current password.
          </p>

          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="New password" error={errors.password?.message}>
              {(id, describedBy, invalid) => (
                <input
                  id={id}
                  type="password"
                  autoComplete="new-password"
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  className={inputClass(invalid)}
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Use at least 6 characters",
                    },
                  })}
                />
              )}
            </Field>

            <Field label="Confirm new password" error={errors.confirmPassword?.message}>
              {(id, describedBy, invalid) => (
                <input
                  id={id}
                  type="password"
                  autoComplete="new-password"
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  className={inputClass(invalid)}
                  {...register("confirmPassword", {
                    validate: (value) =>
                      !watch("password") ||
                      value === watch("password") ||
                      "Passwords don't match",
                  })}
                />
              )}
            </Field>
          </div>
        </section>

        <section className="pt-6 mt-2 border-t border-secondary-200">
          <h2 className="mb-5 text-h4">Social links</h2>

          <div className="grid gap-x-5 sm:grid-cols-3">
            {[
              { name: "facebook", label: "Facebook" },
              { name: "linkedIn", label: "LinkedIn" },
              { name: "twitter", label: "Twitter" },
            ].map((social) => (
              <Field key={social.name} label={social.label}>
                {(id) => (
                  <input
                    id={id}
                    type="url"
                    placeholder="https://…"
                    className="input"
                    {...register(social.name)}
                  />
                )}
              </Field>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-secondary-200">
          <Button type="submit" variant="accent" loading={isSubmitting}>
            Save changes
          </Button>
          <Button href="/userOrders" variant="outline">
            View my orders
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
