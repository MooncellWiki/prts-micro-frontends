import { useEffect, useState } from "preact/hooks";
import { VoiceLangSelector } from "./VoiceLangSelector";
import { VoicePlayer } from "./VoicePlayer";

interface props {
  tocTitle: string;
  voiceKey: string;
  voiceData: {
    title: string | undefined;
    index: string | undefined;
    voiceFilename: string | undefined;
    detail: {
      [index: string]: string;
    };
  }[];
  langSet: Set<string>;
  voiceBase: {
    [index: string]: string;
  };
}

export function Voice({
  tocTitle,
  voiceKey,
  voiceData,
  langSet,
  voiceBase,
}: props) {
  const [selected, setSelected] = useState(0);
  const [childKey, setChildKey] = useState(1);
  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, [selected]);
  return (
    <div>
      <h2>
        <span class="mw-headline">{tocTitle}</span>
      </h2>
      <VoiceLangSelector
        langSet={langSet}
        selected={selected}
        onChange={setSelected}
      />
      <div class="table bg-wikitable border-collapse max-w-screen-lg border border-solid border-divider rounded shadow overflow-hidden">
        <div class="table-row-group">
          {Array.from(voiceData).map((ele) => (
            <div class="table-row">
              <div class="table-cell text-center font-bold p-1 !bg-table border border-solid border-divider align-middle truncate">
                {ele.title}
              </div>
              <div
                class="table-cell px-2 py-2 inline-block border border-solid border-divider rounded align-middle"
                dangerouslySetInnerHTML={{
                  __html:
                    ele.detail[Array.from(langSet).at(selected) || "中文"],
                }}
              />
              <div class="table-cell p-1 border border-solid border-divider rounded align-middle truncate">
                <VoicePlayer
                  key={childKey}
                  voiceId={voiceKey + "/" + ele?.title}
                  voicePath={`${
                    voiceBase[Array.from(langSet).at(selected) || "中文"]
                  }/${ele?.voiceFilename?.replace(" ", "_")}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
