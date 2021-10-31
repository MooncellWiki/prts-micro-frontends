import { render } from "preact";
import "virtual:windi.css";
import { ItemDemand } from "./ItemDemand";

if (location.href.includes("Widget:ItemDemand")) {
  const ele = document.getElementById("root")!;
  const item = ele.dataset.item!;
  render(<ItemDemand item={item} />, ele);
}
