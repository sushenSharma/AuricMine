import { FormControl, TextField } from "@mui/material";
import { formatId } from "../form-factory-utils";

const InputNumber = ({ fieldConfigs, value, id, onChange }) => {
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
          label={!hiddenLabel ? label : ""}
          type="number"
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
        />
      </FormControl>
    </div>
  );
};

export default InputNumber;
