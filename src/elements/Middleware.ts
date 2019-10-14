import { RouteNode } from "@root/types";
import { flatten, mergePath, mapNode } from "@root/utils";

import INode from "@root/elements/Node";
import { noErrorHandler } from "@root/validation/errorHandler";

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
      mapNode(this.props)
    );

    noErrorHandler(routes);

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
