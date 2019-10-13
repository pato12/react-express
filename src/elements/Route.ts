import { RouteNode } from "@root/types";
import { flatten, mergePath } from "@root/utils";

import INode from "@elements/Node";

class RouteInstance extends INode<RouteNode> {
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

    return flatten<RouteNode>(this.childs.map(c => c.render())).map(n => ({
      ...n,
      path: mergePath(path, n.path),
      method: n.method || method
    }));
  }
}

export default RouteInstance;
