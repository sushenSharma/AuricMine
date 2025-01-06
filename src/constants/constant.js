import {featuresKey, userIdKey } from "../constants.js";
export const userUUID = localStorage.getItem(userIdKey);
export const features = localStorage.getItem(featuresKey);