import React from "react";
import { prepareFaqs } from "./faq-utils";
import AccordionWrapper from "../../../components/AccordionWrapper";

const FAQs = () => {
  const faqList = prepareFaqs();
  console.log("faqList", faqList);
  return <AccordionWrapper list={faqList} className="faqs-list-container" />;
};

export default FAQs;
