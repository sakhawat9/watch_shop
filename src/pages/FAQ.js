import Link from "next/link";
import React from "react";
import { BiHeadphone } from "react-icons/bi";
import Layout from "../common/Layout";
import Accordion from "../components/Faq/Accordion";

const FAQ_GROUPS = [
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard orders arrive in 3-5 business days within the country and 7-14 business days for international orders. You'll get tracking as soon as your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes — we ship to most countries worldwide. Shipping is free on every order, with duties and taxes calculated at checkout where applicable.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely. Once your order ships you'll receive a tracking link by email, and you can also view order status any time from your account page.",
      },
    ],
  },
  {
    category: "Returns & Warranty",
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
          "Contact our support team within 48 hours of delivery with photos of the damage, and we'll arrange a free replacement or full refund.",
      },
    ],
  },
  {
    category: "Payments & Security",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards through Stripe, along with PayPal. All transactions are encrypted end-to-end.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. We never store your card details ourselves — payments are processed directly by Stripe, a PCI-DSS Level 1 certified provider.",
      },
    ],
  },
  {
    category: "Product Care",
    items: [
      {
        question: "Are your watches water resistant?",
        answer:
          "Water resistance varies by model and is listed on each product page — most everyday pieces are rated to 100m, with dedicated dive watches rated to 200m.",
      },
      {
        question: "How do I care for my watch?",
        answer:
          "Wipe the case and strap with a soft, dry cloth after wear, avoid extreme temperature changes, and have the movement serviced every 3-5 years to keep it running accurately.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout title="FAQ | Watch_Shop">
      <div className="bg-secondary-200">
        {/* Hero */}
        <div className="bg-primary-600">
          <div className="container py-16 mx-auto text-center md:py-24">
            <p className="mb-2 text-sm font-semibold tracking-widest uppercase text-gold-400">
              Support
            </p>
            <h1 className="mb-3 text-3xl text-white md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="max-w-xl mx-auto text-secondary-400">
              Everything you need to know about ordering, shipping, returns,
              and caring for your watch.
            </p>
          </div>
        </div>

        <div className="container py-16 mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sticky quick-nav */}
            <aside className="lg:col-span-4">
              <div className="p-6 bg-white rounded-lg shadow-sm lg:sticky lg:top-24">
                <h2 className="mb-4 text-lg">Browse by topic</h2>
                <nav className="flex flex-col gap-2">
                  {FAQ_GROUPS.map((group) => (
                    <a
                      key={group.category}
                      href={`#${group.category}`}
                      className="px-3 py-2 text-sm font-medium rounded text-primary-500 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                    >
                      {group.category}
                    </a>
                  ))}
                </nav>
                <div className="flex items-start gap-3 p-4 mt-6 rounded bg-secondary-200">
                  <BiHeadphone className="flex-shrink-0 w-6 h-6 mt-0.5 text-gold-600" />
                  <div>
                    <p className="mb-1 text-sm font-semibold text-primary-600">
                      Still need help?
                    </p>
                    <p className="mb-2 text-sm text-gray-600">
                      Our team is here 24/7.
                    </p>
                    <Link
                      href="/contact"
                      className="text-sm font-semibold text-gold-600 hover:underline"
                    >
                      Contact support &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Accordion groups */}
            <div className="lg:col-span-8">
              <Accordion groups={FAQ_GROUPS} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
