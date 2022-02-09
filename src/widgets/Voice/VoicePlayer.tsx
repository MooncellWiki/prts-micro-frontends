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

export function VoicePlayer({ voiceId, voicePath }: props) {
  const [status, setStatus] = useState<playerStatus>(playerStatus.playing);
  let ref = createRef<ReactAudioPlayer>();
  return (
    <div class="container">
      <ReactAudioPlayer
        src={`//static.prts.wiki/${voicePath}`}
        id={voiceId}
        preload="none"
        title={voiceId}
        ref={ref}
        onEnded={(e) => setStatus(playerStatus.playing)}
      />
      <img
        title={status == playerStatus.playing ? "播放" : "暂停"}
        src={
          status == playerStatus.playing
            ? "/images/9/90/Play.png"
            : "/images/4/47/Pause.png"
        }
        style="width:50%;cursor:pointer;"
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
      <a href={`//static.prts.wiki/${voicePath}`} download>
        <img
          title="下载"
          src="/images/f/f1/Download.png"
          style="width:50%;cursor:pointer;"
        ></img>
      </a>
    </div>
  );
}
