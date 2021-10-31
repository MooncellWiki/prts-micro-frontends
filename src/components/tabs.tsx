import { Divider } from "./divider";
import { ComponentChildren } from "preact";
interface tabProps {
  label: string;
  selected: boolean;
  onChange: () => void;
}
export function Tab({ selected, label, onChange }: tabProps) {
  return (
    <div class="max-w-360px flex-grow" onClick={onChange}>
      <div
        class={`text-center py-12px px-8px ${
          selected ? "text-primary-main" : ""
        }`}
      >
        {label}
      </div>
      <div class={`h-2px w-full ${selected ? "bg-primary-main" : ""}`} />
    </div>
  );
}
interface tabsProps {
  labels: Array<string>;
  onChange: (index: number) => void;
  selected: number;
  classes?: string;
}
export function Tabs({ labels, onChange, selected, classes }: tabsProps) {
  return (
    <>
      <div class={`flex ${classes}`}>
        {labels.map((v, i) => (
          <Tab
            key={v}
            label={v}
            selected={selected === i}
            onChange={() => {
              onChange(i);
            }}
          />
        ))}
      </div>
      <Divider />
    </>
  );
}
