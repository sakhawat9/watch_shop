import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheckCircle, BiErrorCircle, BiMap, BiTime } from "react-icons/bi";
import { FaRegEnvelope } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";
import PageHeader from "../components/ui/PageHeader";
import { EMAIL_PATTERN } from "../utils/validation";

const DETAILS = [
  {
    icon: FaRegEnvelope,
    label: "Email",
    value: "sakhawathossain7969@gmail.com",
    href: "mailto:sakhawathossain7969@gmail.com",
  },
  {
    icon: IoIosCall,
    label: "Phone",
    value: "+088 01849687969",
    href: "tel:+8801849687969",
  },
  {
    icon: BiMap,
    label: "Address",
    value: "15/e Lake Circus, Kalabagan, Dhaka, Bangladesh",
  },
  { icon: BiTime, label: "Support hours", value: "Available 24/7" },
];

export default function ContactPage() {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  async function onSubmit(values) {
    setStatus(null);
    try {
      await axios.post("/api/contact", values, {
        headers: { "Content-Type": "application/json" },
      });
      // Inline confirmation replaces the animate.css + react-toastify combo
      // the old page pulled in solely for this one success message.
      setStatus({
        type: "success",
        message: "Thanks — your message is on its way. We'll reply within one business day.",
      });
      reset();
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "We couldn't send your message. Please email us directly instead.",
      });
    }
  }

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with the Watch_Shop team — we reply within one business day."
    >
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        description="Questions about an order, a product, or a return? Send us a message and we'll get back to you within one business day."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="mb-6 text-h3">Reach us directly</h2>

              <ul className="mb-8 space-y-5">
                {DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-gold-100 text-gold-700">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs tracking-wide uppercase text-primary-400">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium break-all transition-colors text-primary-900 hover:text-gold-700"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-primary-900">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-card bg-secondary-100">
                <p className="mb-1 text-sm font-semibold text-primary-900">
                  Looking for a quick answer?
                </p>
                <p className="mb-3 text-sm text-primary-500">
                  Shipping times, returns and warranty terms are all covered in
                  our FAQ.
                </p>
                <Button href="/FAQ" variant="outline" size="sm">
                  Read the FAQ
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="p-6 card sm:p-8"
              >
                <h2 className="mb-6 text-h3">Send a message</h2>

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
                </div>

                <Field label="Phone number" hint="Optional.">
                  {(id, describedBy) => (
                    <input
                      id={id}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+880 1XXX XXXXXX"
                      aria-describedby={describedBy}
                      className="input"
                      {...register("phone")}
                    />
                  )}
                </Field>

                <Field
                  label="Message"
                  error={errors.message?.message}
                  hint="Include your order number if your question is about an order."
                  required
                >
                  {(id, describedBy, invalid) => (
                    <textarea
                      id={id}
                      rows={6}
                      placeholder="How can we help?"
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={inputClass(invalid, "textarea")}
                      {...register("message", {
                        required: "Write your message",
                        minLength: {
                          value: 20,
                          message: "Please give us a little more detail (20+ characters)",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Please keep your message under 1000 characters",
                        },
                      })}
                    />
                  )}
                </Field>

                <Button type="submit" variant="accent" size="lg" loading={isSubmitting}>
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ContactAvailable />
    </Layout>
  );
}
