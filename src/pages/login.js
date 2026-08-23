import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import AuthShell from "../components/auth/AuthShell";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";
import { Store } from "../utils/Store";
import { EMAIL_PATTERN } from "../utils/validation";

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [formError, setFormError] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (userInfo) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async ({ email, password }) => {
    setFormError(null);
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      // USER_LOGIN persists the userInfo cookie via the reducer — the extra
      // manual Cookies.set() the old handler did was redundant.
      dispatch({ type: "USER_LOGIN", payload: data });
      router.push(redirect || "/");
    } catch (err) {
      // Deliberately generic: naming which of the two was wrong would let an
      // attacker enumerate registered email addresses.
      setFormError(
        err.response?.status === 401 || err.response?.status === 400
          ? "That email and password combination doesn't match an account."
          : "We couldn't sign you in right now. Please try again.",
      );
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back. Sign in to track orders and save watches to your wishlist."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="link">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        {formError && (
          <p className="mb-6 alert alert-danger" role="alert">
            <BiErrorCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
            <span>{formError}</span>
          </p>
        )}

        <Field label="Email address" error={errors.email?.message} required>
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
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

        <Field label="Password" error={errors.password?.message} required>
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("password", {
                required: "Enter your password",
                minLength: {
                  value: 6,
                  message: "Passwords are at least 6 characters",
                },
              })}
            />
          )}
        </Field>

        <Button type="submit" variant="accent" size="lg" block loading={isSubmitting}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
