import { RouteNode, Elements } from "@root/types";
import { flatten, mergePath } from "@root/utils";

import INode from "@root/elements/Node";

class MiddlewareInstance extends INode<RouteNode> {
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

    const routes = flatten<RouteNode>(this.childs.map(c => c.render())).map(
      n => ({
        ...n,
        path: path ? mergePath(path, n.path) : n.path,
        method: n.method || method
      })
    );

    const errorHandlers = routes.filter(n => n.type === Elements.ErrorHandler);

    if (errorHandlers.length > 0) {
      throw new Error(
        "Error there are error handler inside the middleware component. Must be inside Express."
      );
    }

    return {
      type: this.type,
      path,
      handle,
      method,
      routes
    };
  }
}

export default MiddlewareInstance;
