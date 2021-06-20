/**
 * Class representing a BST Node
 * @example
 * // creates a node with given key, and value
 * const node = new BinarySearchTreeNode(2, 'hello');
 */
export default class BinarySearchTreeNode<T extends number | string, U = any> {
  /**
   * Key representing the hiearchy
   * @private
   */
  private _key: T;

  /**
   * Value of the node
   * @private
   */
  private _value: U;

  /** Left child node
   * @private
   */
  private _left: BinarySearchTreeNode<T, U> | null;

  /** Right child node
   * @private
   */
  private _right: BinarySearchTreeNode<T, U> | null;

  /** Parent node
   * @private
   */
  private _parent: BinarySearchTreeNode<T, U> | null;

  /**
   * Creates a nodeb
   * @constructor
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
   * Set node key and returns the instance.
   * @public
   * @param key - New node key.
   * @returns {BinarySearchTreeNode<T, U>}
   */
  setKey(key: T): BinarySearchTreeNode<T, U> {
    this._key = key;
    return this;
  }

  /**
   * Gets node key
   * @public
   * @returns {T}
   */
  getKey(): T {
    return this._key;
  }

  /**
   * Sets node value and returns the instance.
   * @public
   * @param value - New node value.
   * @returns {BinarySearchTreeNode<T, U>}
   */
  setValue(value: U): BinarySearchTreeNode<T, U> {
    this._value = value;
    return this;
  }

  /**
   * Gets node value
   * @public
   * @returns {U}
   */
  getValue(): U {
    return this._value;
  }

  /**
   * Set left child node and returns the instance.
   * @param left - New Node to be inserted to the left, if given a node does not match type will throw an error.
   */
  setLeft(left: BinarySearchTreeNode<T, U> | null): BinarySearchTreeNode<T, U> {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error('setLeft expects a BSTNode or null');
    }

    this._left = left || null;
    return this;
  }

  /**
   * Returns the left child
   * @public
   * @returns {BinarySearchTreeNode<T, U> | null}
   */
  getLeft(): BinarySearchTreeNode<T, U> | null {
    return this._left;
  }

  /**
   * Checks if node has a left child
   * @public
   * @returns {boolean}
   */
  hasLeft(): boolean {
    return this._left instanceof BinarySearchTreeNode;
  }

  /**
   * Set right child node and returns the instance.
   * @param right - New Node to be inserted to the right, if given a node does not match type will throw an error.
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

  /**
   * Returns the right child
   * @public
   * @returns {BinarySearchTreeNode<T, U> | null}
   */
  getRight(): BinarySearchTreeNode<T, U> | null {
    return this._right;
  }

  /**
   * Checks if node has a right child
   * @public
   * @returns {boolean}
   */
  hasRight(): boolean {
    return this._right instanceof BinarySearchTreeNode;
  }

  /**
   * Set parent node and returns the instance.
   * @param parent - New Node to be inserted to the parent, if given a node does not match type will throw an error.
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

  /**
   * Returns the parent
   * @public
   * @returns {BinarySearchTreeNode<T, U> | null}
   */
  getParent(): BinarySearchTreeNode<T, U> | null {
    return this._parent;
  }

  /**
   * Checks if node has a parent
   * @public
   * @returns {boolean}
   */
  hasParent(): boolean {
    return this._parent instanceof BinarySearchTreeNode;
  }

  /**
   * Checks if node right now is a root
   * @public
   * @returns {boolean}
   */
  isRoot(): boolean {
    return this._parent === null;
  }

  /** Checks if node is a leaf (no children)
   * @public
   * @returns {boolean}
   */
  isLeaf(): boolean {
    return !this.hasLeft() && !this.hasRight();
  }
}
