import { RouteNode } from "@root/types";
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

  mapNode(node: RouteNode): RouteNode {
    const { path } = this.props;

    if (node.type === "ROUTE") {
      return {
        ...node,
        path: mergePath(path, node.path)
      };
    } else if (node.type === "MIDDLEWARE") {
      return {
        ...node,
        path: node.path ? mergePath(path, node.path) : node.path,
        routes: node.routes
          ? node.routes.map(this.mapNode.bind(this))
          : node.routes
      };
    }

    return node;
  }

  render() {
    return flatten<RouteNode>(this.childs.map(c => c.render())).map(
      this.mapNode.bind(this)
    );
  }
}

export default RootInstance;
