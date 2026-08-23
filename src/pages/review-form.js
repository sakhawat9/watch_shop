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

function ReviewForm() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [status, setStatus] = useState(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/review-form");
      return;
    }
    reset({ name: userInfo.name, email: userInfo.email, img: userInfo.img });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (values) => {
    setStatus(null);
    try {
      await axios.post("/api/review", values);
      setStatus({
        type: "success",
        message: "Thank you — your review has been submitted.",
      });
      reset({ ...values, description: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "We couldn't submit your review. Please try again.",
      });
    }
  };

  if (!userInfo) return null;

  return (
    <AccountLayout
      title="Write a review"
      description="Tell other shoppers about your experience with Watch_Shop."
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="max-w-2xl p-6 card sm:p-8"
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

        <div className="grid gap-x-5 sm:grid-cols-2">
          <Field label="Your name" error={errors.name?.message} required>
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="text"
                autoComplete="name"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("name", { required: "Enter your name" })}
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
        </div>

        <Field label="Avatar image URL" hint="Optional — leave blank to use a placeholder.">
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

        {/* A textarea, not a single-line input — reviews are prose. */}
        <Field
          label="Your review"
          error={errors.description?.message}
          hint="A sentence or two about the watch and the service."
          required
        >
          {(id, describedBy, invalid) => (
            <textarea
              id={id}
              rows={5}
              placeholder="What did you think?"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid, "textarea")}
              {...register("description", {
                required: "Write your review",
                minLength: {
                  value: 20,
                  message: "Please write at least 20 characters",
                },
                maxLength: {
                  value: 600,
                  message: "Please keep your review under 600 characters",
                },
              })}
            />
          )}
        </Field>

        <Button type="submit" variant="accent" loading={isSubmitting}>
          Submit review
        </Button>
      </form>
    </AccountLayout>
  );
}

export default dynamic(() => Promise.resolve(ReviewForm), { ssr: false });
