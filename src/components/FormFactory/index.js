import React from "react";
import formElements from "./formElements";
import "./styles.css";

const FormFactory = ({
  formElementsTypes,
  onChangeHandler,
  errors,
  className,
}) => {
  const elements = [];
  for (let element in formElementsTypes) {
    const formElement = {
      id: element,
      data: formElementsTypes[element],
    };

    const fields = formElements(formElement, onChangeHandler, errors);

    if (!formElementsTypes[element].hiddenField) {
      elements.push(fields);
    }
  }

  return <div className={`form-elements ${className}`}>{elements}</div>;
};

export default FormFactory;
