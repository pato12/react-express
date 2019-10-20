import { Elements, RouteNode } from '@root/types';

export function noErrorHandler(routes: RouteNode[]) {
  const errorHandlers = routes.filter(n => n.type === Elements.ErrorHandler);

  if (errorHandlers.length > 0) {
    throw new Error(
      'Error there are error handler inside the route component. Must be inside Express.'
    );
  }
}

export function twiceErrorHandler(routes: RouteNode[]) {
  const errorHandlers = routes.filter(n => n.type === Elements.ErrorHandler);

  if (errorHandlers.length > 1) {
    throw new Error('Error there are twice error handler.');
  }
}
