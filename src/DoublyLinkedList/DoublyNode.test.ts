import DoublyNode from './DoublyNode';

describe('DoublyNode unit tests', () => {
  const n1 = new DoublyNode<number>(1);
  const n2 = new DoublyNode<number>(2);
  const n3 = new DoublyNode<number>(3);
  describe('new DoublyNode()', () => {
    it('should create an instance of DoublyNode', () => {
      expect(n1).toBeInstanceOf(DoublyNode);
      expect(n2).toBeInstanceOf(DoublyNode);
      expect(n3).toBeInstanceOf(DoublyNode);
    });
  });

  describe('.getData()', () => {
    it('should get the data', () => {
      expect(n1.getData()).toBe(1);
      expect(n2.getData()).toBe(2);
      expect(n3.getData()).toBe(3);
    });
  });

  describe('.setData()', () => {
    it('should update the data', () => {
      n1.setData(10);
      expect(n1.getData()).toBe(10);
    });
  });

  describe('.setNext()', () => {
    it('should set the next node', () => {
      const next = n1.setNext(n2);
      expect(next).toBe(n1);
    });
  });

  describe('.getNext()', () => {
    it('should get the next node', () => {
      expect(n1.getNext()).toBe(n2);
    });
  });

  describe('.setPrev()', () => {
    it('should set previous node', () => {
      expect(n2.setPrev(n1)).toBe(n2);
    });
  });

  describe('.getPrev()', () => {
    it('should get previous node', () => {
      expect(n2.getPrev()).toBe(n1);
    });
  });
});
