/** Class representing a Stack. */
export default class Stack<T = unknown> {
  /**
   * Private elements of Stack class
   * @private
   */
  private _elements: T[];

  /**
   * Create a stack.
   * @param elements - The element of the stack, if ommitted will be replaced with empty array.
   */
  constructor(elements?: T[]) {
    this._elements = Array.isArray(elements) ? elements : [];
  }

  /**
   * Appends new element to the end of the stack, and returns the instance.
   * @param element - Element to be pushed to the stack.
   */
  push(element: T): Stack<T> {
    this._elements.push(element);
    return this;
  }

  /** Gets the length of the stack */
  size(): number {
    return this._elements.length;
  }

  /** Checks if the stack is empty  */
  isEmpty(): boolean {
    return this._elements.length === 0;
  }

  /** Returns the top element in the stack */
  peek(): null | T {
    return this.isEmpty() ? null : this._elements[this._elements.length - 1];
  }

  /** Creates a shallow copy from the stack. */
  clone(): Stack<T> {
    return new Stack([...this._elements]);
  }

  /** Removes and returns the top element of the stack. */
  pop(): null | T | undefined {
    return this.isEmpty() ? null : this._elements.pop();
  }

  /** Returns elements as an array.  */
  toArray(): T[] {
    return [...this._elements];
  }

  /** Clears all elements from the stack */
  clear(): void {
    this._elements = [];
  }

  /** Creates a stack from an existing array */
  static fromArray<A>(array: A[]): Stack<A> {
    return new Stack(array);
  }
}
