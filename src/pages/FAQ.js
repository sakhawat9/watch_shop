import Link from "next/link";
import { BiHeadphone } from "react-icons/bi";
import ContactAvailable from "../common/ContactAvailable";
import Layout from "../common/Layout";
import Accordion from "../components/Faq/Accordion";
import PageHeader from "../components/ui/PageHeader";

// `id` is an explicit slug rather than the display title. The footer deep-links
// into these sections, and the old ids contained spaces and ampersands
// ("Orders & Shipping"), which made for fragile URL-encoded fragments.
const FAQ_GROUPS = [
  {
    id: "shipping",
    category: "Orders & shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard orders arrive in 3–5 business days within the country and 7–14 business days internationally. You'll get tracking as soon as your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes — we ship to most countries worldwide. Shipping is free on every order, with duties and taxes calculated at checkout where applicable.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Once your order ships you'll receive a tracking link by email, and you can view order status any time from the My Orders page in your account.",
      },
    ],
  },
  {
    id: "returns",
    category: "Returns & warranty",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "You can return any unworn watch within 30 days of delivery for a full refund. Items must be in original condition with all packaging included.",
      },
      {
        question: "Are your watches covered by a warranty?",
        answer:
          "Every watch comes with a 2-year manufacturer warranty covering movement defects and material faults under normal use.",
      },
      {
        question: "What if my watch arrives damaged?",
        answer:
          "Contact our support team within 48 hours of delivery with photos of the damage, and we'll arrange a free replacement or a full refund.",
      },
    ],
  },
  {
    id: "payments",
    category: "Payments & security",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards, processed through Stripe. All transactions are encrypted end-to-end.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. We never store your card details — payments are handled directly by Stripe, a PCI-DSS Level 1 certified provider.",
      },
    ],
  },
  {
    id: "care",
    category: "Product care",
    items: [
      {
        question: "Are your watches water resistant?",
        answer:
          "Water resistance varies by model and is listed on each product page — most everyday pieces are rated to 100m, with dedicated dive watches rated to 200m.",
      },
      {
        question: "How do I care for my watch?",
        answer:
          "Wipe the case and strap with a soft, dry cloth after wear, avoid extreme temperature changes, and have the movement serviced every 3–5 years to keep it running accurately.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <Layout
      title="FAQ"
      description="Answers on shipping, returns, warranty, payments and caring for your watch."
    >
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="Everything you need to know about ordering, shipping, returns and caring for your watch."
        crumbs={[{ label: "FAQ" }]}
      />

      <div className="section section-bg">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="p-6 card lg:sticky lg:top-28">
                <h2 className="mb-4 text-h4">Browse by topic</h2>

                <nav aria-label="FAQ topics" className="flex flex-col gap-1">
                  {FAQ_GROUPS.map((group) => (
                    <a
                      key={group.id}
                      href={`#${group.id}`}
                      className="px-3 py-2 text-sm font-medium transition-colors rounded text-primary-700 hover:bg-gold-50 hover:text-gold-700"
                    >
                      {group.category}
                    </a>
                  ))}
                </nav>

                <div className="flex items-start gap-3 p-4 mt-6 rounded bg-secondary-100">
                  <BiHeadphone
                    className="flex-shrink-0 w-6 h-6 mt-0.5 text-gold-600"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="mb-1 text-sm font-semibold text-primary-900">
                      Still need help?
                    </p>
                    <p className="mb-2 text-sm text-primary-500">
                      Our team is available 24/7.
                    </p>
                    <Link href="/contact" className="text-sm link">
                      Contact support
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <Accordion groups={FAQ_GROUPS} />
            </div>
          </div>
        </div>
      </div>

      <ContactAvailable />
    </Layout>
  );
}
