import BSTNode from './BSTNode';

/**
 * Class representing a Binary Search Tree.
 * @requires {@link BSTNode}
 * ```typescript
 * // creates an instance of an BST with numbers as key
 * const bst = new BinarySearchTree<number>();
 * // with a string as key
 * const bst = new BinarySearchTree<string>();
 *
 * // limit the value to only a string value
 * const bst = new BinarySearchTree<number , string>();
 * ```
 */
export default class BST<T extends number | string, U = any> {
  private _root: BSTNode<T, U> | null;

  private _count: number;

  constructor() {
    this._root = null;
    this._count = 0;
  }

  /**
   * Inserts a node with a key/value into the tree
   * @param key
   * @param value
   * @returns {BSTNode<T,U>}
   */
  insert(key: T, value?: U): BSTNode<T, U> {
    const newNode = new BSTNode<T, U>(key, value as U);

    const insertion = (current: BSTNode<T, U>) => {
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

  /**
   * Checks if a value exists in the tree by its key
   * @param key
   * @returns {boolean}
   */
  has(key: T): boolean {
    const hasRecursive = (current: BSTNode<T, U> | null): boolean => {
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

  /**
   * Find a node by its key. If node isn't found, will return `null`.
   * @param key
   * @returns {BSTNode<T,U> | null}
   */
  find(key: T): BSTNode<T, U> | null {
    const findRecursive = (
      current: BSTNode<T, U> | null
    ): BSTNode<T, U> | null => {
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

  /**
   * Finds node with max key (most-right) in the tree
   * @param current
   * @returns {BSTNode<T,U> | null}
   */
  max(current: BSTNode<T, U> | null = this._root): BSTNode<T, U> | null {
    if (current === null) {
      return null;
    }

    if (current.hasRight()) {
      return this.max(current.getRight());
    }

    return current;
  }

  /**
   * Finds node with min key (most-left) in the tree
   * @param current
   * @returns {BSTNode<T,U> | null}
   */
  min(current: BSTNode<T, U> | null = this._root): BSTNode<T, U> | null {
    if (current === null) {
      return null;
    }

    if (current.hasLeft()) {
      return this.min(current.getLeft());
    }

    return current;
  }

  /**
   * Returns the root (most-top) node
   * @returns {BSTNode<T,U> | null}
   */
  root(): BSTNode<T, U> | null {
    return this._root;
  }

  /**
   * Returns the number of nodes in the tree
   * @returns {number}
   */
  count(): number {
    return this._count;
  }

  /**
   * Remove a node by its key. Returns true if node successfully removed, false otherwise.
   * @returns {boolean}
   */
  remove(key: T): boolean {
    const removeRecursively = (
      k: T,
      current: BSTNode<T, U> | null
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

  /**
   * Traverses tree in _type_-order, and applying callback function for each node.
   * @param {'in' | 'pre' | 'post'} type - Traversal type.
   * @param cb - A callback function that will be applied for each node.
   * @returns {void}
   */
  traverse(
    type: 'in' | 'pre' | 'post',
    cb: (node: BSTNode<T, U>) => void
  ): void {
    const traverseInOrder = (current: BSTNode<T, U> | null) => {
      if (current === null) return;
      traverseInOrder(current.getLeft());
      cb(current);
      traverseInOrder(current.getRight());
    };

    const traversePreOrder = (current: BSTNode<T, U> | null) => {
      if (current === null) return;
      cb(current);
      traversePreOrder(current.getLeft());
      traversePreOrder(current.getRight());
    };

    const traversePostOrder = (current: BSTNode<T, U> | null) => {
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
   * @returns {void}
   */
  clear(): void {
    this._root = null;
    this._count = 0;
  }
}
