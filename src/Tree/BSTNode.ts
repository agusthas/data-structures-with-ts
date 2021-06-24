export default class BSTNode<T extends number | string, U = undefined> {
  protected _key: T;
  protected _left: BSTNode<T, U> | null = null;
  protected _right: BSTNode<T, U> | null = null;
  protected _parent: BSTNode<T, U> | null = null; // butuh parent biar bisa return lebih flexible nanti nya di tree;
  public value: U;

  constructor(key: T, value: U) {
    this._key = key;
    this.value = value;
  }

  public set key(key: T) {
    this._key = key;
  }

  public get key() {
    return this._key;
  }

  public set parent(parent: BSTNode<T, U> | null) {
    this._parent = parent;
  }

  public get parent() {
    return this._parent;
  }

  public set left(left: BSTNode<T, U> | null) {
    this._left = left;
  }

  public get left() {
    return this._left;
  }

  public set right(right: BSTNode<T, U> | null) {
    this._right = right;
  }

  public get right() {
    return this._right;
  }
}
