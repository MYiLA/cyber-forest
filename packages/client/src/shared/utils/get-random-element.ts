export const getRandomElement = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];
