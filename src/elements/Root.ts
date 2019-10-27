import { Elements, ComponentsProps } from '@root/types';

import INode from '@root/elements/Node';

class RootInstance extends INode<Elements.Root> {
  render(): ComponentsProps {
    const nodes = this.childs.map(c => c.render());

    return nodes[0];
  }
}

export default RootInstance;
