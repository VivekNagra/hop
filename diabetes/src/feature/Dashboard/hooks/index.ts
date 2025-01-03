export const highestSeriesValue = <T extends Record<string, unknown>>({
  data,
  keys,
}: {
  data: T[];
  keys: string[];
}) => {
  const maxValues = keys.map((key) => {
    return Math.max(
      ...data.map((item) => {
        const value = item[key as keyof T];
        return typeof value === 'number' ? value : -Infinity;
      }),
    );
  });

  return Math.ceil(Math.max(...maxValues));
};
