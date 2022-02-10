import "virtual:windi.css";
import "../polyfill";
import { render } from "preact";
import { Voice } from "../widgets/Voice/VoiceTable";
import { VoiceMobile } from "../widgets/Voice/VoiceTableMobile";
const ele = document.getElementById("voice-table-root");
const dataRoot = document.getElementById("voice-data-root");
const dataEle = dataRoot?.getElementsByClassName(
  "voice-data-item"
) as HTMLCollectionOf<HTMLElement>;

const langSet = new Set<string>();
const voiceBase =
  dataRoot?.dataset?.voiceBase?.split(",").reduce<{
    [index: string]: string;
  }>((acc, curr) => {
    const [k, v] = [...curr.split(":")];
    acc[k] = v;
    return acc;
  }, {}) || {};
const voiceData = Array.from(dataEle).map((ele) => ({
  title: ele?.dataset?.title,
  index: ele?.dataset?.voiceIndex,
  voiceFilename: ele?.dataset?.voiceFilename,
  cond: ele?.dataset?.cond,
  detail: Array.from(ele.children as HTMLCollectionOf<HTMLElement>).reduce<{
    [index: string]: string;
  }>((acc, curr) => {
    if (curr.dataset?.kindName !== undefined) {
      acc[curr.dataset.kindName] = curr.innerHTML;
      langSet.add(curr.dataset.kindName);
    }
    return acc;
  }, {}),
}));
const isMobile = !!document
  .getElementsByTagName("body")[0]
  .classList.contains("skin-minerva");
console.log(voiceData);
console.log(voiceBase);
if (
  ele &&
  dataRoot?.dataset?.tocTitle &&
  dataRoot?.dataset?.voiceKey &&
  voiceData
) {
  render(
    isMobile ? (
      <VoiceMobile
        tocTitle={dataRoot?.dataset?.tocTitle}
        voiceKey={dataRoot?.dataset?.voiceKey}
        voiceData={voiceData}
        langSet={langSet}
        voiceBase={voiceBase}
      />
    ) : (
      <Voice
        tocTitle={dataRoot?.dataset?.tocTitle}
        voiceKey={dataRoot?.dataset?.voiceKey}
        voiceData={voiceData}
        langSet={langSet}
        voiceBase={voiceBase}
      />
    ),
    ele
  );
} else {
  console.error("voice-data or ele not found", ele);
}
