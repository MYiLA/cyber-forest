import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { GuidesVars } from "../types";

type GuideContext = {
  step: GuidesVars;
  setStep: (value: GuidesVars) => void;
};

const context = createContext<null | GuideContext>(null);

export const useGuideContext = () => {
  const value = useContext(context);
  if (!value) {
    throw new Error("Guide context not provided");
  }
  return value;
};

type Props = {
  children: ReactNode;
};

export function GuideProvider({ children }: Props) {
  const [step, setStep] = useState(GuidesVars.Glory);
  const value = useMemo(() => ({ step, setStep }), [step, setStep]);
  return <context.Provider value={value}>{children}</context.Provider>;
}
