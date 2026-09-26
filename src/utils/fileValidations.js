const MB = 1024 * 1024;

export const validateFile = (files, allowedTypes, maxMB) => {
  const file = files?.[0];
  if (!file) return true; // nothing picked, so "required" handles it

  if (!allowedTypes.includes(file.type)) {
    return "This file type is not allowed";
  }

  if (file.size > maxMB * MB) {
    return `File must be smaller than ${maxMB} MB`;
  }

  return true; // valid
};