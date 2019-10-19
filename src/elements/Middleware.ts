import { RouteNode } from "@root/types";

import INode from "@root/elements/Node";
import { noErrorHandler } from "@root/validation/errorHandler";

class MiddlewareInstance extends INode<RouteNode> {
  render(): RouteNode {
    const { path, handle, method } = this.props;
    const routes = this.childs.map(c => c.render());

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
