import { RouteNode } from '@root/types';

import INode from '@root/elements/Node';

interface ParamMiddlewareInstanceProps {
  name: string;
}

class ParamMiddlewareInstance extends INode<
  RouteNode & ParamMiddlewareInstanceProps
> {
  render(): RouteNode {
    const { path, handle, method, name } = this.props;

    return {
      type: this.type,
      path,
      handle,
      method,
      routes: [],
      props: { name },
    };
  }
}

export default ParamMiddlewareInstance;
