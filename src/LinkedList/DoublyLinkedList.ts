import DoublyNode, { Node } from './DoublyNode';

export default class DoublyLinkedList<T> {
  private _head!: Node<T>;
  private _tail!: Node<T>;
  private _size!: number;

  constructor() {
    this.clear();
  }

  public clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  public isEmpty(): boolean {
    return !this._head && !this._tail && this._size === 0;
  }

  public first(): T | null {
    return this._head ? this._head.data : null;
  }

  public peek(): T | null {
    return this.first();
  }

  public last(): T | null {
    return this._tail ? this._tail.data : null;
  }

  public toArray(): T[] {
    if (this.isEmpty()) {
      return [];
    }

    let arr = [];

    for (let i = 0, l = this._size, n = this._head; i < l; i++) {
      arr[i] = n!.data;
      n = n!.next;
    }

    return arr;
  }

  public forEach(
    callbackfn: (value: T, index: number, linkedList: this) => void,
    scope?: this
  ): void {
    if (this.isEmpty()) {
      return;
    }

    scope = arguments.length > 1 ? scope : this;

    let n = this._head,
      i = 0;
    while (n) {
      callbackfn.call(scope, n.data, i, this);
      n = n.next;
      i++;
    }
  }

  public findAt(index: number): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.findNode(index)!.data;
  }

  public sort() {
    // merge 2 nodes
    const mergeRecurse = (first: Node<T>, second: Node<T>): Node<T> => {
      if (!first) {
        return second;
      }

      if (!second) {
        return first;
      }

      if (first.data < second.data) {
        first.next = mergeRecurse(first.next, second)!;
        first.next.prev = first;
        first.prev = null;
        return first;
      }

      second.next = mergeRecurse(first, second.next)!;
      second.next.prev = second;
      second.prev = null;
      return second;
    };

    const split = (head: Node<T>): Node<T> => {
      let fast = head!;
      let slow = head;

      while (fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow!.next;
      }

      if (!slow) {
        throw new Error('slow === null');
      }

      let temp = slow.next;
      slow.next = null;
      return temp;
    };

    const mergeSort = (head: Node<T>): Node<T> => {
      if (!head || !head.next) {
        return head;
      }

      let second = split(head);
      head = mergeSort(head)!;
      second = mergeSort(second)!;

      return mergeRecurse(head, second);
    };

    this._head = mergeSort(this._head);
    return this;
  }

  /** Insertions Method */

  /** */
  public push(...value: T[]): number {
    value.forEach((val) => {
      const node = new DoublyNode<T>(val);
      if (this.isEmpty()) {
        this._head = node;
        this._tail = node;
      } else {
        node.prev = this._tail!;
        this._tail!.next = node;
        this._tail = node;
      }

      this._size++;
    });

    return this._size;
  }

  public unshift(...value: T[]): number {
    value.forEach((val) => {
      const node = new DoublyNode<T>(val);
      if (this.isEmpty()) {
        this._head = node;
        this._tail = node;
      } else {
        if (!this._head!.next) {
          this._tail = this._head;
        }
        node.next = this._head;
        this._head!.prev = node;
        this._head = node;
      }

      this._size++;
    });

    return this._size;
  }

  public insertAt(index: number, value: T): number {
    if (this.isEmpty()) {
      return this.unshift(value);
    }

    let pos = this.getIndex(index);

    if (pos === 0) {
      return this.unshift(value);
    }

    const curr = this.findNode(pos)!;

    // pointer restructure
    const newNode = new DoublyNode<T>(value);
    const p = curr.prev!;

    p.next = newNode;
    newNode.prev = p;
    newNode.next = curr;
    curr.prev = newNode;

    this._size++;
    return this._size;
  }

  /** Deletions Method */

  /** */
  public pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const curr = this._tail!;
    const prev = this._tail!.prev;

    // one element left
    if (prev === null) {
      this._tail = null;
      this._head = null;
      this._size--;
      return curr.data;
    }

    prev.next = null;
    curr.prev = null;
    this._tail = prev;

    this._size--;
    return curr.data;
  }

  public shift(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const curr = this._head!;
    const next = this._head!.next;

    // one element left
    if (next === null) {
      this._tail = null;
      this._head = null;
      this._size--;
      return curr.data;
    }

    next.prev = null;
    curr.next = null;
    this._head = next;

    this._size--;
    return curr.data;
  }

  public removeAt(index: number): T | null {
    if (this.isEmpty()) {
      return null;
    }

    let pos = this.getIndex(index);

    // if first element
    if (pos === 0) {
      return this.shift();
    }

    // if last element
    if (pos === this._size - 1) {
      return this.pop();
    }

    const curr = this.findNode(pos)!;
    // pointer restructure
    const n = curr.next;
    const p = curr.prev;

    if (!n || !p) {
      throw new Error('nani is this');
    }

    p.next = n;
    n.prev = p;
    curr.next = curr.prev = null;

    this._size--;
    return curr.data;
  }

  /** Helpers or convenience known methods */

  /** */
  public static fromArray<T>(array: T[]): DoublyLinkedList<T> {
    const ll = new DoublyLinkedList<T>();
    ll.push(...array);

    return ll;
  }

  private getIndex(index: number): number {
    let pos = index >= 0 ? index : this._size + index;
    if (pos < 0 || pos > this._size - 1) {
      throw new Error('Invalid position');
    }

    return pos;
  }

  private findNode(index: number): Node<T> {
    let pos = this.getIndex(index);
    // check which one is nearest
    let headPos = 0;
    let tailPos = this._size - 1;
    let curr: Node<T>;
    if (pos - headPos < tailPos - pos) {
      // nearest head
      curr = this._head;

      let i = 0;
      while (i < pos && curr) {
        i++;
        curr = curr.next;
      }
    } else {
      // nearest tail
      curr = this._tail;

      let i = this._size - 1;
      while (i > pos && curr) {
        i--;
        curr = curr.prev;
      }
    }

    if (!curr) {
      throw new Error('curr === null');
    }

    return curr;
  }

  // Not needed right now
  // public *generator(from: 'head' | 'tail' = 'head') {
  //   let n: Node<T>;
  //   if (from === 'head') {
  //     n = this._head;
  //     while (n) {
  //       yield n.data;
  //       n = n.next;
  //     }
  //   } else if (from === 'tail') {
  //     n = this._tail;

  //     while (n) {
  //       yield n.data;
  //       n = n.prev;
  //     }
  //   } else {
  //     throw new Error(`${from} is not one of 'head' or 'tail'`);
  //   }

  //   return null;
  // }

  public concat(b: DoublyLinkedList<T>): DoublyLinkedList<T> {
    return DoublyLinkedList.fromArray([...this.toArray(), ...b.toArray()]);
  }
}
