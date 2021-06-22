export class DoublyNode<T> {
  private _data: T;
  private _prev: DoublyNode<T> | null;
  private _next: DoublyNode<T> | null;

  constructor(data: T, prev = null, next = null) {
    this._data = data;
    this._prev = prev;
    this._next = next;
  }

  setData(value: T): DoublyNode<T> {
    this._data = value;
    return this;
  }

  getData(): T {
    return this._data;
  }

  setPrev(node: DoublyNode<T> | null): DoublyNode<T> {
    if (node && !(node instanceof DoublyNode)) {
      throw new Error('setPrev expects a DoublyNode or null');
    }

    this._prev = node;
    return this;
  }

  getPrev(): DoublyNode<T> | null {
    return this._prev;
  }

  setNext(node: DoublyNode<T> | null): DoublyNode<T> {
    if (node && !(node instanceof DoublyNode)) {
      throw new Error('setNext expects a DoublyNode or null');
    }

    this._next = node;
    return this;
  }

  getNext(): DoublyNode<T> | null {
    return this._next;
  }
}
