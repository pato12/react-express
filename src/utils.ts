import { RouteNode, Elements } from "./types";

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

export function mapNode(rootProps: any) {
  const { path } = rootProps;
  const map = (node): RouteNode => {
    if (node.type === Elements.Route) {
      return {
        ...node,
        path: path ? mergePath(path, node.path) : node.path
      };
    } else if (node.type === Elements.Middleware) {
      return {
        ...node,
        path: node.path ? mergePath(path, node.path) : undefined,
        routes: node.routes ? node.routes.map(map) : undefined
      };
    }

    return node;
  };

  return map;
}
