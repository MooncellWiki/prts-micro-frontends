import ReactAudioPlayer from "../../components/player";
import { useState } from "preact/hooks";
import { createRef } from "preact";

enum playerStatus {
  pause,
  playing,
}

interface props {
  voiceId: string;
  voicePath: string;
}

const isSimplified =
  decodeURIComponent(window.location.href).indexOf("/语音") !== -1
    ? false
    : true;

export function VoicePlayer({ voiceId, voicePath }: props) {
  const [status, setStatus] = useState<playerStatus>(playerStatus.playing);
  let ref = createRef<ReactAudioPlayer>();
  return (
    <div class="p-auto">
      <ReactAudioPlayer
        src={`//static.prts.wiki/${voicePath}`}
        id={voiceId}
        preload="none"
        title={voiceId}
        ref={ref}
        onEnded={(e) => setStatus(playerStatus.playing)}
      />
      <img
        class="w-10 cursor-pointer"
        title={status == playerStatus.playing ? "播放" : "暂停"}
        src={
          status == playerStatus.playing
            ? "/images/9/90/Play.png"
            : "/images/4/47/Pause.png"
        }
        onClick={() => {
          status == playerStatus.playing
            ? ref.current?.audioEl.current?.play()
            : ref.current?.audioEl.current?.pause();
          setStatus(
            status == playerStatus.pause
              ? playerStatus.playing
              : playerStatus.pause
          );
        }}
      ></img>
      {!isSimplified && (
        <a
          href={`//static.prts.wiki/${voicePath}`}
          download={voicePath.split("/").at(-1)}
        >
          <img
            class="w-10 cursor-pointer"
            title="下载"
            src="/images/f/f1/Download.png"
          ></img>
        </a>
      )}
    </div>
  );
}
