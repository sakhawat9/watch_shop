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
import { EMAIL_PATTERN, PASSWORD_RULES } from "../utils/validation";

export default function RegisterPage() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [formError, setFormError] = useState(null);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (userInfo) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async ({ name, email, password }) => {
    setFormError(null);
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      router.push(redirect || "/");
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          "We couldn't create your account. That email may already be registered.",
      );
    }
  };

  return (
    <AuthShell
      title="Create an account"
      subtitle="Save watches, track your orders, and check out faster next time."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="link">
            Sign in
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

        <Field label="Full name" error={errors.name?.message} required>
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
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

        <Field
          label="Password"
          error={errors.password?.message}
          hint="At least 6 characters."
          required
        >
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("password", PASSWORD_RULES)}
            />
          )}
        </Field>

        <Field
          label="Confirm password"
          error={errors.confirmPassword?.message}
          required
        >
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("confirmPassword", {
                required: "Re-enter your password",
                // Validated inline so the mismatch shows next to the field,
                // rather than as a modal alert after submitting.
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
            />
          )}
        </Field>

        <Button type="submit" variant="accent" size="lg" block loading={isSubmitting}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
