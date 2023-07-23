import { DiceSideSymbol } from "../type";

export const isSymbolDiceSide = (obj: unknown): obj is DiceSideSymbol =>
  typeof obj === "object" &&
  obj !== null &&
  "specialAbilitySymbol" in obj &&
  obj?.specialAbilitySymbol !== undefined;
