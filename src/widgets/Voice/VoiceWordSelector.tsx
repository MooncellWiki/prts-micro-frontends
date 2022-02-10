interface props {
  langSet: Set<string>;
  selected: number[];
  onChange: (arg0: number[]) => void;
}

export function VoiceWordSelector({ langSet, selected, onChange }: props) {
  return (
    <div>
      <label
        for="voice-word-selector"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        选择显示文本语言
      </label>
      <div
        id="voice-word-selector"
        class="flex justify-start my-1 text-white text-sm text-center font-bold leading-6"
      >
        {Array.from(langSet).map((v, i) => (
          <div
            key={i}
            class={`px-4 py-2 font-semibold text-sm ${
              selected.indexOf(i) !== -1
                ? "bg-ooui-primary text-white"
                : "bg-white text-black"
            } border border-solid border-divider rounded-none shadow-sm`}
            style="appearance:button;cursor:pointer;font-family:inherit;"
            onClick={() => {
              onChange(
                selected.indexOf(i) !== -1
                  ? selected.filter((v) => v !== i)
                  : [...selected, i]
              );
            }}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
