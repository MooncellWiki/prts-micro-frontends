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
        class={`text-center py-12px px-8px ${selected ? "text-primary" : ""}`}
      >
        {label}
      </div>
      <div class={`h-2px w-full ${selected ? "bg-primary" : ""}`} />
    </div>
  );
}
interface tabsProps {
  labels: Array<string>;
  onChange: (index: number) => void;
  selected: number;
  children: ComponentChildren;
  classes? :string
}
export function Tabs({ labels, onChange, selected, children, classes }: tabsProps) {
  return (
    <div>
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
      {children}
    </div>
  );
}
