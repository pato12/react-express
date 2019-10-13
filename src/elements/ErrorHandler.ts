import { RouteNode } from "@root/types";

import INode from "@elements/Node";

class ErrorHandler extends INode<RouteNode> {
  render() {
    const { handle } = this.props;

    return {
      type: this.type,
      handle,
    };
  }
}

export default ErrorHandler;
