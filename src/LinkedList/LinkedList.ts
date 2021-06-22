import LinkedListNode, { Node, LLNode } from './LinkedListNode';

abstract class LLTemplate<T> {
  protected _head: LinkedListNode<T> | null;
  protected _count: number;

  constructor() {
    this._head = null;
    this._count = 0;
  }

  /**
   * Checks if the current List is empty.
   */
  isEmpty(): boolean {
    return this._head === null;
  }

  /**
   * Returns the head of List.
   */
  head(): Node<T> {
    return this._head;
  }

  /**
   * Returns the count of nodes in the list.
   */
  count(): number {
    return this._count;
  }

  /**
   * Returns the remaining elements as an array.
   */
  toArray(): T[] {
    if (this.isEmpty()) {
      return [];
    }

    let holder: T[] = [];

    let current = this._head!;
    while (current) {
      holder.push(current.getValue());
      current = current.getNext()!;
    }

    return holder;
  }

  /**
   * Remove the first element and returns it.
   */
  removeFirst(): Node<T> {
    if (this.isEmpty()) {
      return null;
    }

    // storing head, then rearrange pointers
    const removed = this._head!;
    this._head = this._head!.getNext();
    this._count--;
    return removed.setNext(null);
  }

  /**
   * Remove the last element and returns it.
   */
  removeLast(): Node<T> {
    if (this.isEmpty()) {
      return null;
    }

    // Get prev, curr
    let prev = null;
    let curr = this._head!;

    while (curr.hasNext()) {
      prev = curr;
      curr = curr.getNext()!;
    }

    // only 1 node (head)
    if (prev === null) {
      return this.removeFirst();
    }

    prev.setNext(null);
    this._count--;
    return curr!;
  }

  /**
   * Insert an element at given position, and returns it.
   * Position should be in range of the list, if given otherwise will throw an error.
   * @param pos - Position where the elements will be inserted to. Head is always in position 0.
   */
  removeAt(pos: number): Node<T> {
    if (pos < 0 || pos > this.count() - 1) {
      throw new RangeError('Invalid position!');
    }

    if (this.isEmpty()) {
      return null;
    }

    let currentPos = 1;
    let prev = null;
    let curr: LinkedListNode<T> | null = this._head!;
    while (currentPos <= pos) {
      currentPos++;
      prev = curr;
      curr = curr!.getNext();
    }

    if (prev === null) {
      return this.removeFirst();
    }

    if (curr === null) {
      return this.removeLast();
    }

    prev.setNext(curr.getNext());
    this._count--;
    return curr.setNext(null);
  }

  /**
   * Traverse the list and applying callback function for each node.
   * @param cb - Callback function
   */
  forEach(cb: (node: LLNode<T>, pos: number) => unknown): void {
    let curr = this._head;
    let currPos = 0;
    while (curr) {
      cb(curr, currPos);
      currPos++;
      curr = curr.getNext();
    }
  }

  /**
   * Find the _first_ node that meets the condition specified in the callback function.
   * @param cb - Callback function.
   */
  find(cb: (node: LLNode<T>, pos: number) => unknown): Node<T> {
    let curr = this._head;
    let currPos = 0;
    while (curr) {
      if (cb(curr, currPos) as boolean) {
        return curr;
      }
      currPos++;
      curr = curr.getNext();
    }

    return null;
  }

  /**
   * Returns a new instance with filtered nodes that meets the condition specified in the callback function.
   * @param cb - Callback function.
   */
  abstract filter(cb: (node: LLNode<T>, pos: number) => unknown): LLTemplate<T>;

  /**
   * Reverse elements of the array and returns the head pointer. Calling this function will **mutate** the list.
   */
  reverse(): LLTemplate<T> {
    let curr = this._head;
    let next: Node<T> = null;
    let prev: Node<T> = null;
    while (curr) {
      // save the next
      next = curr.getNext();
      // set current next to previous, reversing
      curr.setNext(prev);
      // set prev to curr, reversing
      prev = curr;
      // set curr to next
      curr = next;
    }
    this._head = prev;
    return this;
  }

  /**
   * Clears the list.
   */
  clear(): void {
    this._head = null;
    this._count = 0;
  }
}

export default class LinkedList<T> extends LLTemplate<T> {
  constructor() {
    super();
  }

  /**
   * Insert a value as node on the front of the list and returns it.
   * @param value - Value to be inserted
   */
  prepend(value: T): LLNode<T> {
    this._head = new LinkedListNode<T>(value, this._head);
    this._count++;
    return this._head!;
  }

  /**
   * Insert a value as node on the back of the list and returns it. If the lastNode is specified, it will reduce the time it needs to insert.
   * @param value - Value to be inserted
   * @param lastNode - (Optional) The last element of the Lists
   */
  append(value: T, lastNode?: LLNode<T>): LLNode<T> {
    if (this.isEmpty()) {
      return this.prepend(value);
    }

    if (
      (lastNode && !(lastNode instanceof LinkedListNode)) ||
      lastNode === null
    ) {
      throw new Error(
        'append() expects an instance of LinkedListNode as second argument'
      );
    }

    // Loop till the end, then append to the end
    let current = lastNode || this._head!;
    while (current.hasNext()) {
      current = current.getNext()!;
    }

    current.setNext(new LinkedListNode<T>(value));
    this._count++;
    return current.getNext()!;
  }

  /**
   * Insert a value as node in given position and returns it.
   * @param pos - Position to be inserted. Head always start at 0.
   * @param value - Value to be inserted.
   */
  insertAt(pos: number, value: T): LLNode<T> {
    if (pos < 0 || pos > this.count()) {
      throw new RangeError('Invalid position!');
    }

    if (this.isEmpty()) {
      return this.prepend(value)!;
    }

    if (pos === 0) {
      return this.prepend(value)!;
    }

    if (pos === this.count()) {
      return this.append(value)!;
    }

    let currentPos = 1;
    let prev = this._head!;
    while (currentPos < pos) {
      currentPos++;
      prev = prev.getNext()!;
    }

    // add after the head, between prev & prev.getNext();
    prev.setNext(new LinkedListNode<T>(value, prev.getNext()));
    this._count++;
    return prev.getNext()!;
  }

  filter(cb: (node: LLNode<T>, pos: number) => unknown) {
    // creates a new Linked List
    const filtered = new LinkedList<T>();

    let curr = this._head;
    let currPos = 0;
    while (curr) {
      if (cb(curr, currPos) as boolean) {
        filtered.append(curr.getValue());
      }
      currPos++;
      curr = curr.getNext();
    }

    return filtered;
  }
}

export class LinkedListSort<T extends number | string> extends LLTemplate<T> {
  constructor() {
    super();
  }

  /**
   * Sorted insert of value as node and returns it.
   * @param value - Value to be inserted
   */
  insert(value: T): LLNode<T> {
    return this.sortedInsert(new LinkedListNode<T>(value));
  }

  private sortedInsert(newNode: LinkedListNode<T>): LLNode<T> {
    let temp = new LinkedListNode<any>(undefined);
    let current = temp;
    temp.setNext(this._head);

    while (
      current.getNext() &&
      current.getNext()!.getValue() < newNode.getValue()
    ) {
      current = current.getNext()!;
    }

    newNode.setNext(current.getNext());
    current.setNext(newNode);
    this._head = temp.getNext();
    this._count++;
    return this._head!;
  }

  filter(cb: (node: LinkedListNode<T>, pos: number) => unknown): LLTemplate<T> {
    // creates a new Linked List
    const filtered = new LinkedListSort<T>();

    let curr = this._head;
    let currPos = 0;
    while (curr) {
      if (cb(curr, currPos) as boolean) {
        filtered.sortedInsert(new LinkedListNode<T>(curr.getValue()));
      }
      currPos++;
      curr = curr.getNext();
    }

    return filtered;
  }
}
