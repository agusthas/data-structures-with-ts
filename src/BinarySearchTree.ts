import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree<T extends number | string, U = any> {
  private _root: BinarySearchTreeNode<T, U> | null;
  private _count: number;

  constructor() {
    this._root = null;
    this._count = 0;
  }

  insert(key: T, value?: U) {
    const newNode = new BinarySearchTreeNode<T, U>(key, value as U);

    const insertion = (current: BinarySearchTreeNode<T, U>) => {
      if (key < current.getKey()) {
        if (current.hasLeft()) {
          insertion(current.getLeft()!);
        } else {
          current.setLeft(newNode.setParent(current));
          this._count += 1;
        }
      } else if (key > current.getKey()) {
        if (current.hasRight()) {
          insertion(current.getRight()!);
        } else {
          current.setRight(newNode.setParent(current));
          this._count += 1;
        }
      } else {
        current.setValue(value as U);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertion(this._root);
    }

    return newNode;
  }

  has(key: T) {
    const hasRecursive = (
      current: BinarySearchTreeNode<T, U> | null
    ): boolean => {
      if (current === null) {
        return false;
      }

      if (key === current.getKey()) {
        return true;
      }

      if (key < current.getKey()) {
        return hasRecursive(current.getLeft());
      }

      return hasRecursive(current.getRight());
    };

    return hasRecursive(this._root);
  }

  find(key: T) {
    const findRecursive = (
      current: BinarySearchTreeNode<T, U> | null
    ): BinarySearchTreeNode<T, U> | null => {
      if (current === null) {
        return null;
      }

      if (key === current.getKey()) {
        return current;
      }

      if (key < current.getKey()) {
        return findRecursive(current.getLeft());
      }

      return findRecursive(current.getRight());
    };

    return findRecursive(this._root);
  }

  max(
    current: BinarySearchTreeNode<T, U> | null = this._root
  ): BinarySearchTreeNode<T, U> | null {
    if (current === null) {
      return null;
    }

    if (current.hasRight()) {
      return this.max(current.getRight());
    }

    return current;
  }

  min(
    current: BinarySearchTreeNode<T, U> | null = this._root
  ): BinarySearchTreeNode<T, U> | null {
    if (current === null) {
      return null;
    }

    if (current.hasLeft()) {
      return this.min(current.getLeft());
    }

    return current;
  }

  root(): BinarySearchTreeNode<T, U> | null {
    return this._root;
  }

  count(): number {
    return this._count;
  }

  /**
   * Remove a node by its key
   */
  remove(key: T) {
    const removeRecursively = (
      k: T,
      current: BinarySearchTreeNode<T, U> | null
    ): boolean => {
      if (current === null) {
        return false;
      }

      if (k < current.getKey()) {
        return removeRecursively(k, current.getLeft());
      }

      if (k > current.getKey()) {
        return removeRecursively(k, current.getRight());
      }

      // Remove by case

      // case 1: current has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (k < current.getParent()!.getKey()) {
          current.getParent()!.setLeft(null);
        } else {
          current.getParent()!.setRight(null);
        }
        this._count -= 1;
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (k < current.getParent()!.getKey()) {
          current.getParent()!.setLeft(current.getLeft());
        } else {
          current.getParent()!.setRight(current.getLeft());
        }

        current.getLeft()!.setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (k < current.getParent()!.getKey()) {
          current.getParent()!.setLeft(current.getRight());
        } else {
          current.getParent()!.setRight(current.getRight());
        }
        current.getRight()!.setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 4: node has both right and left child
      const minRight = this.min(current.getRight());
      current.setKey(minRight!.getKey()).setValue(minRight!.getValue());

      return removeRecursively(minRight!.getKey(), minRight);
    };

    return removeRecursively(key, this._root);
  }

  traverse(
    type: 'in' | 'pre' | 'post',
    cb: (node: BinarySearchTreeNode<T, U>) => void
  ) {
    const traverseInOrder = (current: BinarySearchTreeNode<T, U> | null) => {
      if (current === null) return;
      traverseInOrder(current.getLeft());
      cb(current);
      traverseInOrder(current.getRight());
    };

    const traversePreOrder = (current: BinarySearchTreeNode<T, U> | null) => {
      if (current === null) return;
      cb(current);
      traversePreOrder(current.getLeft());
      traversePreOrder(current.getRight());
    };

    const traversePostOrder = (current: BinarySearchTreeNode<T, U> | null) => {
      if (current === null) return;
      traversePostOrder(current.getLeft());
      traversePostOrder(current.getRight());
      cb(current);
    };

    switch (type) {
      case 'in':
        traverseInOrder(this._root);
        break;

      case 'pre':
        traversePreOrder(this._root);
        break;

      case 'post':
        traversePostOrder(this._root);
        break;

      default:
        throw new Error('Please specify a correct type of traversal');
    }
  }

  /**
   * Reset the field of tree / Clear the tree
   */
  clear() {
    this._root = null;
    this._count = 0;
  }
}
