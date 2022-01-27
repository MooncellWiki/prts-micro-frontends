import { render } from "preact";
import "virtual:windi.css";
import { ItemDemand } from "../widgets/ItemDemand";

const ele = document.getElementById("root");
if (ele?.dataset?.item) {
  render(<ItemDemand item={ele.dataset.item} />, ele);
} else {
  console.error("data-item or ele not found", ele);
}
