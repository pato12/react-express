import { createInstance } from '../src/elements';
import INode from '../src/elements/Node';
import { Elements } from '../src/types';

class FakeNode extends INode<any> {
  render() {
    return {};
  }
  getChilds() {
    return this.childs;
  }
}
const getFakeInstance = () => new FakeNode('fake', {});

describe('Test INode', () => {
  let instance: FakeNode;

  beforeEach(() => (instance = getFakeInstance()));

  test('append child', () => {
    expect(instance.getChilds()).toHaveLength(0);

    instance.appendChild(getFakeInstance());

    expect(instance.getChilds()).toHaveLength(1);
  });

  test('append and remove child', () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getFakeInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.removeChild(child);
    expect(instance.getChilds()).toHaveLength(0);
  });

  test('append and remove fake child', () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getFakeInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.removeChild(null as any);
    expect(instance.getChilds()).toHaveLength(1);
  });

  test('insterBefore child', () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getFakeInstance();
    const child2 = getFakeInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.insertBefore(child2, child);

    expect(instance.getChilds()).toHaveLength(2);
    expect(instance.getChilds()[0]).toBe(child2);
    expect(instance.getChilds()[1]).toBe(child);
  });

  test('insterBefore fake child', () => {
    expect(instance.getChilds()).toHaveLength(0);

    const child = getFakeInstance();
    const child2 = getFakeInstance();
    instance.appendChild(child);

    expect(instance.getChilds()).toHaveLength(1);

    instance.insertBefore(child2, null as any);

    expect(instance.getChilds()).toHaveLength(1);
    expect(instance.getChilds()[0]).toBe(child);
  });

  test('update props', () => {
    expect(() => instance.update({}, {})).toThrowError();
  });
});

describe('Test createInstance', () => {
  for (const element of Object.values(Elements)) {
    describe(`Test ${element}`, () => {
      let instance;

      beforeEach(() => (instance = createInstance(element, {})));

      test('append child', () => {
        expect(instance.childs).toHaveLength(0);

        instance.appendChild(getFakeInstance());

        expect(instance.childs).toHaveLength(1);
      });

      test('append and remove child', () => {
        expect(instance.childs).toHaveLength(0);

        const child = getFakeInstance();
        instance.appendChild(child);

        expect(instance.childs).toHaveLength(1);

        instance.removeChild(child);
        expect(instance.childs).toHaveLength(0);
      });

      test('append and remove fake child', () => {
        expect(instance.childs).toHaveLength(0);

        const child = getFakeInstance();
        instance.appendChild(child);

        expect(instance.childs).toHaveLength(1);

        instance.removeChild(null as any);
        expect(instance.childs).toHaveLength(1);
      });

      test('insterBefore child', () => {
        expect(instance.childs).toHaveLength(0);

        const child = getFakeInstance();
        const child2 = getFakeInstance();
        instance.appendChild(child);

        expect(instance.childs).toHaveLength(1);

        instance.insertBefore(child2, child);

        expect(instance.childs).toHaveLength(2);
        expect(instance.childs[0]).toBe(child2);
        expect(instance.childs[1]).toBe(child);
      });

      test('insterBefore fake child', () => {
        expect(instance.childs).toHaveLength(0);

        const child = getFakeInstance();
        const child2 = getFakeInstance();
        instance.appendChild(child);

        expect(instance.childs).toHaveLength(1);

        instance.insertBefore(child2, null as any);

        expect(instance.childs).toHaveLength(1);
        expect(instance.childs[0]).toBe(child);
      });

      test('update props', () => {
        expect(() => instance.update({}, {})).toThrowError();
      });
    });
  }

  test('Create a fake instance', () => {
    const creator = () => createInstance('fake', {});

    expect(creator).toThrowError();
  });
});
