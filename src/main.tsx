import { render } from "preact";

import { ItemCharReq } from "./item-char-req";
if (location.href.includes("Widget:Item-character-requirement")) {
  render(<ItemCharReq />, document.getElementById("root")!);
}
