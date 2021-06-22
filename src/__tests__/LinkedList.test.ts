import { LinkedList, LinkedListNode, LinkedListSort } from '../LinkedList';

describe('LinkedListNode unit tests', () => {
  let n1: LinkedListNode<any>;
  let n2: LinkedListNode<any>;
  let n3: LinkedListNode<any>;

  describe('new LinkedListNode()', () => {
    it('should create 3 nodes n1, n2, n3', () => {
      n1 = new LinkedListNode(12);
      n2 = new LinkedListNode(5);
      n3 = new LinkedListNode(100);
      expect(n1).toBeInstanceOf(LinkedListNode);
      expect(n2).toBeInstanceOf(LinkedListNode);
      expect(n3).toBeInstanceOf(LinkedListNode);
    });
  });

  describe('.setNext()', () => {
    it('should set the next node', () => {
      expect(n1.setNext(n2)).toBe(n1);
      expect(n2.setNext(n3)).toBe(n2);
      expect(n1.getNext()).toBe(n2);
      expect(n2.getNext()).toBe(n3);
    });
  });

  describe('.hasNext()', () => {
    it('should return true', () => {
      expect(n1.hasNext()).toStrictEqual(true);
      expect(n2.hasNext()).toStrictEqual(true);
    });

    it('should return false', () => {
      expect(n3.hasNext()).toStrictEqual(false);
    });
  });

  describe('.getNext()', () => {
    it('should return next element', () => {
      expect(n1.getNext()).toBe(n2);
      expect(n2.getNext()).toBe(n3);
    });

    it('should return null', () => {
      expect(n3.getNext()).toBeNull();
    });
  });
});

describe('LinkedList unit test', () => {
  let LL_Prefilled = new LinkedList<number>();
  let LL_Sorted = new LinkedListSort<number>();
  let LL_Empty = new LinkedList<number>();
  let rand: number;
  const prefilled = [1, 2, 3, 4, 5];
  let shallow = [...prefilled];
  const preffiledLength = prefilled.length;

  beforeEach(() => {
    prefilled.reduceRight((_acc, curr) => {
      LL_Prefilled.prepend(curr);
      LL_Sorted.insert(curr);
    }, [] as any);

    rand = Math.floor(Math.random() * 100);
  });

  afterEach(() => {
    LL_Prefilled.clear();
    LL_Empty.clear();
    LL_Sorted.clear();
    shallow = [...prefilled];
  });

  describe('.head()', () => {
    it('should return the head if list present, null otherwise', () => {
      expect(LL_Prefilled.head()!.getValue()).toBe(prefilled[0]);
      expect(LL_Sorted.head()!.getValue()).toBe(prefilled[0]);
      expect(LL_Empty.head()).toBeNull();
    });
  });

  describe('.isEmpty()', () => {
    it('should check if is empty', () => {
      expect(LL_Prefilled.isEmpty()).toBe(false);
      expect(LL_Sorted.isEmpty()).toBe(false);
      expect(LL_Empty.isEmpty()).toBe(true);
    });
  });

  describe('.clear()', () => {
    it('should clear the list', () => {
      LL_Prefilled.clear();
      LL_Sorted.clear();
      expect(LL_Prefilled.isEmpty()).toBe(true);
      expect(LL_Sorted.isEmpty()).toBe(true);
    });
  });

  describe('.count()', () => {
    it('should return the count of nodes in list', () => {
      expect(LL_Prefilled.count()).toBe(preffiledLength);
      expect(LL_Sorted.count()).toBe(preffiledLength);
      expect(LL_Empty.count()).toBe(0);
    });
  });

  describe('.toArray()', () => {
    it('should return an array', () => {
      expect(LL_Prefilled.toArray()).toStrictEqual(prefilled);
      expect(LL_Sorted.toArray()).toStrictEqual(prefilled);
      expect(LL_Empty.toArray()).toStrictEqual([]);
    });
  });

  describe('.prepend(value)', () => {
    it('should prepends node to lists', () => {
      expect(LL_Empty.prepend(rand).getValue()).toBe(rand);
      expect(LL_Empty.toArray()).toStrictEqual([rand]);

      expect(LL_Prefilled.prepend(rand).getValue()).toBe(rand);
      expect(LL_Prefilled.toArray()).toStrictEqual([rand, ...shallow]);
    });
  });

  describe('.append(value, lastNode?)', () => {
    it('should appends node to lists', () => {
      expect(LL_Empty.append(rand).getValue()).toBe(rand);
      expect(LL_Empty.toArray()).toStrictEqual([rand]);

      const last4 = LL_Prefilled.append(4);
      const last5 = LL_Prefilled.append(5, last4);

      expect(last4.getValue()).toBe(4);
      expect(last5.getValue()).toBe(5);
      expect(LL_Prefilled.toArray()).toStrictEqual([
        ...shallow,
        last4.getValue(),
        last5.getValue(),
      ]);
    });
  });

  describe('.insertAt(pos, value)', () => {
    it(`should insert at random position`, () => {
      const p = Math.floor(Math.random() * preffiledLength);
      shallow.splice(p, 0, rand);
      expect(LL_Prefilled.insertAt(p, rand).getValue()).toBe(rand);

      expect(LL_Prefilled.toArray()).toStrictEqual(shallow);
    });

    it('[edge case]: should insert at 0', () => {
      const p = 0;
      expect(LL_Prefilled.insertAt(p, rand).getValue()).toBe(rand);
      expect(LL_Prefilled.toArray()).toStrictEqual([rand, ...shallow]);
    });

    it('[edge case]: should insert at last', () => {
      const p = preffiledLength;
      expect(LL_Prefilled.insertAt(p, rand).getValue()).toBe(rand);
      expect(LL_Prefilled.toArray()).toStrictEqual([...shallow, rand]);
    });
  });

  describe('.insert(value) in SortedLinkedList', () => {
    const len = 10;
    let inputs: number[] = Array.from({ length: len }, (_, i) =>
      Math.floor(Math.random() * 100)
    );
    it('should insert then sort', () => {
      const expected = [...shallow, ...inputs].sort((a, b) => (a < b ? -1 : 1));
      inputs.forEach((v) => {
        LL_Sorted.insert(v);
      });

      expect(LL_Sorted.toArray()).toStrictEqual(expected);
    });
  });

  describe('.forEach(cb)', () => {
    it('should apply cb for each node', () => {
      let expected = prefilled.map((x) => x * 2);
      let results: number[] = [];
      LL_Prefilled.forEach((n) => results.push(n.getValue() * 2));

      expect(results).toStrictEqual(expected);
    });
  });

  describe('.find(cb)', () => {
    it('finds the first node that returns true from the callback', () => {
      const p = Math.floor(Math.random() * preffiledLength);
      LL_Prefilled.insertAt(p, rand);
      const results = LL_Prefilled.find((n) => n.getValue() === rand);

      expect(results).not.toBeNull();
      expect(results!.getValue()).toBe(rand);
    });
  });

  describe('.filter(cb)', () => {
    let flag: (a: number) => boolean;
    const tests = (a: any) => {
      expect(flag(a.getValue())).toBe(true);
    };
    const filterCb = (n: any) => flag(n.getValue());

    const testsLL = () => {
      const filtered = LL_Prefilled.filter(filterCb);
      const filteredSort = LL_Sorted.filter(filterCb);

      filtered.forEach(tests);
      filteredSort.forEach(tests);
      expect(filtered.toArray()).toStrictEqual(prefilled.filter(flag));
      expect(filteredSort.toArray()).toStrictEqual(
        shallow.filter(flag).sort((a, b) => a - b)
      );
    };

    const [min, max] = [1, 5];
    const rand = Math.floor(Math.random() * (max - min + 1)) + 1;

    it('Returns the node of list that meet the condition specified in a callback function', () => {
      flag = (a: number) => a > rand;
      testsLL();
    });

    it('Returns the node of list that is less than', () => {
      flag = (a: number) => a < rand;
      testsLL();
    });

    it('Returns the node of list that is equal', () => {
      flag = (a: number) => a === rand;
      testsLL();
    });
  });

  describe('.removeFirst()', () => {
    it('(LinkedList) should remove the first element', () => {
      const removed = LL_Prefilled.removeFirst()!;

      expect(removed.getValue()).toBe(shallow.shift());
      expect(removed.getNext()).toBeNull();

      expect(LL_Prefilled.count()).toBe(shallow.length);
      expect(LL_Prefilled.toArray()).toStrictEqual(shallow);
    });

    it('(LinkedListSortedInsert) should remove the first element', () => {
      const removed = LL_Sorted.removeFirst()!;

      expect(removed.getValue()).toBe(shallow.shift());
      expect(removed.getNext()).toBeNull();

      expect(LL_Sorted.count()).toBe(shallow.length);
      expect(LL_Sorted.toArray()).toStrictEqual(shallow);
    });
  });

  describe('.removeLast()', () => {
    it('(LinkedList) should remove and returns last node in the list', () => {
      const removed = LL_Prefilled.removeLast()!;

      expect(removed.getValue()).toBe(shallow.pop());
      expect(removed.getNext()).toBeNull();
      expect(LL_Prefilled.toArray()).toStrictEqual(shallow);
    });

    it('(LinkedListSortedInsert) should remove and returns last node in the list', () => {
      const removed = LL_Sorted.removeLast()!;

      expect(removed.getValue()).toBe(shallow.pop());
      expect(removed.getNext()).toBeNull();
      expect(LL_Sorted.toArray()).toStrictEqual(shallow);
    });
  });

  describe('.removeAt()', () => {
    // check kalo remove yang paling depan dan belakang
    const tests = (p: number) => {
      const removed = LL_Prefilled.removeAt(p)!;
      const removedSort = LL_Sorted.removeAt(p)!;
      const expValue = shallow.splice(p, 1)[0];

      expect(removed.getValue()).toBe(expValue);
      expect(removed.getNext()).toBeNull();
      expect(removedSort.getValue()).toBe(expValue);
      expect(removedSort.getNext()).toBeNull();
      expect(LL_Prefilled.toArray()).toStrictEqual(shallow);
      expect(LL_Sorted.toArray()).toStrictEqual(shallow);
    };

    it('should remove node at given position and returns it', () => {
      const p = Math.floor(Math.random() * preffiledLength);
      tests(p);
    });

    it('[edge cases]: remove at 0', () => {
      const p = 0;
      tests(p);
    });

    it('[edge cases]: remove last', () => {
      const p = preffiledLength - 1;
      tests(p);
    });

    it('[edge cases]: invalid position', () => {
      const p =
        Math.random() < 0.5 ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

      expect(() => LL_Prefilled.removeAt(p)).toThrow();
    });
  });

  describe('.reverse()', () => {
    it('should reverse the list', () => {
      expect(LL_Prefilled.reverse().toArray()).toStrictEqual(shallow.reverse());
      expect(LL_Sorted.reverse().toArray()).toStrictEqual(shallow);
    });
  });
});
