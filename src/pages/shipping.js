import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../common/Layout";
import Title from "../common/Title";
import { Store } from "../utils/Store";

const SHIPPING_FIELDS = [
  { name: "phone", label: "Phone", placeholder: "Phone" },
  { name: "address", label: "Address", placeholder: "Address" },
  { name: "city", label: "City", placeholder: "City" },
  { name: "postalCode", label: "Postal Code", placeholder: "Postal Code" },
  { name: "country", label: "Country", placeholder: "Country" },
];

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
      return;
    }
    SHIPPING_FIELDS.forEach(({ name }) => {
      if (shippingAddress?.[name] !== undefined) {
        setValue(name, shippingAddress[name]);
      }
    });
    // Prefill and the auth guard only need to run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (values) => {
    // The reducer persists the `shippingAddress` cookie, so no duplicate write here.
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: values });
    router.push(redirect || "/payments");
  };

  return (
    <Layout title="Shipping Page | ECommerce-Website.">
      <div className="shipping">
        <div className="shipping__wrapper">
          <Title
            title="Shipping Address"
            subtitle="select your shipping address"
            description=""
          />
          <form
            className="shipping__form"
            onSubmit={handleSubmit(submitHandler)}
          >
            {SHIPPING_FIELDS.map(({ name, label, placeholder }) => (
              <label key={name}>
                <span className="shipping__form__title">{label}</span>
                <span className="block">
                  <input
                    type="text"
                    {...register(name, {
                      required: {
                        value: true,
                        message: `You must enter ${label.toLowerCase()}`,
                      },
                    })}
                    className={errors[name] ? "ring-1 ring-red-500" : undefined}
                    placeholder={placeholder}
                    aria-invalid={errors[name] ? "true" : "false"}
                  />
                  <span className="py-2 text-sm text-red-400">
                    {errors?.[name]?.message}
                  </span>
                </span>
              </label>
            ))}

            <div className="mt-4 form-element ">
              <span className="block w-full mx-auto ">
                <input type="submit" className="btn-brand" value="Continue" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
