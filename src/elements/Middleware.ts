import { RouteNode } from "@root/types";
import { flatten } from "@root/utils";

import INode from "@elements/Node";

class MiddlewareInstance extends INode<RouteNode> {
  render() {
    const { path, handle, method } = this.props;

    if (this.childs.length === 0) {
      return {
        type: this.type,
        path,
        handle,
        method
      };
    }

    const routes = flatten<RouteNode>(this.childs.map(c => c.render()));

    return {
      type: this.type,
      path,
      handle,
      method,
      routes,
    };
  }
}

export default MiddlewareInstance;
