import {
  DiscriminateComponentProps,
  ComponentsProps,
  Elements,
} from '@root/types';

abstract class INode<T extends Elements = any> {
  protected childs: INode[];
  constructor(
    public type: Elements,
    public props: DiscriminateComponentProps<T>
  ) {
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

  update(
    oldProps: DiscriminateComponentProps<T>,
    newProps: DiscriminateComponentProps<T>
  ) {
    throw new Error(`Update is not supported at ${this.type}`);
  }

  abstract render(): ComponentsProps;
}

export default INode;
