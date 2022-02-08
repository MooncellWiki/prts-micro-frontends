import { VoicePlayer } from "./VoicePlayer";

interface props {
  tocTitle: string;
  voiceKey: string;
  voiceData: HTMLCollectionOf<HTMLElement>;
}

export function Voice({ tocTitle, voiceKey, voiceData }: props) {
  return (
    <div>
      <h2>
        <span class="mw-headline">{tocTitle}</span>
      </h2>
      <div class="table bg-wikitable border-collapse max-w-screen-lg border border-solid border-divider rounded shadow overflow-hidden">
        <div class="table-row-group">
          {Array.from(voiceData).map((ele) => (
            <div class="table-row">
              <div class="table-cell text-center font-bold p-1 !bg-table border border-solid border-divider align-middle truncate">
                {ele?.dataset.title}
              </div>
              <div class="table-cell px-2 py-2 inline-block border border-solid border-divider rounded align-middle">
                {ele?.dataset.text}
              </div>
              <div class="table-cell p-1 border border-solid border-divider rounded align-middle truncate">
                <VoicePlayer
                  voiceId={voiceKey + "/" + ele?.dataset.title}
                  voicePath={`voice/${voiceKey}/${ele?.dataset.voiceFilename?.replace(
                    " ",
                    "_"
                  )}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
