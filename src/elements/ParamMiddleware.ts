import { Elements, ComponentsProps } from '@root/types';

import INode from '@root/elements/Node';

class ParamMiddlewareInstance extends INode<Elements.ParamMiddleware> {
  render(): ComponentsProps {
    const { path, handle, method, name } = this.props;

    return {
      type: Elements.ParamMiddleware,
      path,
      handle,
      method,
      routes: [],
      name,
    };
  }
}

export default ParamMiddlewareInstance;
