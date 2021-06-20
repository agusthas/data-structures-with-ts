/**
 * Class representing a Stack
 *
 * @example
 * // returns an empty stack
 * const stack = new Stack();
 * // returns a stack with given array as elements
 * const stack = new Stack([1, 2, 3, 4, 5]);
 *
 * // returns an empty stack
 * const stack = new Stack<number>();
 * // returns a stack with given array as elements
 * const stack = new Stack<number>([1, 2, 3, 4, 5]);
 */
export default class Stack<T = unknown> {
  /**
   * Private elements of Stack class
   * @private
   */
  private _elements: T[];

  /**
   * Create a stack.
   * @constructor
   * @param elements - The element of the stack, if ommitted will be replaced with empty array.
   */
  constructor(elements?: T[]) {
    this._elements = Array.isArray(elements) ? elements : [];
  }

  /**
   * Appends new element to the end of the stack, and returns the instance.
   * @public
   * @param element - Element to be pushed to the stack.
   * @returns {Stack<T>} Instance of a Stack
   */
  push(element: T): Stack<T> {
    this._elements.push(element);
    return this;
  }

  /**
   * Gets the length of the stack
   * @public
   * @returns {number}
   */
  size(): number {
    return this._elements.length;
  }

  /**
   * Checks if the stack is empty
   * @public
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this._elements.length === 0;
  }

  /**
   * Returns the top element in the stack. If stack is empty, wil return null.
   * @public
   * @returns {null | T}
   */
  peek(): null | T {
    return this.isEmpty() ? null : this._elements[this._elements.length - 1];
  }

  /**
   * Creates a shallow copy from the stack.
   * @public
   * @returns {Stack<T>}
   */
  clone(): Stack<T> {
    return new Stack([...this._elements]);
  }

  /**
   * Removes and returns the top element of the stack. If the stack is empty will return `null`
   * @public
   * @returns {null | T | undefined}
   */
  pop(): null | T {
    return this.isEmpty() ? null : this._elements.pop()!;
  }

  /**
   * Returns elements as an array.
   * @public
   * @returns {T[]}
   */
  toArray(): T[] {
    return [...this._elements];
  }

  /**
   * Clears all elements from the stack.
   * @public
   * @returns {void}
   */
  clear(): void {
    this._elements = [];
  }

  /**
   * Creates a stack from an existing array
   * @example
   * const list = [1, 2, 3, 4];
   * const stack = Stack.fromArray(list); // Returns an instance of Stack with `list` as elements
   *
   * // If mutating the inputted array is a no, then create a shallow copy for the array
   * const stack = Stack.fromArray([...list]); // or
   * const stack = Stack.fromArray(list.slice(1));
   * @static
   * @returns {Stack<A>}
   */
  static fromArray<A>(array: A[]): Stack<A> {
    return new Stack(array);
  }
}
