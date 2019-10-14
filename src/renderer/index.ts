import Reconciler from "react-reconciler";
import { Props, Elements, RouteNode } from "@root/types";
import { createInstance } from "@root/elements";
import generateExpressRoutes from "./generateExpressRules";

const HostConfig = {
  now: Date.now,
  getRootHostContext() {
    let rootContext = {};
    return rootContext;
  },
  getChildHostContext(parentContext: any, fiberType: any, rootInstance: any) {
    let context = { type: fiberType };
    return context;
  },
  shouldSetTextContent() {
    return false;
  },
  createTextInstance() {
    throw new Error("createTextInstance not supported");
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
  prepareForCommit() {},
  resetAfterCommit() {},
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
    throw new Error("commitTextUpdate not supported");
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
  resetTextContent() {}
};

// @ts-ignore
const reconcilerInstance = Reconciler(HostConfig);

const CustomRenderer = {
  compile(element) {
    const rootContainer = createInstance(Elements.Root);
    const mountNode = reconcilerInstance.createContainer(rootContainer);

    reconcilerInstance.updateContainer(element, mountNode, null);

    return rootContainer.render() as RouteNode;
  },
  generate(compiled: RouteNode) {
    return generateExpressRoutes(compiled);
  }
};

export default CustomRenderer;
