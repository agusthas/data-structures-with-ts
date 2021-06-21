import LinkedListNode from './LinkedListNode';

abstract class LLTemplate<T> {
  protected _head: LinkedListNode<T> | null;
  protected _count: number;

  constructor() {
    this._head = null;
    this._count = 0;
  }

  isEmpty(): boolean {
    return this._head === null;
  }

  head(): LinkedListNode<T> | null {
    return this._head;
  }

  count(): number {
    return this._count;
  }

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

  removeFirst(): LinkedListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }

    // storing head, then rearrange pointers
    const removed = this._head!;
    this._head = this._head!.getNext();
    this._count--;
    return removed.setNext(null);
  }

  removeLast() {
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

  removeAt(pos: number) {
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

  forEach(cb: (node: LinkedListNode<T>, pos: number) => unknown): void {
    let curr = this._head;
    let currPos = 0;
    while (curr) {
      cb(curr, currPos);
      currPos++;
      curr = curr.getNext();
    }
  }

  find(
    cb: (node: LinkedListNode<T>, pos: number) => unknown
  ): LinkedListNode<T> | null {
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

  abstract filter(
    cb: (node: LinkedListNode<T>, pos: number) => unknown
  ): LLTemplate<T>;

  reverse() {
    let curr = this._head;
    let next: LinkedListNode<T> | null = null;
    let prev: LinkedListNode<T> | null = null;
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

  clear(): void {
    this._head = null;
    this._count = 0;
  }
}

export class LinkedList<T> extends LLTemplate<T> {
  constructor() {
    super();
  }

  prepend(value: T): LinkedListNode<T> {
    this._head = new LinkedListNode<T>(value, this._head);
    this._count++;
    return this._head!;
  }

  append(value: T, lastNode?: LinkedListNode<T>): LinkedListNode<T> {
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

  insertAt(pos: number, value: T): LinkedListNode<T> {
    if (pos < 0 || pos > this.count()) {
      throw new RangeError('Invalid position!');
    }

    if (this.isEmpty()) {
      return this.prepend(value);
    }

    if (pos === 0) {
      return this.prepend(value);
    }

    if (pos === this.count()) {
      return this.append(value);
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

  filter(cb: (node: LinkedListNode<T>, pos: number) => unknown) {
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

  insert(value: T) {
    return this.sortedInsert(new LinkedListNode<T>(value));
  }

  private sortedInsert(newNode: LinkedListNode<T>) {
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
    return this._head;
  }

  filter(cb: (node: LinkedListNode<T>, pos: number) => unknown) {
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
