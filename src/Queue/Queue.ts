/**
 * Queue class
 * @class
 */
export default class Queue<T> {
  private _elements: T[];

  private _offset: number;

  /**
   * Creates a queue
   * @constructor
   * @param elements - (Optional) Elements to be inserted, if ommited then instance will have an empty array as elements.
   */
  constructor(elements?: T[]) {
    this._elements = Array.isArray(elements) ? elements : [];
    this._offset = 0;
  }

  /**
   * Add an element to the back of the queue.
   * @param {T} element
   * @returns {Queue<T>}
   */
  enqueue(element: T): Queue<T> {
    this._elements.push(element);
    return this;
  }

  /**
   * Dequeue the front element in the queue and returns it.
   * @returns {null | T}
   */
  dequeue(): null | T {
    if (this.isEmpty()) {
      return null;
    }

    const first = this.front();
    if (first === null) {
      return null;
    }

    this._offset += 1;
    if (this._offset * 2 < this._elements.length) {
      return first;
    }

    this._elements = this._elements.slice(this._offset);
    this._offset = 0;
    return first;
  }

  /**
   * Peek the front element of the queue.
   * @returns {T | null}
   */
  front(): T | null {
    return this.size() > 0 ? this._elements[this._offset] : null;
  }

  /**
   * Peek the back element of the queue.
   * @returns {T | null}
   */
  back(): T | null {
    return this.size() > 0 ? this._elements[this._elements.length - 1] : null;
  }

  /**
   * Gets the current size of the queue.
   * @returns {number}
   */
  size(): number {
    return this._elements.length - this._offset;
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns a shallow copy of the current queue.
   * @returns {Queue<T>}
   */
  clone(): Queue<T> {
    return new Queue([...this._elements.slice(this._offset)]);
  }

  /**
   * Returns elements of the queue as an array.
   * @returns {T[]}
   */
  toArray(): T[] {
    return [...this._elements.slice(this._offset)];
  }

  /**
   * Clears the queue.
   */
  clear(): void {
    this._elements = [];
    this._offset = 0;
  }

  /**
   * Create a queue from an existing array.
   * @param lists
   * @returns {Queue<T>}
   */
  static fromArray<T>(lists: T[]): Queue<T> {
    return new Queue(lists);
  }
}
