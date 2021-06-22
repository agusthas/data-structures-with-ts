import DoublyNode from './DoublyNode';

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
