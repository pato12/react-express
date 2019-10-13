import { Props, RouteNode } from "@root/types";

abstract class INode<T = Props> {
  protected childs: INode[];
  constructor(public type: string, public props: T) {
    this.childs = [];
  }

  appendChild(child: INode) {
    this.childs.push(child);
  }

  insertBefore(child: INode, beforeChild: INode) {
    const index = this.childs.indexOf(beforeChild);
    if (index > -1) {
      this.childs.splice(index, 0, child);
    }
  }

  removeChild(child: INode) {
    const index = this.childs.indexOf(child);
    if (index > -1) {
      this.childs.splice(index, 1);
    }
  }

  update(oldProps: T, newProps: T) {
    throw new Error(`Update is not supported at ${this.type}`);
  }

  abstract render(): RouteNode | RouteNode[];
}

export default INode;
