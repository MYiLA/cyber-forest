import { useGuideContext } from "../context";
import { GuidesVars } from "../types";
import { Glory } from "./glory";
import { Energy } from "./energy";
import { Warriors } from "./warriors";
import { Zone } from "./zone";
import { Hiring } from "./hiring";

export function Guides() {
  const { step } = useGuideContext();
  return (
    <aside style={{ height: "100%" }}>
      {step === GuidesVars.Glory && <Glory />}
      {step === GuidesVars.Energy && <Energy />}
      {step === GuidesVars.Warriors && <Warriors />}
      {step === GuidesVars.Zone && <Zone />}
      {step === GuidesVars.Hiring && <Hiring />}
    </aside>
  );
}
