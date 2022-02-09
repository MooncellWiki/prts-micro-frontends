import { useEffect, useState } from "preact/hooks";
import { VoiceWordSelector } from "./VoiceWordSelector";
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

export function VoiceMobile({
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
      <VoiceWordSelector
        langSet={langSet}
        selected={selectedWordLang}
        onChange={setSelectedWordLang}
      />
      <div class="bg-wikitable border-collapse max-w-full border border-solid border-divider rounded shadow overflow-hidden">
        {Array.from(voiceData).map((ele) => (
          <div>
            <div class="text-center font-bold p-1 !bg-table border border-solid border-divider align-middle truncate">
              {ele.title}
            </div>
            <div class="flex">
              <div class="w-4/5 p-2 border border-solid border-divider align-middle">
                {selectedWordLang.map((v) => (
                  <p
                    lang={Array.from(langSet).at(v) == "日文" ? "ja" : ""}
                    dangerouslySetInnerHTML={{
                      __html: ele.detail[Array.from(langSet).at(v) || "中文"],
                    }}
                  ></p>
                ))}
              </div>
              <div class="w-1/5 p-2 border border-solid border-divider align-middle truncate">
                <VoicePlayer
                  key={childKey}
                  voiceId={`${voiceKey}/${ele?.title}`}
                  voicePath={`${
                    voiceBase[Array.from(langSet).at(0) || "中文"]
                  }/${ele?.voiceFilename?.replaceAll(" ", "_")}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
