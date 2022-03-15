import { useAudio } from "../../hooks/useAudio";

interface props {
  voiceId: string;
  voicePath: string;
}

const isSimplified =
  decodeURIComponent(window.location.href).indexOf("/语音") === -1;

export function VoicePlayer({ voiceId, voicePath }: props) {
  const [state, controls, _ref] = useAudio({
    src: `//static.prts.wiki/${voicePath}`,
  });
  return (
    <div class="container">
      <img
        class="md:w-10 <sm:w-7 cursor-pointer"
        title={state.paused ? "播放" : "暂停"}
        src={state.paused ? "/images/9/90/Play.png" : "/images/4/47/Pause.png"}
        onClick={() => {
          state.paused ? controls.play() : controls.pause();
        }}
      />
      {!isSimplified && (
        <a
          href={`//static.prts.wiki/${voicePath}`}
          download={voicePath.split("/")[voicePath.split("/").length - 1]}
        >
          <img
            class="md:w-10 <sm:w-7 cursor-pointer"
            title="下载"
            src="/images/f/f1/Download.png"
          />
        </a>
      )}
    </div>
  );
}
