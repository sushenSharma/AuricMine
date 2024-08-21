import React, { Fragment } from "react";
import InputNumber from "./InputNumber";
import InputString from "./InputString";
import Notification from "../Notification";
import InputPhoneNumber from "./InputPhoneNumber";

const formElements = ({ id, data }, onChangeHandler, errors) => {
  const { elementConfigs, value } = data;
  const { type, label, className, helperText, containerClass } = elementConfigs;

  let element = null;

  switch (type) {
    case "label":
      element = (
        <div>
          {label && <div className={`text-base ${className}`}> {label}</div>}
        </div>
      );
      break;
    case "string":
      element = (
        <InputString
          fieldConfigs={elementConfigs}
          value={value}
          id={id}
          onChange={onChangeHandler}
        />
      );
      break;

    case "number":
      element = (
        <InputNumber
          fieldConfigs={elementConfigs}
          value={value}
          id={id}
          onChange={onChangeHandler}
        />
      );

      break;

    case "phone":
      element = (
        <InputPhoneNumber
          fieldConfigs={elementConfigs}
          value={value}
          id={id}
          onChange={onChangeHandler}
        />
      );
      break;

    default:
      return null;
  }

  return (
    <div key={id} className={`form-element-container ${containerClass || ""}`}>
      {element}
      {errors && (
        <Fragment>
          {errors[id] && (
            <Notification type="required" message={errors[id]} image={false} />
          )}
          {!errors[id] && <Notification message={helperText} />}
        </Fragment>
      )}
    </div>
  );
};

export default formElements;
