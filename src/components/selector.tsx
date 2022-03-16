interface props {
  options: Array<Record<string, any>>;
  id: string;
  label: string;
  onChange: (value: string) => void;
  valueField?: string;
  labelField?: string;
}

export function Selector({
  options,
  onChange,
  id,
  label,
  valueField = "value",
  labelField = "label",
}: props) {
  return (
    <div class="my-4">
      <label
        for={id}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <select
        id={id}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
        style="appearance:none;-webkit-print-color-adjust: exact;background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyMCAyMCc+PHBhdGggc3Ryb2tlPScjNkI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdtNiA4IDQgNCA0LTQnLz48L3N2Zz4=);background-position: right .5rem center;background-repeat: no-repeat;background-size: 1.5em 1.5em;color-adjust: exact;padding-right: 2.5rem"
        onChange={(e) => onChange((e?.target as HTMLSelectElement).value)}
      >
        {options.map((o) => (
          <option value={o[valueField]} key={o[valueField]}>
            {o[labelField]}
          </option>
        ))}
      </select>
    </div>
  );
}
