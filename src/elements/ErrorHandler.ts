import { Elements, ComponentsProps } from '@root/types';

import INode from '@root/elements/Node';

class ErrorHandler extends INode<Elements.ErrorHandler> {
  render(): ComponentsProps {
    const { handle } = this.props;

    return {
      type: Elements.ErrorHandler,
      handle,
    };
  }
}

export default ErrorHandler;
