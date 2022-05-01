/* eslint-disable react/no-danger */
import { useEffect, useState } from "preact/hooks";
import { VoiceWordSelector } from "./VoiceWordSelector";
import { VoicePlayer } from "./VoicePlayer";
import { Selector } from "../../components/selector";
interface props {
  tocTitle: string;
  voiceKey: string;
  voiceData: {
    title?: string;
    index?: string;
    voiceFilename?: string;
    cond?: string;
    detail: {
      [index: string]: string;
    };
  }[];
  langSet: Set<string>;
  voiceBase: Array<{ lang: string; path: string }>;
}

export function VoiceMobile({
  tocTitle,
  voiceKey,
  voiceData,
  langSet,
  voiceBase,
}: props) {
  const [selectedWordLang, setSelectedWordLang] = useState([0]);
  const [selectedVoicePath, setSelectedVoicePath] = useState(voiceBase[0].path);
  const isSimplified =
    decodeURIComponent(window.location.href).indexOf("/语音") === -1;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [childKey, setChildKey] = useState(1);
  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, [selectedVoicePath]);
  return (
    <div class="max-w-full">
      <div class={isSimplified ? "hidden" : ""}>
        <VoiceWordSelector
          langSet={langSet}
          selected={selectedWordLang}
          onChange={setSelectedWordLang}
        />
        <Selector
          id="voice-file-selector"
          label="选择语音资源差分"
          options={voiceBase}
          valueField="path"
          labelField="lang"
          onChange={setSelectedVoicePath}
        />
      </div>
      {isSimplified && (
        <div class="p-1 text-center font-bold !bg-table border border-solid border-divider rounded shadow overflow-hidden">
          <span class="">{tocTitle}</span>
          <a
            class="float-right z-1 select-none !text-blue-700 !no-underline"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            {isCollapsed ? "展开" : "折叠"}
          </a>
        </div>
      )}
      <div
        class={`${
          isSimplified && isCollapsed ? "hidden" : ""
        } table bg-wikitable border-collapse w-full border border-solid border-divider rounded shadow overflow-hidden`}
      >
        {Array.from(voiceData).map((ele, index) => (
          <div key={index}>
            <div class="flex font-bold p-1 !bg-table border border-solid border-divider align-middle truncate">
              <span class="flex-auto justify-self-center self-center text-center">
                {ele.title}
              </span>
              <div>
                <VoicePlayer
                  key={childKey}
                  voiceId={`${voiceKey}/${ele?.title}`}
                  voicePath={`${selectedVoicePath}/${ele?.voiceFilename?.replace(
                    /\s/g,
                    "_"
                  )}`}
                />
              </div>
            </div>
            <div class="p-2 border border-solid border-divider">
              {selectedWordLang.map((v, i) => (
                <p key={i}>
                  <span
                    lang={Array.from(langSet)[v] == "日文" ? "ja" : ""}
                    dangerouslySetInnerHTML={{
                      __html: ele.detail[Array.from(langSet)[v] || "中文"],
                    }}
                  />
                  {ele.cond && <b>({ele.cond})</b>}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
