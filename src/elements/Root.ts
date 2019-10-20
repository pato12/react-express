import { Elements, RouteNode } from '@root/types';
import { DEFAULT_PATH } from '@root/utils';

import INode from '@root/elements/Node';
import { twiceErrorHandler } from '@root/validation/errorHandler';

interface RootInstance {
  path: string;
}

class RootInstance extends INode<RootInstance> {
  constructor(type, props) {
    super(type, props);
    this.props = {
      ...props,
      path: props && props.path ? props && props.path : DEFAULT_PATH,
    };
  }

  render(): RouteNode {
    const nodes = this.childs.map(c => c.render());
    const sortedNodes = nodes.sort(sortErrorHandler);

    twiceErrorHandler(sortedNodes);

    if (this.type === Elements.Root) {
      return sortedNodes[0];
    }

    return {
      type: this.type,
      path: this.props.path,
      routes: sortedNodes,
    };
  }
}

export default RootInstance;

function sortErrorHandler(a, b) {
  return a.type === Elements.ErrorHandler ? 1 : 0;
}
