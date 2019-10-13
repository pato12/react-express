export type Props = Record<string, any>;

export interface RouteNode {
  type: string;
  path?: string;
  method?: string;
  handle?(req, res, next);
  routes?: RouteNode[];
}
