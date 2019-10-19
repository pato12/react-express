export const DEFAULT_PATH = Object.freeze("/");

export function mergePath(rootPath, childPath) {
  if (childPath) return trimSlash(`${rootPath}${childPath}`);
  else return trimSlash(rootPath);
}

function trimSlash(url: string) {
  return url.replace(/\/+/, "/");
}
