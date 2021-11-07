import MD5 from "md5";
import fly from "flyio";
export function getImagePath(filename: string) {
  const md5 = MD5(filename);
  return `${md5.slice(0, 1)}/${md5.slice(0, 2)}/${filename}`;
}

fly.config.baseURL = 'https://api.prts.wiki'
export const api = fly;

export const professionMap = {
  PIONEER: "先锋",
  WARRIOR: "近卫",
  SNIPER: "狙击",
  SUPPORT: "辅助",
  CASTER: "术师",
  SPECIAL: "特种",
  MEDIC: "医疗",
  TANK: "重装",
};
