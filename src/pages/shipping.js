import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdArrowForward, MdOutlineShoppingBag } from "react-icons/md";
import Layout from "../common/Layout";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import OrderSummary from "../components/checkout/OrderSummary";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Field, { inputClass } from "../components/ui/Field";
import PageHeader from "../components/ui/PageHeader";
import { Store } from "../utils/Store";

// `autoComplete` tokens let browsers fill the whole address in one go — the
// original form had none, so every field had to be typed by hand.
const FIELDS = [
  {
    name: "fullName",
    label: "Full name",
    autoComplete: "name",
    placeholder: "Jane Doe",
    rules: { required: "Enter the recipient's full name" },
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+880 1XXX XXXXXX",
    hint: "Used by the courier for delivery updates.",
    rules: {
      required: "Enter a phone number",
      minLength: { value: 6, message: "That phone number looks too short" },
    },
  },
  {
    name: "address",
    label: "Street address",
    autoComplete: "street-address",
    placeholder: "15/e Lake Circus",
    rules: { required: "Enter your street address" },
    full: true,
  },
  {
    name: "city",
    label: "City",
    autoComplete: "address-level2",
    placeholder: "Dhaka",
    rules: { required: "Enter your city" },
  },
  {
    name: "postalCode",
    label: "Postal code",
    autoComplete: "postal-code",
    placeholder: "1205",
    rules: { required: "Enter your postal code" },
  },
  {
    name: "country",
    label: "Country",
    autoComplete: "country-name",
    placeholder: "Bangladesh",
    rules: { required: "Enter your country" },
    full: true,
  },
];

function Shipping() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
      return;
    }
    // Prefill from the saved address, defaulting the name to the account name.
    reset({ fullName: userInfo.name, ...shippingAddress });
    // Guard and prefill only need to run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (values) => {
    // The reducer persists the shippingAddress cookie.
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: values });
    router.push(redirect || "/payments");
  };

  if (cartItems.length === 0) {
    return (
      <Layout title="Shipping">
        <PageHeader title="Shipping details" crumbs={[{ label: "Shipping" }]} />
        <div className="section">
          <div className="container">
            <EmptyState
              icon={MdOutlineShoppingBag}
              title="There's nothing to ship yet"
              description="Add a watch to your cart before entering delivery details."
              action={{ label: "Browse watches", href: "/allProducts" }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shipping">
      <PageHeader
        eyebrow="Checkout"
        title="Shipping details"
        crumbs={[{ label: "Cart", href: "/cartWatch" }, { label: "Shipping" }]}
      />

      <div className="section">
        <div className="container">
          <CheckoutSteps current={1} />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit(submitHandler)}
                noValidate
                className="p-6 card sm:p-8"
              >
                <h2 className="mb-1 text-h4">Delivery address</h2>
                <p className="mb-6 text-sm text-primary-500">
                  Where should we send your order? All fields are required.
                </p>

                <div className="grid gap-x-5 sm:grid-cols-2">
                  {FIELDS.map((field) => (
                    <Field
                      key={field.name}
                      label={field.label}
                      hint={field.hint}
                      error={errors[field.name]?.message}
                      required
                      className={field.full ? "sm:col-span-2" : ""}
                    >
                      {(id, describedBy, invalid) => (
                        <input
                          id={id}
                          type={field.type || "text"}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          aria-describedby={describedBy}
                          aria-invalid={invalid}
                          className={inputClass(invalid)}
                          {...register(field.name, field.rules)}
                        />
                      )}
                    </Field>
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Continue to payment
                  <MdArrowForward className="w-5 h-5" aria-hidden="true" />
                </Button>
              </form>
            </div>

            <div className="lg:col-span-4">
              <OrderSummary cartItems={cartItems} showItems />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
