export type Node<T> = LinkedListNode<T> | null;
export interface LLNode<T> {
  /**
   * Sets a node value
   * @param value Value to be set
   * @returns The instance of the node
   */
  setValue(value: T): LLNode<T>;

  /**
   * Gets the current value of the node
   */
  getValue(): T;

  /**
   * Sets the next node to a new node
   * @param next New next node, must be of type LinkedListNode or null, otherwise throws an error.
   * @returns Instance of the node.
   */
  setNext(next: unknown): LLNode<T>;

  /**
   * Gets the next node
   * @returns - Node, or null if next node is absent.
   */
  getNext(): Node<T>;

  /**
   * Checks if next node exist.
   */
  hasNext(): boolean;
}
export default class LinkedListNode<T> implements LLNode<T> {
  private _value: T;
  private _next!: Node<T>;

  /**
   * Creates a node
   * @param value - The value of the node
   * @param next - Next element of the node, if ommitted will be set to `null`.
   */
  constructor(value: T, next?: Node<T>) {
    this._value = value;
    this._next = next || null;
  }

  setValue(value: T) {
    this._value = value;
    return this;
  }

  getValue(): T {
    return this._value;
  }

  setNext(next: Node<T>) {
    if (next && !(next instanceof LinkedListNode)) {
      throw new Error('setNext expects a LinkedListNode or null');
    }

    this._next = next || null;
    return this;
  }

  getNext() {
    return this._next;
  }

  hasNext(): boolean {
    return this._next instanceof LinkedListNode;
  }
}
