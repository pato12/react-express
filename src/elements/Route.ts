import { RouteNode } from "@root/types";
import { flatten, mapNode } from "@root/utils";

import INode from "@root/elements/Node";
import { noErrorHandler } from "@root/validation/errorHandler";

class RouteInstance extends INode<RouteNode> {
  render(): RouteNode | RouteNode[] {
    const { path, handle, method } = this.props;

    if (this.childs.length === 0) {
      return {
        type: this.type,
        path,
        handle,
        method
      };
    }

    const flattenedRoutes = flatten<RouteNode>(
      this.childs.map(c => c.render())
    ).map(mapNode(this.props));

    noErrorHandler(flattenedRoutes);

    return flattenedRoutes;
  }
}

export default RouteInstance;
