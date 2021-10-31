import MD5 from "md5";
export function getImagePath(filename: string) {
  const md5 = MD5(filename);
  return `${md5.slice(0, 1)}/${md5.slice(0, 2)}/${filename}`;
}
