import Link from "next/link";
import { MdCheck } from "react-icons/md";

const STEPS = [
  { label: "Cart", href: "/cartWatch" },
  { label: "Shipping", href: "/shipping" },
  { label: "Payment", href: "/payments" },
];

/**
 * Checkout progress indicator.
 *
 * The original flow gave no sense of place at all — the cart linked straight
 * to /shipping, which linked to /payments, with nothing telling you how many
 * steps remained. Completed steps link back so a visitor can correct an
 * address without restarting; upcoming steps are inert.
 */
export default function CheckoutSteps({ current = 0 }) {
  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((step, index) => {
          const complete = index < current;
          const active = index === current;

          const marker = (
            <>
              <span
                aria-hidden="true"
                className={`flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full border transition-colors ${
                  complete
                    ? "bg-gold-600 border-gold-600 text-white"
                    : active
                      ? "bg-primary-900 border-primary-900 text-white"
                      : "bg-white border-secondary-400 text-primary-400"
                }`}
              >
                {complete ? <MdCheck className="w-4 h-4" /> : index + 1}
              </span>
              <span
                className={`text-sm font-medium ${
                  active ? "text-primary-900" : "text-primary-500"
                }`}
              >
                {step.label}
              </span>
            </>
          );

          return (
            <li key={step.label} className="flex items-center gap-2 sm:gap-4">
              {complete ? (
                <Link
                  href={step.href}
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  {marker}
                  <span className="sr-only">(completed, go back)</span>
                </Link>
              ) : (
                <span
                  className="flex items-center gap-2"
                  aria-current={active ? "step" : undefined}
                >
                  {marker}
                </span>
              )}

              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`w-6 sm:w-12 h-px ${
                    complete ? "bg-gold-600" : "bg-secondary-400"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
