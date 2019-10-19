export const DEFAULT_PATH = Object.freeze("/");

// source https://stackoverflow.com/a/15030117
export function flatten<T>(arr): T[] {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

export function mergePath(rootPath, childPath) {
  if (childPath) return trimSlash(`${rootPath}${childPath}`);
  else return trimSlash(rootPath);
}

function trimSlash(url: string) {
  return url.replace(/\/+/, "/");
}
