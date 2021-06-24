/**
 * Class representing a BST Node
 * ```typescript
 * // creates a node with given key, and value
 * const node = new BinarySearchTreeNode(2, 'hello');
 * ```
 */
export default class BSTNode<T extends number | string, U = any> {
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
  private _left: BSTNode<T, U> | null;

  /** Right child node
   * @private
   */
  private _right: BSTNode<T, U> | null;

  /** Parent node
   * @private
   */
  private _parent: BSTNode<T, U> | null;

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
   * @returns {BSTNode<T, U>}
   */
  setKey(key: T): BSTNode<T, U> {
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
   * @returns {BSTNode<T, U>}
   */
  setValue(value: U): BSTNode<T, U> {
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
  setLeft(left: BSTNode<T, U> | null): BSTNode<T, U> {
    if (left && !(left instanceof BSTNode)) {
      throw new Error('setLeft expects a BSTNode or null');
    }

    this._left = left || null;
    return this;
  }

  /**
   * Returns the left child
   * @public
   * @returns {BSTNode<T, U> | null}
   */
  getLeft(): BSTNode<T, U> | null {
    return this._left;
  }

  /**
   * Checks if node has a left child
   * @public
   * @returns {boolean}
   */
  hasLeft(): boolean {
    return this._left instanceof BSTNode;
  }

  /**
   * Set right child node and returns the instance.
   * @param right - New Node to be inserted to the right, if given a node does not match type will throw an error.
   */
  setRight(right: BSTNode<T, U> | null): BSTNode<T, U> {
    if (right && !(right instanceof BSTNode)) {
      throw new Error('setright expects a BSTNode or null');
    }

    this._right = right || null;
    return this;
  }

  /**
   * Returns the right child
   * @public
   * @returns {BSTNode<T, U> | null}
   */
  getRight(): BSTNode<T, U> | null {
    return this._right;
  }

  /**
   * Checks if node has a right child
   * @public
   * @returns {boolean}
   */
  hasRight(): boolean {
    return this._right instanceof BSTNode;
  }

  /**
   * Set parent node and returns the instance.
   * @param parent - New Node to be inserted to the parent, if given a node does not match type will throw an error.
   */
  setParent(parent: BSTNode<T, U> | null): BSTNode<T, U> {
    if (parent && !(parent instanceof BSTNode)) {
      throw new Error('setparent expects a BSTNode or null');
    }

    this._parent = parent || null;
    return this;
  }

  /**
   * Returns the parent
   * @public
   * @returns {BSTNode<T, U> | null}
   */
  getParent(): BSTNode<T, U> | null {
    return this._parent;
  }

  /**
   * Checks if node has a parent
   * @public
   * @returns {boolean}
   */
  hasParent(): boolean {
    return this._parent instanceof BSTNode;
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
