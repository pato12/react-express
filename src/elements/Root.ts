import { RouteNode, Elements } from "@root/types";
import { flatten, mergePath } from "@root/utils";

import INode from "@elements/Node";

interface RootInstance {
  path: string;
}

const DEFAULT_PATH = Object.freeze("/");

class RootInstance extends INode<RootInstance> {
  constructor(type, props) {
    super(type, props);
    this.props = {
      ...props,
      path: props && props.path ? props && props.path : DEFAULT_PATH
    };
  }

  mapNode = (node: RouteNode): RouteNode => {
    const { path } = this.props;

    if (node.type === Elements.Route) {
      return {
        ...node,
        path: mergePath(path, node.path)
      };
    } else if (node.type === Elements.Middleware) {
      return {
        ...node,
        path: node.path ? mergePath(path, node.path) : undefined,
        routes: node.routes ? node.routes.map(this.mapNode) : undefined
      };
    }

    return node;
  };

  render() {
    const nodes = flatten<RouteNode>(this.childs.map(c => c.render()));
    return nodes.map(this.mapNode);
  }
}

export default RootInstance;
