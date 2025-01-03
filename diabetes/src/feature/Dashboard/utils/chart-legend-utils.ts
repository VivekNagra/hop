export const getColorForGradient = (
  color: string,
  customColors?: Array<{ [key: string]: string }>,
) => {
  if (color && customColors && Array.isArray(customColors)) {
    for (const mappings of customColors) {
      for (const key in mappings) {
        if (color === key) {
          return mappings[key];
        }
      }
    }
  }

  return color;
};
