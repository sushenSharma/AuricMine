import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "./styles.css";

const formatId = (label) => {
  return label && label.toLowerCase().replaceAll(" ", "-");
};

const InputPhoneNumber = (props) => {
  const { fieldConfigs, value, id, onChange } = props;
  const {
    label,
    placeHolder,
    disabled,
    defaultCountry,
    countryOptions = [],
    variant,
    autoComplete = "off",
    withCountryCode = true,
    countryCallingCodeEditable = true,
    international = true,
    className,
    onCountryChange,
  } = fieldConfigs;

  return (
    <PhoneInput
      placeholder={placeHolder}
      label={label}
      variant={variant}
      id={formatId(label)}
      className={`${
        withCountryCode
          ? className + " tj-phone-number-input"
          : className +
            " tj-phone-number-input tj-phone-number-input-without-country"
      }`}
      international={international}
      defaultCountry={defaultCountry}
      countryCallingCodeEditable={countryCallingCodeEditable}
      value={value}
      autoComplete={autoComplete}
      onChange={(number) => {
        if (number) {
          onChange(number, id);
        }
        if (number === undefined && !countryCallingCodeEditable) {
          onChange("", id);
        }
      }}
      onCountryChange={(country) => {
        if (country !== undefined) {
          const callingCode = getCountryCallingCode(country);
          if (onCountryChange) {
            onCountryChange(callingCode, id);
          }
        } else {
          if (onCountryChange) {
            onCountryChange("", id);
          }
        }
      }}
      countries={countryOptions}
      disabled={disabled}
    />
  );
};

export default InputPhoneNumber;
