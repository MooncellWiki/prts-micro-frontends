import "./index.css";
export function Skeleton({ classes }: { classes?: string }) {
  return <div class={`${classes} mcui-skeleton`} />;
}
