import { RouteNode, Elements } from "@root/types";
import { flatten, mapNode } from "@root/utils";

import INode from "@root/elements/Node";

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

    const errorHandlers = flattenedRoutes.filter(
      n => n.type === Elements.ErrorHandler
    );

    if (errorHandlers.length > 0) {
      throw new Error(
        "Error there are error handler inside the route component. Must be inside Express."
      );
    }

    return flattenedRoutes;
  }
}

export default RouteInstance;
