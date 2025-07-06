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

export const getStorageItem = (key, fallbackValue = null) => {
  try {
    const item = localStorage.getItem(key);

    if (!item || item === "undefined" || item === "null") {
      // Clean up corrupt value
      localStorage.removeItem(key);
      if (fallbackValue !== null) {
        localStorage.setItem(key, JSON.stringify(fallbackValue));
        return fallbackValue;
      }
      return null;
    }

    return JSON.parse(item);
  } catch (e) {
    console.warn(`Corrupt localStorage value for "${key}", resetting...`, e);
    localStorage.removeItem(key);
    if (fallbackValue !== null) {
      localStorage.setItem(key, JSON.stringify(fallbackValue));
      return fallbackValue;
    }
    return null;
  }
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
  const userSession = getStorageItem("userSession");
  return userSession?.user || null;
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isIndianUser = () => {
  const date = new Date().toString();
  return date.includes("530") ? true : false;
};
