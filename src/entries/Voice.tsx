import { render } from "preact";
import "virtual:windi.css";
import { Voice } from "../widgets/Voice/VoiceTable";

const ele = document.getElementById("voice-table-root");
const dataRoot = document.getElementById("voice-data-root");
const voiceData = dataRoot?.getElementsByClassName(
  "voice-data-item"
) as HTMLCollectionOf<HTMLElement>;
if (
  ele &&
  dataRoot?.dataset?.tocTitle &&
  dataRoot?.dataset?.voiceKey &&
  voiceData
) {
  render(
    <Voice
      tocTitle={dataRoot?.dataset?.tocTitle}
      voiceKey={dataRoot?.dataset?.voiceKey}
      voiceData={voiceData}
    />,
    ele
  );
} else {
  console.error("voice-data or ele not found", ele);
}
