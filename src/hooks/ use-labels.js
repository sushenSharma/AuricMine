import { getParameter } from "../utils/common-utils";
import { defaults } from "../utils/defaults";
import { labels } from "../utils/metadata";

export const getLabels = (keys) => {
  const labelsData = {};
  const labelInformations = labels();

  keys.forEach((key) => {
    let labelInfo = getParameter(labelInformations, key);

    let data = labelInfo
      ? labelInfo.values.length === 1
        ? labelInfo.values[0]
        : labelInfo.values
      : defaults[key];

    labelsData[key] = data;
  });

  return labelsData;
};

export const useLabels = (keys) => {
  return getLabels(keys);
};

export const getLabel = (key) => {
  const labelData = labels();
  const labelInfo = getParameter(labelData, key);

  return labelInfo
    ? labelInfo.values.length === 1
      ? labelInfo.values[0]
      : labelInfo.values
    : defaults[key];
};
