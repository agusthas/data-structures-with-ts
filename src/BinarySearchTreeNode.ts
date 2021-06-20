/** Class representing a BST Node */
export default class BinarySearchTreeNode<T extends number | string, U = any> {
  /** Key representing the hiearchy */
  private _key: T;

  /** Value of the node */
  private _value: U;

  /** Left child node */
  private _left: BinarySearchTreeNode<T, U> | null;

  /** Right child node */
  private _right: BinarySearchTreeNode<T, U> | null;

  /** Parent node*/
  private _parent: BinarySearchTreeNode<T, U> | null;

  /**
   * Create a node
   * @param key - Key of node
   * @param value - Value of node
   */
  constructor(key: T, value: U) {
    this._key = key;
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
  }

  /**
   * Set node key and returns the instance
   * @param key
   * @returns
   */
  setKey(key: T): BinarySearchTreeNode<T, U> {
    this._key = key;
    return this;
  }

  /** Gets node key */
  getKey(): T {
    return this._key;
  }

  /**
   * Sets node value and returns the instance
   * @param value
   */
  setValue(value: U): BinarySearchTreeNode<T, U> {
    this._value = value;
    return this;
  }

  /** Gets node value */
  getValue(): U {
    return this._value;
  }

  /**
   * Set left child node and returns the instance.
   * @param left - New Node to be inserted to the left, if given a node that not match the type will throw an error
   */
  setLeft(left: BinarySearchTreeNode<T, U> | null): BinarySearchTreeNode<T, U> {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error('setLeft expects a BSTNode or null');
    }

    this._left = left || null;
    return this;
  }

  /** Returns the left child */
  getLeft(): BinarySearchTreeNode<T, U> | null {
    return this._left;
  }

  /** Checks if node has a left child */
  hasLeft(): boolean {
    return this._left instanceof BinarySearchTreeNode;
  }

  /**
   * Set right child node and returns the instance.
   * @param right - New Node to be inserted to the right, if given a node that not match the type will throw an error
   */
  setRight(
    right: BinarySearchTreeNode<T, U> | null
  ): BinarySearchTreeNode<T, U> {
    if (right && !(right instanceof BinarySearchTreeNode)) {
      throw new Error('setright expects a BSTNode or null');
    }

    this._right = right || null;
    return this;
  }

  /** Returns the right child */
  getRight(): BinarySearchTreeNode<T, U> | null {
    return this._right;
  }

  /** Checks if node has a right child */
  hasRight(): boolean {
    return this._right instanceof BinarySearchTreeNode;
  }

  /**
   * Set parent child node and returns the instance.
   * @param parent - New Node to be inserted to the parent, if given a node that not match the type will throw an error
   */
  setParent(
    parent: BinarySearchTreeNode<T, U> | null
  ): BinarySearchTreeNode<T, U> {
    if (parent && !(parent instanceof BinarySearchTreeNode)) {
      throw new Error('setparent expects a BSTNode or null');
    }

    this._parent = parent || null;
    return this;
  }

  /** Gets the parent of a node */
  getParent(): BinarySearchTreeNode<T, U> | null {
    return this._parent;
  }

  /** Cheks if node has a parent node */
  hasParent(): boolean {
    return this._parent instanceof BinarySearchTreeNode;
  }

  /** Checks if node right now is a root */
  isRoot(): boolean {
    return this._parent === null;
  }

  /** Checks if node is a leaf( no children )*/
  isLeaf(): boolean {
    return !this.hasLeft() && !this.hasRight();
  }
}
