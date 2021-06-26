import { BST } from '../Tree';

const randInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

describe('BST unit tests', () => {
  let bst: BST<number, string>;

  const buildTree = () => {
    bst.add(15, 'n1');
    bst.add(25, 'n1');
    bst.add(10, 'n1');
    bst.add(7, 'n1');
    bst.add(22, 'n1');
    bst.add(17, 'n1');
    bst.add(13, 'n1');
    bst.add(5, 'n1');
    bst.add(9, 'n1');
    bst.add(27, 'n1');

    return bst.toArray();
  };

  const buildSmallTree = () => {
    bst.add(50, 'n1');
    bst.add(30, 'n2');
    bst.add(70, 'n3');

    return bst.toArray();
  };

  beforeEach(() => {
    bst = new BST();
  });

  describe('Minimum & Maximum', () => {
    const emptyBst = new BST<number, string>();
    it('should get minimum', () => {
      const results = buildTree();
      const minimum = results.shift()!.key;

      expect(bst.minimum()?.key).toStrictEqual(minimum);

      expect(emptyBst.minimum()).toBeNull();
    });

    it('should get maximum', () => {
      const results = buildTree();
      const maximum = results.pop()!.key;

      expect(bst.maximum()?.key).toStrictEqual(maximum);

      expect(emptyBst.maximum()).toBeNull();
    });
  });

  describe('.add()', () => {
    it('should insert new nodes', () => {
      const results = buildSmallTree();
      //      50
      //     /  \
      //    30  70
      expect(bst.toArray()).toStrictEqual(results); // inorder
    });
  });

  describe('.remove()', () => {
    it('should remove node', () => {
      const results = buildSmallTree();
      //      50
      //     /  \
      //    30  70

      results.splice(0, 1);
      expect(bst.remove(30)).toBeTruthy();
      expect(bst.toArray()).toStrictEqual(results);

      results.splice(0, 1);
      expect(bst.remove(50)).toBeTruthy();
      expect(bst.toArray()).toStrictEqual(results);

      results.splice(0, 1);
      expect(bst.remove(70)).toBeTruthy();
      expect(bst.toArray()).toStrictEqual(results);

      expect(bst.isEmpty()).toBeTruthy();
      expect(bst.remove(10)).toBeFalsy();
    });

    it('should delete random seeded node', () => {
      const results = buildTree();
      const randIndex = randInRange(0, results.length);
      const { key: rKey } = results.splice(randIndex, 1)[0];
      //          15
      //         /  \
      //        10   25
      //       / \   / \
      //      7  13 22  27
      //     / \    /
      //    5   9  17

      bst.remove(rKey);
      expect(bst.toArray()).toStrictEqual(results);
    });
  });

  describe('.find(key) and .has(key)', () => {
    it('should find an element', () => {
      const results = buildTree();
      const randIndex = randInRange(0, results.length);
      const rKey = results[randIndex]!.key;

      expect(bst.find(rKey)!.key).toStrictEqual(
        results.find(({ key }) => key === rKey)!.key
      );

      expect(bst.find(1000)).toBeNull();
    });

    it('should has an element', () => {
      const results = buildTree();
      const randIndex = randInRange(0, results.length);
      const rKey = results[randIndex]!.key;

      expect(bst.has(rKey)).toStrictEqual(
        !!results.find(({ key }) => key === rKey)
      );

      expect(bst.has(1000)).toBeFalsy();
    });
  });

  describe('.update(key, newValue)', () => {
    it('should correctly update', () => {
      const results = buildSmallTree();

      expect(bst.update(30, 'hello world')).toHaveProperty(
        'value',
        'hello world'
      );

      expect(bst.update(30, 'nani')).toHaveProperty('value', 'nani');
      expect(bst.update(50, 'nani')).toHaveProperty('value', 'nani');
      expect(bst.update(70, 'nani')).toHaveProperty('value', 'nani');

      expect(bst.update(100, 'update100')).toBeNull();
    });
  });
});
