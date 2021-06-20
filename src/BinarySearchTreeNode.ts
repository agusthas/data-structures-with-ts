export default class BinarySearchTreeNode<T extends number | string, U = any> {
  private _key: T;
  private _value: U;
  private _left: BinarySearchTreeNode<T, U> | null;
  private _right: BinarySearchTreeNode<T, U> | null;
  private _parent: BinarySearchTreeNode<T, U> | null;

  constructor(key: T, value: U) {
    this._key = key;
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
  }

  setKey(key: T): BinarySearchTreeNode<T, U> {
    this._key = key;
    return this;
  }

  getKey() {
    return this._key;
  }

  setValue(value: U): BinarySearchTreeNode<T, U> {
    this._value = value;
    return this;
  }

  getValue() {
    return this._value;
  }

  setLeft(left: BinarySearchTreeNode<T, U> | null): BinarySearchTreeNode<T, U> {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error('setLeft expects a BSTNode or null');
    }

    this._left = left || null;
    return this;
  }

  getLeft(): BinarySearchTreeNode<T, U> | null {
    return this._left;
  }

  hasLeft() {
    return this._left instanceof BinarySearchTreeNode;
  }

  setRight(
    right: BinarySearchTreeNode<T, U> | null
  ): BinarySearchTreeNode<T, U> {
    if (right && !(right instanceof BinarySearchTreeNode)) {
      throw new Error('setright expects a BSTNode or null');
    }

    this._right = right || null;
    return this;
  }

  getRight(): BinarySearchTreeNode<T, U> | null {
    return this._right;
  }

  hasRight() {
    return this._right instanceof BinarySearchTreeNode;
  }

  setParent(
    parent: BinarySearchTreeNode<T, U> | null
  ): BinarySearchTreeNode<T, U> {
    if (parent && !(parent instanceof BinarySearchTreeNode)) {
      throw new Error('setparent expects a BSTNode or null');
    }

    this._parent = parent || null;
    return this;
  }

  getParent(): BinarySearchTreeNode<T, U> | null {
    return this._parent;
  }

  hasParent() {
    return this._parent instanceof BinarySearchTreeNode;
  }

  isRoot() {
    return this._parent === null;
  }

  isLeaf() {
    return !this.hasLeft() && !this.hasRight();
  }
}
