import { Elements, ComponentsProps } from '@root/types';

import INode from '@root/elements/Node';
import { noErrorHandler } from '@root/validation/errorHandler';

class MiddlewareInstance extends INode<Elements.Middleware> {
  render(): ComponentsProps {
    const { path, handle, method } = this.props;
    const routes = this.childs.map(c => c.render());

    noErrorHandler(routes);

    return {
      type: Elements.Middleware,
      path,
      handle,
      method,
      routes,
    };
  }
}

export default MiddlewareInstance;
