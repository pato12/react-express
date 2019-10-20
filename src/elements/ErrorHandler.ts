import { RouteNode } from '@root/types';

import INode from '@root/elements/Node';

class ErrorHandler extends INode<RouteNode> {
  render(): RouteNode {
    const { handle } = this.props;

    return {
      type: this.type,
      handle,
    };
  }
}

export default ErrorHandler;
