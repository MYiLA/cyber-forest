export const dateFormatter = (date: string) => {
  return date.split('.')[0].replaceAll('-', '/').replace('T', ', ')
}
