import React from "react";
import { BiPackage, BiShieldQuarter, BiTimeFive } from "react-icons/bi";
import Image from "next/image";
import Title from "../common/Title";

const FEATURES = [
  {
    icon: BiShieldQuarter,
    title: "2-Year Warranty",
    description:
      "Every watch we sell is covered by a full manufacturer warranty against defects, so you can buy with confidence.",
  },
  {
    icon: BiPackage,
    title: "Free Worldwide Shipping",
    description:
      "Orders ship free, fully insured, in protective packaging — wherever you are in the world.",
  },
  {
    icon: BiTimeFive,
    title: "Curated Collections",
    description:
      "Every piece in our catalog is hand-selected for craftsmanship, so you're never choosing between style and quality.",
  },
];

const AboutUsContent = () => {
  return (
    <div className="about-us">
      <div className="about-us__content">
        <Title title="About Us" subtitle="Our story" />
        <div className="about-us__content__wrapper">
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-8 col-span-12">
              <div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="sm:col-span-6 col-span-12 relative aspect-[4/3]">
                    <Image
                      src="https://res.cloudinary.com/medsy/image/upload/v1650326168/aboutus_2_rwht5l.jpg"
                      alt="Our team reviewing a new collection"
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12 relative aspect-[4/3]">
                    <Image
                      src="https://res.cloudinary.com/medsy/image/upload/v1650326449/aboutus_lcdeef.jpg"
                      alt="Our team at work"
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                </div>
                <h4 className="about-us__content__subtitle">
                  We believe a watch should be worn for years, not seasons —
                  so every piece we sell is built to last and backed by a
                  team that stands behind it.
                </h4>
                <p className="about-us__content__description">
                  Watch_Shop started with a simple idea: quality timepieces
                  shouldn&apos;t require a luxury markup. We work directly
                  with manufacturers to source watches with genuine
                  craftsmanship — precise movements, durable cases, and
                  finishes that hold up to daily wear — then pass the savings
                  on to you. Every order is inspected before it ships, and
                  our support team is here for the life of your watch, not
                  just the sale.
                </p>
              </div>
            </div>
            <div className="md:col-span-4 col-span-12">
              <div className="p-4">
                {FEATURES.map(({ icon: Icon, title, description }) => (
                  <div className="mb-12" key={title}>
                    <div className="flex gap-6 items-center mb-5">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-50 text-gold-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                    </div>
                    <p className="text-gray-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
