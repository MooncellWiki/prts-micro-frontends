import { StateUpdater, useState } from "preact/hooks";

interface props {
  langSet: Set<string>;
  selected: number;
  onChange: StateUpdater<number>;
}

export function VoiceLangSelector({ langSet, selected, onChange }: props) {
  return (
    <div class="flex justify-start my-1 text-white text-sm text-center font-bold leading-6">
      {Array.from(langSet).map((v, i) => (
        <div
          key={i}
          class={`px-4 py-2 font-semibold text-sm ${
            selected == i ? "bg-ooui-primary text-white" : "bg-white text-black"
          } border border-solid border-divider rounded-none shadow-sm`}
          style="appearance:button;cursor:pointer;font-family:inherit;"
          onClick={() => onChange(i)}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
