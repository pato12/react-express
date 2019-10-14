import { RouteNode, Elements } from "@root/types";
import { flatten, mapNode } from "@root/utils";

import INode from "@root/elements/Node";

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

  render(): RouteNode | RouteNode[] {
    const nodes = flatten<RouteNode>(this.childs.map(c => c.render()));
    const sortedNodes = nodes.map(mapNode(this.props)).sort(sortErrorHandler);

    const errorHandlers = sortedNodes.filter(
      n => n.type === Elements.ErrorHandler
    );

    if (errorHandlers.length > 1) {
      throw new Error("Error there are twice error handler.");
    }

    return sortedNodes;
  }
}

export default RootInstance;

function sortErrorHandler(a, b) {
  return a.type === Elements.ErrorHandler ? 1 : 0;
}
