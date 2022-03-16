/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../common/Layout";
import Accordion from "../components/Faq/Accordion";

const questionsAnswers = [
  {
    question: "How many team members can I invite?",
    answer:
      "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    question: "What is the maximum file upload size?",
    answer:
      "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    question: "How do I reset my password?",
    answer: `Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.`,
  },
  {
    question: "Can I cancel my subscription?",
    answer: `Yes! Send us a message and we’ll process your request no questions asked.`,
  },
  {
    question: "Do you provide additional support?",
    answer: `Chat and email support is available 24/7. Phone lines are open during normal business hours.`,
  },
];

const FAQ = () => {
  return (
    <Layout title="FAQ Page | ECommerce-Website.">
      <div className="faq-page">
        <div className="container faq-page-container">
          <div className="component">
            <div className="illustration">
              <img
                src="https://res.cloudinary.com/medsy/image/upload/v1646937110/illustration-box-desktop_t2ppcn.svg"
                alt="illustration with box"
                className="illustration__box"
              />

              <img
                className="illustration__woman-desktop"
                src="https://res.cloudinary.com/medsy/image/upload/v1646937110/illustration-woman-online-mobile_dsdhgw.svg"
                alt="illustration with woman"
              />
              <img
                className="illustration__woman-mobile"
                src="https://res.cloudinary.com/medsy/image/upload/v1646937110/illustration-woman-online-desktop_rdxxjw.svg"
                alt="illustration with woman"
              />
            </div>
            <Accordion questionsAnswers={questionsAnswers} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
