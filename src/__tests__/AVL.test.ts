import { AVL } from '../Tree';

describe('AVL unit test', () => {
  let avl: AVL<number, string>;

  function buildTree1() {
    avl.add(80, 'n1');
    avl.add(40, 'n1');
    avl.add(100, 'n1');
    avl.add(30, 'n1');
    avl.add(50, 'n1');
    avl.add(45, 'n1');
    avl.add(55, 'n1');

    const root = avl.root()!;
    expect(root.key).toBe(50);
    expect(root.left!.key).toBe(40);
    expect(root.right!.key).toBe(80);

    expect(root.left!.left!.key).toBe(30);
    expect(root.left!.right!.key).toBe(45);

    expect(root.right!.left!.key).toBe(55);
    expect(root.right!.right!.key).toBe(100);
  }

  function buildTree2() {
    avl.add(100, 'n1');
    avl.add(80, 'n1');
    avl.add(200, 'n1');
    avl.add(110, 'n1');
    avl.add(250, 'n1');
    avl.add(220, 'n1');
    avl.add(300, 'n1');

    const root = avl.root()!;
    expect(root.key).toBe(200);
    expect(root.left!.key).toBe(100);
    expect(root.right!.key).toBe(250);

    expect(root.left!.left!.key).toBe(80);
    expect(root.left!.right!.key).toBe(110);

    expect(root.right!.left!.key).toBe(220);
    expect(root.right!.right!.key).toBe(300);
  }

  beforeEach(() => {
    avl = new AVL();
  });

  describe('.add(key, value)', () => {
    it('add node berat kiri', () => {
      buildTree1();
    });

    it('add node berat kanan', () => {
      buildTree2();
    });
  });

  describe('.remove(key)', () => {
    it('remove node berat kiri', () => {
      buildTree1();

      avl.remove(100);
      expect(avl.find(100)).toBeNull();
    });

    it('remove node berat kanan', () => {
      buildTree2();

      avl.remove(100);
      expect(avl.find(100)).toBeNull();
    });
  });
});
