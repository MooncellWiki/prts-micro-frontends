import { MutableRef, useEffect, useRef, useState } from "preact/hooks";

interface Props {
  src: string;
}
interface AudioState {
  paused: boolean;
  playing: boolean;
}
interface AudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
}

export function useAudio(
  props: Props
): [AudioState, AudioControls, MutableRef<HTMLAudioElement | undefined>] {
  const ref = useRef<HTMLAudioElement>();
  const [state, setState] = useState<AudioState>({
    paused: true,
    playing: false,
  });
  let lockPlay = false;
  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === "object";

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
    },
  };
  useEffect(() => {
    const audio = new Audio();
    audio.src = props.src;
    audio.autoplay = false;
    audio.controls = false;
    audio.preload = "none";

    audio.onplay = () => setState((s) => ({ ...s, paused: false }));
    audio.onplaying = () => setState((s) => ({ ...s, playing: true }));
    audio.onwaiting = () => setState((s) => ({ ...s, playing: false }));
    audio.onpause = () =>
      setState((s) => ({ ...s, paused: true, playing: false }));

    ref.current = audio;
    return () => {
      if (ref.current) {
        const el = ref.current;
        el.onplay = null;
        el.onplaying = null;
        el.onwaiting = null;
        el.onpause = null;
        el.pause();
        ref.current = undefined;
      }
    };
  }, [props.src]);
  return [state, controls, ref];
}
