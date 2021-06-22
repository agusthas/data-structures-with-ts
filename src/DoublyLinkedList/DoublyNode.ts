export type Node<T> = DoublyNode<T> | null;
export default class DoublyNode<T> {
  private _data: T;
  private _prev: DoublyNode<T> | null;
  private _next: DoublyNode<T> | null;

  constructor(
    data: T,
    prev: DoublyNode<T> | null = null,
    next: DoublyNode<T> | null = null
  ) {
    this._data = data;
    this._prev = prev;
    this._next = next;
  }

  set data(value: T) {
    this._data = value;
  }

  get data(): T {
    return this._data;
  }

  set prev(node: DoublyNode<T> | null) {
    if (node && !(node instanceof DoublyNode)) {
      throw new Error('setPrev expects a DoublyNode or null');
    }

    this._prev = node;
  }

  get prev(): DoublyNode<T> | null {
    return this._prev;
  }

  set next(node: DoublyNode<T> | null) {
    if (node && !(node instanceof DoublyNode)) {
      throw new Error('setNext expects a DoublyNode or null');
    }

    this._next = node;
  }

  get next(): DoublyNode<T> | null {
    return this._next;
  }
}
