import cn from "classnames";
import { NavigationButton } from "./navigation-button";
import { useGuideContext } from "../../context";
import { GuidesVars } from "../../types";

type Props = {
  className?: string;
};
export function Navigation(props: Props) {
  const { className } = props;
  const { step, setStep } = useGuideContext();
  const handleClick = (val: GuidesVars) => () => {
    setStep(val);
  };
  return (
    <nav className={cn(className)}>
      <NavigationButton
        text="Найм"
        onClick={handleClick(GuidesVars.Hiring)}
        isActive={step === GuidesVars.Hiring}
      />
      <NavigationButton
        text="Зона"
        onClick={handleClick(GuidesVars.Zone)}
        isActive={step === GuidesVars.Zone}
      />
      <NavigationButton
        text="Воины"
        onClick={handleClick(GuidesVars.Warriors)}
        isActive={step === GuidesVars.Warriors}
      />
      <NavigationButton
        text="Энергия"
        onClick={handleClick(GuidesVars.Energy)}
        isActive={step === GuidesVars.Energy}
      />
      <NavigationButton
        text="Слава"
        onClick={handleClick(GuidesVars.Glory)}
        isActive={step === GuidesVars.Glory}
      />
    </nav>
  );
}
