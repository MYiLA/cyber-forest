export const dateFormatter = (date: string) =>
  date.split(".")[0].replaceAll("-", "/").replace("T", ", ");
