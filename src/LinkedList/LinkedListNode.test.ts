import LinkedListNode from './LinkedListNode';

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
