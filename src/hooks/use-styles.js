import { getParameter } from "../utils/common-utils";
import { defaults } from "../utils/defaults";
import { styles } from "../utils/metadata";

export const useStyles = (keys) => {
  const stylesData = {};
  const stylesInformation = styles();

  keys.forEach((key) => {
    let styleInfo = getParameter(stylesInformation, key);

    let data = styleInfo
      ? styleInfo.values.length === 1
        ? styleInfo.values[0]
        : styleInfo.values
      : defaults[key];

    stylesData[key] = data;
  });

  return stylesData;
};

export const getStyle = (key) => {
  const stylesInformation = styles();
  const styleInfo = getParameter(stylesInformation, key);

  return styleInfo
    ? styleInfo.values.length === 1
      ? styleInfo.values[0]
      : styleInfo.values
    : defaults[key];
};
