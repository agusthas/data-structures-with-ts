import { BinarySearchTree, BinarySearchTreeNode } from '../BinarySearchTree';

describe('BST Tests', () => {
  const bst = new BinarySearchTree<number, string | undefined>();

  describe('.insert(key, value)', () => {
    it('should insert nodes to the tree', () => {
      expect(bst.insert(50, 'n1')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(80, 'n2')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(30, 'n3')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(90, 'n4')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(60, 'n5')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(40, 'n6')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.insert(20, 'n20')).toBeInstanceOf(BinarySearchTreeNode);

      // updates value of existing node
      expect(bst.insert(20, 'n7')).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(20)!.getValue()).toStrictEqual('n7');
    });
  });

  describe('.root()', () => {
    it('should get the root node', () => {
      expect(bst.root()!.getKey()).toStrictEqual(50);
      expect(bst.root()!.getValue()).toStrictEqual('n1');
      expect(bst.root()!.getRight()!.getKey()).toStrictEqual(80);
      expect(bst.root()!.getRight()!.getValue()).toStrictEqual('n2');
      expect(bst.root()!.getLeft()!.getKey()).toStrictEqual(30);
      expect(bst.root()!.getLeft()!.getValue()).toStrictEqual('n3');
    });
  });

  describe('.count()', () => {
    it('get the count of nodes in the tree', () => {
      expect(bst.count()).toStrictEqual(7);
    });
  });

  describe('.has(key)', () => {
    it('checks if a node exists by key', () => {
      expect(bst.has(50)).toStrictEqual(true);
      expect(bst.has(80)).toStrictEqual(true);
      expect(bst.has(30)).toStrictEqual(true);
      expect(bst.has(90)).toStrictEqual(true);
      expect(bst.has(50)).toStrictEqual(true);
      expect(bst.has(40)).toStrictEqual(true);
      expect(bst.has(20)).toStrictEqual(true);
      expect(bst.has(100)).toStrictEqual(false);
    });
  });

  describe('.find(key)', () => {
    it('should search a node by its key in the tree', () => {
      expect(bst.find(50)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(80)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(30)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(90)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(50)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(40)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(20)!).toBeInstanceOf(BinarySearchTreeNode);
      expect(bst.find(100)!).toStrictEqual(null);
    });
  });

  describe('.max()', () => {
    it('get the node with max key', () => {
      const max = bst.max()!;
      expect(max.getKey()).toStrictEqual(90);
      expect(max.getValue()).toStrictEqual('n4');
    });
  });

  describe('.min()', () => {
    it('get the node with min key', () => {
      const min = bst.min()!;
      expect(min.getKey()).toStrictEqual(20);
      expect(min.getValue()).toStrictEqual('n7');
    });
  });

  describe('.traverse(cb) ', () => {
    it('traverse the tree in-order', () => {
      const keys: number[] = [];
      bst.traverse('in', (node) => keys.push(node.getKey()));
      expect(keys).toStrictEqual([20, 30, 40, 50, 60, 80, 90]);
    });

    it('traverse the tree pre-order', () => {
      const keys: number[] = [];
      bst.traverse('pre', (node) => keys.push(node.getKey()));
      expect(keys).toStrictEqual([50, 30, 20, 40, 80, 60, 90]);
    });

    it('traverse the tree post-order', () => {
      const keys: number[] = [];
      bst.traverse('post', (node) => keys.push(node.getKey()));
      expect(keys).toStrictEqual([20, 40, 30, 60, 90, 80, 50]);
    });
  });

  describe('.remove(key)', () => {
    it('should remove a leaf node', () => {
      bst.remove(20);
      expect(bst.has(20)).toStrictEqual(false);
      expect(bst.find(30)!.getLeft()).toStrictEqual(null);
      expect(bst.count()).toStrictEqual(6);
    });

    it('should remove a node with a right child only', () => {
      bst.remove(30);
      expect(bst.has(30)).toStrictEqual(false);
      expect(bst.root()!.getLeft()!.getKey()).toStrictEqual(40);
      expect(bst.count()).toStrictEqual(5);
    });

    it('should remove a node with a left child only', () => {
      bst.insert(30);
      bst.remove(40);
      expect(bst.has(40)).toStrictEqual(false);
      expect(bst.root()!.getLeft()!.getKey()).toStrictEqual(30);
      expect(bst.count()).toStrictEqual(5);
    });

    it('should remove a node with two children', () => {
      bst.remove(80);
      expect(bst.has(80)).toStrictEqual(false);
      expect(bst.root()!.getRight()!.getKey()).toStrictEqual(90);
      expect(bst.root()!.getRight()!.getValue()).toStrictEqual('n4');
      expect(bst.find(90)!.getRight()).toStrictEqual(null);
      expect(bst.find(90)!.getLeft()!.getKey()).toStrictEqual(60);
      expect(bst.count()).toStrictEqual(4);
    });

    it('should remove root node with right child', () => {
      bst.insert(100);
      bst.remove(60);
      bst.remove(90);
      bst.remove(30);
      bst.remove(50);
      expect(bst.root()!.getKey()).toStrictEqual(100);
    });

    it('should remove root node with left child', () => {
      bst.insert(20);
      bst.insert(30);
      bst.insert(25);
      bst.remove(30);
      bst.remove(25);
      bst.remove(100);
      expect(bst.root()!.getKey()).toStrictEqual(20);
    });

    it('should remove root node', () => {
      bst.remove(20);
      expect(bst.root()!).toStrictEqual(null);
    });
  });

  describe('.clear()', () => {
    bst.clear();
    expect(bst.count()).toStrictEqual(0);
    expect(bst.root()!).toStrictEqual(null);
    expect(bst.remove(10)).toStrictEqual(false);
  });
});
