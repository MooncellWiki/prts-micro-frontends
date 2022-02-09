import { useEffect, useState } from "preact/hooks";
import { VoiceLangSelector } from "./VoiceLangSelector";
import { VoicePlayer } from "./VoicePlayer";

interface props {
  tocTitle: string;
  voiceKey: string;
  voiceData: {
    title?: string;
    index?: string;
    voiceFilename?: string;
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
  const [selectedWordLang, setSelectedWordLang] = useState([0]);
  const [childKey, setChildKey] = useState(1);
  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, [selectedWordLang]);
  return (
    <div>
      <h2>
        <span class="mw-headline">{tocTitle}</span>
      </h2>
      <VoiceLangSelector
        langSet={langSet}
        selected={selectedWordLang}
        onChange={setSelectedWordLang}
      />
      <div class="table bg-wikitable border-collapse max-w-screen-lg border border-solid border-divider rounded shadow overflow-hidden">
        <div class="table-row-group">
          {Array.from(voiceData).map((ele) => (
            <div class="table-row">
              <div class="table-cell text-center font-bold p-1 !bg-table border border-solid border-divider align-middle truncate">
                {ele.title}
              </div>
              <div class="table-cell p-2 inline-block border border-solid border-divider rounded align-middle">
                {selectedWordLang.map((v) => (
                  <p
                    lang={Array.from(langSet).at(v) == "日文" ? "ja" : ""}
                    dangerouslySetInnerHTML={{
                      __html: ele.detail[Array.from(langSet).at(v) || "中文"],
                    }}
                  ></p>
                ))}
              </div>
              <div class="table-cell p-1 border border-solid border-divider rounded align-middle truncate">
                <VoicePlayer
                  key={childKey}
                  voiceId={voiceKey + "/" + ele?.title}
                  voicePath={`${
                    voiceBase[Array.from(langSet).at(0) || "中文"]
                  }/${ele?.voiceFilename?.replaceAll(" ", "_")}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
