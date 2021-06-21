import Stack from './Stack';

describe('stack tests', () => {
  const stack = new Stack<number | string>();

  describe('.push(element)', () => {
    it('should push elements to the top of the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push('3th');
    });
  });

  describe('.size()', () => {
    it('should have length of 3', () => {
      expect(stack.size()).toStrictEqual(3);
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(stack.isEmpty()).toStrictEqual(false);
    });
  });

  describe('.peek()', () => {
    it('should return null if stack is empty', () => {
      let myStack: Stack<any> | null = new Stack();
      expect(myStack!.peek()).toBeNull();
      myStack = null;
    });

    it('should peek the top element', () => {
      expect(stack.peek()).toStrictEqual('3th');
    });
  });

  describe('.toArray()', () => {
    it('returns an array copy', () => {
      expect(stack.toArray()).toStrictEqual([1, 2, '3th']);
    });
  });

  describe('.clone()', () => {
    it('clones the stack', () => {
      const clone = stack.clone();
      clone.pop();

      expect(stack.peek()).toStrictEqual('3th');
      expect(clone.peek()).toStrictEqual(2);
    });
  });

  describe('.pop()', () => {
    it('should return null when stack is empty', () => {
      let myStack: Stack<number | string> | null = new Stack();
      expect(myStack.pop()).toBeNull();
      myStack = null;
    });

    it('should pop the elements', () => {
      expect(stack.pop()).toStrictEqual('3th');
      expect(stack.pop()).toStrictEqual(2);
    });
  });

  describe('.clear()', () => {
    it('should clear the stack', () => {
      stack.clear();
      expect(stack.pop()).toStrictEqual(null);
      expect(stack.peek()).toStrictEqual(null);
      expect(stack.size()).toStrictEqual(0);
      expect(stack.isEmpty()).toStrictEqual(true);
    });
  });

  describe('Stack.fromArray(list)', () => {
    it('creates a stack from an existing array', () => {
      const s = Stack.fromArray([1, 2, 3]);
      expect(s.peek()).toStrictEqual(3);
      expect(s.size()).toStrictEqual(3);
    });
  });
});
