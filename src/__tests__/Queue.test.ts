import { Queue } from '../Queue';

describe('Queue unit tests', () => {
  let queue: Queue<unknown>;

  describe('new Queue()', () => {
    it('creates an empty queue', () => {
      queue = new Queue();
      expect(queue).toBeInstanceOf(Queue);
    });
  });

  describe('Queue.fromArray(lists)', () => {
    it('creates a queue from an existing array', () => {
      const q = Queue.fromArray([1, 2, 3]);
      expect(q.front()).toBe(1);
      expect(q.size()).toBe(3);
    });
  });

  describe('.enqueue(element)', () => {
    it('should enqueue 3 elements to the stack', () => {
      queue.enqueue(1).enqueue(8).enqueue(45);
    });
  });

  describe('.size()', () => {
    it('should have size of 3', () => {
      expect(queue.size()).toBe(3);
    });
  });

  describe('.front()', () => {
    it('should peek the front element', () => {
      expect(queue.front()).toBe(1);
    });
  });

  describe('.back()', () => {
    it('should peek the back element', () => {
      expect(queue.back()).toBe(45);
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe('.clone()', () => {
    it('should clone a queue', () => {
      queue.dequeue();

      const clone = queue.clone();
      clone.dequeue();

      expect(clone.front()).toEqual(45);
      expect(clone.size()).toEqual(1);
      expect(queue.front()).toEqual(8);
      expect(queue.size()).toEqual(2);
    });
  });

  describe('.toArray()', () => {
    it('should convert the queue into array', () => {
      expect(queue.toArray()).toStrictEqual([8, 45]);
    });
  });

  describe('.dequeue()', () => {
    it('should dequeue all elements', () => {
      expect(queue.dequeue()).toEqual(8);
      expect(queue.dequeue()).toEqual(45);
    });
  });

  describe('.clear()', () => {
    it('should clear the queue', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.clear();
      expect(queue.dequeue()).toBeNull();
      expect(queue.front()).toBeNull();
      expect(queue.back()).toBeNull();
      expect(queue.size()).toEqual(0);
      expect(queue.isEmpty()).toStrictEqual(true);
    });
  });
});
