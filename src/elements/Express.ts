import { Elements, ComponentsProps } from '@root/types';
import { DEFAULT_PATH } from '@root/utils';

import INode from '@root/elements/Node';
import { twiceErrorHandler } from '@root/validation/errorHandler';

class ExpressInstance extends INode<Elements.Express> {
  constructor(type, props) {
    super(type, props);
    this.props = {
      ...props,
      path: props && props.path ? props && props.path : DEFAULT_PATH,
    };
  }

  render(): ComponentsProps {
    const nodes = this.childs.map(c => c.render());
    const sortedNodes = nodes.sort(sortErrorHandler);

    twiceErrorHandler(sortedNodes);

    return {
      type: Elements.Express,
      path: this.props.path,
      routes: sortedNodes,
    };
  }
}

export default ExpressInstance;

function sortErrorHandler(a, b) {
  return a.type === Elements.ErrorHandler ? 1 : 0;
}
