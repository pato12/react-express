import { createInstance } from '@root/elements';
import { Elements, Props, RouteNode } from '@root/types';
import Reconciler from 'react-reconciler';

import { compileRoute } from './compileExpressRoutes';

const HostConfig = {
  now: Date.now,
  getRootHostContext() {
    const rootContext = {};
    return rootContext;
  },
  getChildHostContext(parentContext: any, fiberType: any, rootInstance: any) {
    const context = { type: fiberType };
    return context;
  },
  shouldSetTextContent() {
    return false;
  },
  createTextInstance() {
    throw new Error('createTextInstance not supported');
  },
  createInstance(
    type: string,
    newProps: Props,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    return createInstance(type, newProps);
  },
  appendInitialChild: (parent: any, child: any) => {
    parent.appendChild(child);
  },
  finalizeInitialChildren: () => {
    return false;
  },
  prepareForCommit() {
    // pass
  },
  resetAfterCommit() {
    // pass
  },
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  supportsMutation: true,
  prepareUpdate() {
    return false;
  },
  commitUpdate(
    instance: any,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    instance.update(oldProps, newProps);
  },
  commitTextUpdate(textInstance, oldText, newText) {
    throw new Error('commitTextUpdate not supported');
  },
  appendChild(parentInstance: any, child) {
    parentInstance.appendChild(child);
  },
  insertBefore: (parentInstance: any, child, beforeChild) => {
    parentInstance.insertBefore(child, beforeChild);
  },
  removeChild(parentInstance: any, child) {
    parentInstance.removeChild(child);
  },
  insertInContainerBefore(container: any, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },
  removeChildFromContainer(container: any, child) {
    container.removeChild(child);
  },
  resetTextContent() {
    // pass
  },
};

// @ts-ignore
const reconcilerInstance = Reconciler(HostConfig);

const CustomRenderer = {
  generate(element) {
    const rootContainer = createInstance(Elements.Root);
    const mountNode = reconcilerInstance.createContainer(rootContainer);

    reconcilerInstance.updateContainer(element, mountNode, null);

    return rootContainer.render() as RouteNode;
  },
  compile(generated: RouteNode) {
    return compileRoute(generated);
  },
};

export default CustomRenderer;
