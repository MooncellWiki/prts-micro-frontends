import { render } from "preact";

import { Voice } from "../widgets/Voice";

const ele = document.getElementById("root");
if (ele?.dataset?.item) {
  render(<Voice />, ele);
} else {
  console.error("data-item or ele not found", ele);
}
