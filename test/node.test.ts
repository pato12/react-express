import INode from "@root/elements/Node";
import { RouteNode } from "@root/types";

class FakeNode extends INode<RouteNode> {
  render(): RouteNode {
    return {};
  }
  getChilds() {
    return this.childs;
  }
}
const getInstance = () => new FakeNode("fake", {});

describe("Test INode", () => {
  let instance: FakeNode;

  beforeEach(() => (instance = getInstance()));

  test("append child", () => {
    expect(instance.getChilds()).toHaveLength(0);

    instance.appendChild(getInstance());

    expect(instance.getChilds()).toHaveLength(1);
  });

  test("append and remove child", () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.removeChild(child);
    expect(instance.getChilds()).toHaveLength(0);
  });

  test("append and remove fake child", () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.removeChild(null as any);
    expect(instance.getChilds()).toHaveLength(1);
  });

  test("insterBefore child", () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getInstance();
    const child2 = getInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.insertBefore(child2, child);

    expect(instance.getChilds()).toHaveLength(2);
    expect(instance.getChilds()[0]).toBe(child2);
    expect(instance.getChilds()[1]).toBe(child);
  });

  test("insterBefore fake child", () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getInstance();
    const child2 = getInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.insertBefore(child2, null as any);

    expect(instance.getChilds()).toHaveLength(1);
    expect(instance.getChilds()[0]).toBe(child);
  });

  test("update props", () => {
    expect(() => instance.update({},{})).toThrowError();
  });
});
