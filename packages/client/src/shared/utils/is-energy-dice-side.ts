import { DiceSideEnergy } from "../type";

export const isEnergyDiceSide = (obj: unknown): obj is DiceSideEnergy =>
  typeof obj === "object" &&
  obj !== null &&
  "energyCount" in obj &&
  obj?.energyCount !== undefined;
