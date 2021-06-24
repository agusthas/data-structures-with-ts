import { DoublyLinkedList, DoublyNode } from '../LinkedList';

describe('DoublyNode unit tests', () => {
  const n1 = new DoublyNode<number>(1);
  const n2 = new DoublyNode<number>(2);
  describe('new DoublyNode()', () => {
    it('should create an instance of DoublyNode', () => {
      expect(n1).toBeInstanceOf(DoublyNode);
      expect(n2).toBeInstanceOf(DoublyNode);
    });
  });

  describe('.data', () => {
    it('set', () => {
      n1.data = 2;
    });

    it('get', () => {
      expect(n1.data).toBe(2);
    });
  });

  describe('.next', () => {
    it('set', () => {
      n1.next = n2;
    });

    it('get', () => {
      expect(n1.next).toBe(n2);
    });
  });

  describe('.prev', () => {
    it('set', () => {
      n2.prev = n1;
    });

    it('get', () => {
      expect(n2.prev).toBe(n1);
    });
  });
});

describe('DoublyLinkedList unit tests', () => {
  let dll = new DoublyLinkedList<number>();

  beforeEach(() => {
    dll.clear();
  });

  it('create instance', () => {
    expect(dll).toHaveProperty('_head', null);
    expect(dll).toHaveProperty('_tail', null);
    expect(dll).toHaveProperty('_size', 0);
  });

  describe('.push(values)', () => {
    it('should push', () => {
      expect(dll.push()).toBe(0);
      expect(dll.push(5)).toBe(1);
      expect(dll.push(3)).toBe(2);

      expect(dll.push(4, 5, 6)).toBe(5);
      expect(dll.first()).toBe(5);
      expect(dll.last()).toBe(6);
    });
  });

  describe('.unshift(values)', () => {
    it('should prepend item to list', () => {
      expect(dll.unshift()).toBe(0);
      expect(dll.unshift(8)).toBe(1);
      expect(dll.unshift(10)).toBe(2);

      expect(dll.unshift(4, 5, 6)).toBe(5);
      expect(dll.first()).toBe(6);
    });
  });

  describe('.pop()', () => {
    it('should removes and returns last element', () => {
      expect(dll.pop()).toBeNull();
      dll.push(1, 2, 3);
      expect(dll.pop()).toBe(3);
      expect(dll.pop()).toBe(2);
      expect(dll.pop()).toBe(1);
      expect(dll.pop()).toBeNull();
    });
  });

  describe('.shift()', () => {
    it('should removes and returns first element', () => {
      expect(dll.shift()).toBeNull();
      dll.push(1, 2, 3);
      expect(dll.shift()).toBe(1);
      expect(dll.shift()).toBe(2);
      expect(dll.shift()).toBe(3);
      expect(dll.shift()).toBeNull();
    });
  });

  describe('.removeAt(index)', () => {
    const inputs = [0, 1, 2, 3, 4, 5];
    const len = inputs.length;
    const index = Math.floor(Math.random() * len);
    const rand = index * Math.round(Math.random() * 2 - 1);
    it(`remove at index ${rand}`, () => {
      dll.push(...inputs);

      const expected = inputs.splice(rand, 1);
      expect(dll.removeAt(rand)).toBe(expected[0]);
    });
  });

  describe('.insertAt(index, value)', () => {
    it('should insert at index', () => {
      dll.insertAt(0, 1);
      dll.insertAt(0, 20);
      dll.insertAt(0, 100);
      dll.insertAt(1, 200);
      dll.insertAt(1, 10);
      dll.insertAt(-1, 50);

      expect(dll.first()).toBe(100);
      expect(dll.last()).toBe(1);
    });
  });

  describe('.find()', () => {
    it('find an element based on index', () => {
      dll.push(1, 2, 3);
      expect(dll.findAt(2)).toBe(3);
      expect(dll.findAt(-1)).toBe(3);
      expect(dll.findAt(0)).toBe(1);
      expect(dll.findAt(-3)).toBe(1);
    });
  });

  describe('static fromArray', () => {
    it('creates a DoublyLinkedList from an array', () => {
      let inputs = [1, 2, 3, 4, 5];
      let ll = DoublyLinkedList.fromArray(inputs);

      expect(ll.toArray()).toStrictEqual(inputs);
    });
  });

  describe('concat', () => {
    it('should concatenate 2 linked list together and returns head', () => {
      let ll = new DoublyLinkedList<number>();
      ll.push(4, 5, 6);
      dll.push(1, 2, 3);
      expect(ll.concat(dll).toArray()).toStrictEqual([4, 5, 6, 1, 2, 3]);
    });
  });

  describe('sort', () => {
    let inputs = [5, 20, 4, 3, 30, 10];
    it('should sort', () => {
      dll.push(...inputs);
      inputs.sort((a, b) => a - b);

      expect(dll.sort().toArray()).toStrictEqual(inputs);
    });
  });
});
