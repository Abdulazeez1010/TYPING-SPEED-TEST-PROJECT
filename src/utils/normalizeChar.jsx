
export const normalizeChar = (char) => {
  return char
    .replace("—", "-")
    .replace("’", "'")
    .replace(/[“”]/g, '"');
};
