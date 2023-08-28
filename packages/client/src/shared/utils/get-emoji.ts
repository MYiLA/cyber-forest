import { Emoji } from "../constants";

export const getEmoji = (emoji: string): unknown => {
  let result = Emoji.ThumbsUp;
  Object.values(Emoji).forEach((item) => {
    if (item === emoji) {
      result = item;
    }
  });
  return result;
};
