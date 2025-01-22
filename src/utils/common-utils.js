import { featuresKey } from "../constants";

export const isJSON = (val) => {
  if (typeof val === "string" && val.length > 1) {
    const startChar = val[0];
    const endChar = val[val.length - 1];
    return ["{", "["].includes(startChar) && ["]", "}"].includes(endChar);
  }

  return false;
};

const userLocale = () => {
  return navigator.language.replace("-", "_");
};

export const getParameter = (metaInformation, key) => {
  const parameters = metaInformation.filter((item) => item.name === key);

  if (parameters.length) {
    const localeBasedParameter = parameters.find(
      ({ locale }) => locale === userLocale()
    );

    return (
      localeBasedParameter ||
      parameters.find(({ locale }) => locale === "en_US")
    );
  }

  return null;
};

export const getStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);

  return null;
};

export const getStorageStringItem = (key) => {
  return localStorage.getItem(key);
};

export const removeStorageItem = (items) => {
  if (Array.isArray(items) && items.length) {
    items.forEach((item) => localStorage.removeItem(item));
  } else {
    localStorage.removeItem(items);
  }
};

export const setColSize = (xl, lg, md, sm, xs) => {
  return {
    xl,
    lg,
    md,
    sm,
    xs,
  };
};

export const getActiveUser = () => {
  return getStorageItem("userSession").user;
}

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isIndianUser = () => {
  const date = new Date().toString();
  return date.includes("530") ? true : false
};
