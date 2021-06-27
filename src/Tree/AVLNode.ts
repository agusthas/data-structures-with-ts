import BSTNode from './BSTNode';

export default class AVLNode<
  T extends number | string,
  U = undefined
> extends BSTNode<T, U> {
  protected _height: number = 1;

  constructor(key: T, value: U) {
    super(key, value);
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
  }

  get rightHeight() {
    return this._right ? (this._right as AVLNode<T, U>).height : 0;
  }

  get leftHeight() {
    return this._left ? (this._left as AVLNode<T, U>).height : 0;
  }

  // get balanceFactor() {
  //   return this.leftHeight - this.rightHeight;
  // }
}
