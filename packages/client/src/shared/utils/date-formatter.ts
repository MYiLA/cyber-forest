export const dateFormatter = (date: string) => {
  const d = new Date(date);

  return d.toLocaleString("ru").replaceAll(".", "/");
};
