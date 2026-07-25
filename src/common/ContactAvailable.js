import React from "react";
import { BiHeadphone, BiLock, BiPackage, BiRefresh } from "react-icons/bi";
import Title from "./Title";

const FEATURES = [
  {
    icon: BiPackage,
    title: "Free Shipping",
    description: "Free, insured delivery on every order — no minimum.",
  },
  {
    icon: BiRefresh,
    title: "30-Day Returns",
    description: "Not the right fit? Send it back within 30 days, free.",
  },
  {
    icon: BiLock,
    title: "Secure Payment",
    description: "Checkout is encrypted end-to-end, every time.",
  },
  {
    icon: BiHeadphone,
    title: "24/7 Support",
    description: "Real people, ready to help before and after you buy.",
  },
];

const ContactAvailable = () => {
  return (
    <section className="section-padding section-bg">
      <div className="container mx-auto">
        <Title
          title="Why Shop With Us"
          subtitle="Our promise"
          description=""
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 p-6 text-center bg-white rounded shadow-sm"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 text-gold-600">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="mb-0 text-lg">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactAvailable;
