import { DiceSideWarrior } from "../type";

export const isWarriorDiceSide = (obj: unknown): obj is DiceSideWarrior =>
  typeof obj === "object" &&
  obj !== null &&
  "image" in obj &&
  obj.image !== undefined;
