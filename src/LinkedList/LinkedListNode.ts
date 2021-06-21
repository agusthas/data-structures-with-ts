export default class LinkedListNode<T> {
  private _value: T;
  private _next!: LinkedListNode<T> | null;

  /**
   * Creates a node
   * @param value The value of the node
   * @param next Next element of the node, if ommitted will be set to null.
   */
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this._value = value;
    this._next = next || null;
  }

  /**
   * Sets a node value
   * @param value Value to be set
   * @returns The instance of the node
   */
  setValue(value: any): LinkedListNode<T> {
    this._value = value;
    return this;
  }

  /**
   * @returns The current value of this instance
   */
  getValue(): T {
    return this._value;
  }

  /**
   *
   * @param next New next node, must be of type LinkedListNode or null, otherwise throws an error.
   * @returns Instance of the node.
   * @default null
   */
  setNext(next: LinkedListNode<T> | null): LinkedListNode<T> {
    if (next && !(next instanceof LinkedListNode)) {
      throw new Error('setNext expects a LinkedListNode or null');
    }

    this._next = next || null;
    return this;
  }

  /**
   * Get the next node.
   * @returns LinkedListNode, otherwise null.
   */
  getNext(): LinkedListNode<T> | null {
    return this._next;
  }

  /**
   * Checks if next node exist.
   */
  hasNext(): boolean {
    return this._next instanceof LinkedListNode;
  }
}
