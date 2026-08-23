import { BiHeadphone, BiLock, BiPackage, BiRefresh } from "react-icons/bi";

const FEATURES = [
  {
    icon: BiPackage,
    title: "Free insured shipping",
    description: "Every order ships free and fully insured, with no minimum spend.",
  },
  {
    icon: BiRefresh,
    title: "30-day returns",
    description: "Not the right fit? Send it back within 30 days at no cost.",
  },
  {
    icon: BiLock,
    title: "Secure checkout",
    description: "Card details are handled by Stripe and never stored by us.",
  },
  {
    icon: BiHeadphone,
    title: "Support that answers",
    description: "Real people, available before you buy and long after.",
  },
];

/**
 * Trust strip. Deliberately quiet — a plain bordered row rather than four
 * shadowed cards, so it supports the products instead of competing with them.
 */
export default function ContactAvailable({ className = "" }) {
  return (
    <section
      aria-label="Why shop with us"
      className={`border-t border-secondary-300 bg-secondary-50 ${className}`}
    >
      <div className="container py-12 lg:py-14">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4">
              <span className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full bg-gold-100 text-gold-700">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1 text-base font-semibold font-sans text-primary-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-500">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
