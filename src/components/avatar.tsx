import { getImagePath, professionMap } from "../utils/utils";

export function Avatar({
  size = 100,
  rarity,
  name,
  profession,
}: {
  size?: number;
  rarity: number;
  name: string;
  profession: keyof typeof professionMap;
}) {
  return (
    <div class="relative" style={`width:${size}px;height:${size}px`}>
      <a href={`/w/${name}`} style={`width:${size}px;height:${size}px`}>
        <img
          class="lazyload img"
          data-src={`/images/${getImagePath(`头像_${name}.png`)}`}
        />
        <div class="absolute bottom-0 right-0">
          <img
            class="lazyload img"
            style={`height:${(size / 100) * 18}px;`}
            data-src={`/images/${getImagePath(`稀有度_黄_${rarity}.png`)}`}
          />
        </div>
        <div class="absolute top-0">
          <img
            class="lazyload img"
            style={`height:${(size / 100) * 25}px;`}
            data-src={`/images/${getImagePath(
              `图标_职业_${professionMap[profession]}.png`
            )}`}
          />
        </div>
      </a>
    </div>
  );
}
