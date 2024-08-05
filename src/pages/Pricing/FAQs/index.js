import React from "react";
import { prepareFaqs } from "./faq-utils";
import AccordionWrapper from "../../../components/AccordionWrapper";

import "./styles.css";

const FAQs = () => {
  const faqList = prepareFaqs();

  return (
    <section className="faqs-section-container">
      <AccordionWrapper list={faqList} className="faqs-list-container" />
    </section>
  );
};

export default FAQs;
