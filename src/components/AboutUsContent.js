import Image from "next/image";
import { BiPackage, BiShieldQuarter, BiTimeFive } from "react-icons/bi";
import SectionHeading from "./ui/SectionHeading";

const PILLARS = [
  {
    icon: BiShieldQuarter,
    title: "2-year warranty",
    description:
      "Every watch is covered by a full manufacturer warranty against movement defects and material faults under normal use.",
  },
  {
    icon: BiPackage,
    title: "Free worldwide shipping",
    description:
      "Orders ship free and fully insured, in protective packaging, wherever you are in the world.",
  },
  {
    icon: BiTimeFive,
    title: "Curated collections",
    description:
      "Every piece in the catalogue is selected for craftsmanship, so you're never choosing between style and quality.",
  },
];

/**
 * About page content.
 *
 * The original laid an 8/4 grid with the copy squeezed under two images and a
 * feature list whose text clipped mid-sentence at the container edge. This
 * gives the story its own readable measure and lets the pillars breathe in a
 * three-up row underneath.
 */
export default function AboutUsContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden aspect-[3/4] rounded-card mt-8">
                <Image
                  src="https://res.cloudinary.com/medsy/image/upload/v1650326168/aboutus_2_rwht5l.jpg"
                  alt="The Watch_Shop team reviewing a new collection"
                  fill
                  sizes="(max-width: 1024px) 45vw, 24vw"
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden aspect-[3/4] rounded-card">
                <Image
                  src="https://res.cloudinary.com/medsy/image/upload/v1650326449/aboutus_lcdeef.jpg"
                  alt="The Watch_Shop team at work"
                  fill
                  sizes="(max-width: 1024px) 45vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 eyebrow">Our story</p>
              <h1 className="mb-5">
                A watch should be worn for years, not seasons
              </h1>

              <div className="space-y-4 text-primary-600 max-w-prose">
                <p className="text-lg leading-relaxed text-primary-700">
                  Watch_Shop started with a simple idea: a quality timepiece
                  shouldn&apos;t require a luxury markup.
                </p>
                <p>
                  We work directly with manufacturers to source watches with
                  genuine craftsmanship — precise movements, durable cases, and
                  finishes that hold up to daily wear — then pass the savings on
                  rather than spending them on a name.
                </p>
                <p>
                  Every order is inspected before it ships, and our support team
                  is here for the life of your watch, not just the sale. If a
                  piece isn&apos;t right, you have 30 days to send it back, free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <SectionHeading
            eyebrow="What you get"
            title="How we back every order"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 bg-white card-pad card">
                <span className="flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-gold-100 text-gold-700">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-h4">{title}</h3>
                <p className="text-sm leading-relaxed text-primary-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
