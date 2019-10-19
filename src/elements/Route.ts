import { RouteNode } from "@root/types";

import INode from "@root/elements/Node";
import { noErrorHandler } from "@root/validation/errorHandler";
import { DEFAULT_PATH } from "@root/utils";

class RouteInstance extends INode<RouteNode> {
  constructor(type, props) {
    super(type, props);
    this.props = {
      ...props,
      path: props && props.path ? props && props.path : DEFAULT_PATH
    };
  }

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

export default RouteInstance;
