import { ComponentsProps, Elements } from '@root/types';

import INode from '@root/elements/Node';
import { DEFAULT_PATH } from '@root/utils';
import { noErrorHandler } from '@root/validation/errorHandler';

class RouteInstance extends INode<Elements.Route> {
  constructor(type, props) {
    super(type, props);
    this.props = {
      ...props,
      path: props && props.path ? props && props.path : DEFAULT_PATH,
    };
  }

  render(): ComponentsProps {
    const { path, handle, method } = this.props;
    const routes = this.childs.map(c => c.render());

    noErrorHandler(routes);

    return {
      type: Elements.Route,
      path,
      handle,
      method,
      routes,
    };
  }
}

export default RouteInstance;
