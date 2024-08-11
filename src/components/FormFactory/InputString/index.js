import { formatId } from "../form-factory-utils";
import { FormControl, TextField } from "@mui/material";

const InputString = ({ fieldConfigs, value, id, onChange }) => {
  const {
    itemClass,
    label,
    name,
    placeHolder,
    required,
    fieldLabel,
    disabled,
    styleProps = {},
    autoComplete = "off",
    inlineLabelField,
    variant,
    maxLength,
    hiddenLabel = false,
    restrictNumbers = false,
    preventSpace,
  } = fieldConfigs;

  const styles = {
    style: { ...styleProps },
  };

  const labelFocusedStyle = {
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
    "& .MuiInputLabel-root.MuiFormLabel-filled": { color: "#ffffff" },
    "& .MuiInputBase-root.MuiFilledInput-root::after": {
      border: 0,
    },
  };

  const handleKeyDown = (event) => {
    const input = event.target;
    if (restrictNumbers && event.key >= "0" && event.key <= "9") {
      event.preventDefault();
    }

    if (preventSpace && event.code === "Space") {
      event.preventDefault();
    }

    if (!input.value.length && event.code === "Space") {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`input-item-container${itemClass ? ` ${itemClass}` : ""}${
        inlineLabelField ? " input-inline-label-field" : ""
      }${disabled ? " disabled-input-item-container" : ""}`}
    >
      {fieldLabel && (
        <label>
          {fieldLabel}
          {required && <span className="required-field">*</span>}
        </label>
      )}

      <FormControl className="form-control-element">
        <TextField
          hiddenLabel
          type="string"
          label={!hiddenLabel ? label : ""}
          name={name}
          className="form-input-element form-string-element"
          size="medium"
          onChange={(e) => onChange(e.target.value, id)}
          value={value}
          id={formatId(label)}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeHolder}
          variant={variant}
          inputProps={{
            ...styles,
            maxLength,
          }}
          sx={labelFocusedStyle}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
    </div>
  );
};

export default InputString;
