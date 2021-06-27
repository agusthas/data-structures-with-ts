import BSTNode from './BSTNode';

export default class BST<T extends number | string, U = undefined> {
  protected _root: BSTNode<T, U> | null = null;

  root() {
    return this._root;
  }

  clear() {
    this._root = null;
  }

  isEmpty() {
    return !(this._root instanceof BSTNode);
  }

  toArray() {
    const arr: { key: T; value: U }[] = [];

    if (!this._root) {
      return arr;
    }

    this.inorderTraversal((n) =>
      arr.push({
        key: n.key,
        value: n.value,
      })
    );

    return arr;
  }

  maximum(current = this._root) {
    if (!current) {
      return null;
    }

    while (current.right) {
      current = current?.right;
    }

    return current;
  }

  minimum(current = this._root) {
    if (!current) {
      return null;
    }

    while (current.left) {
      current = current?.left;
    }

    return current;
  }

  inorderTraversal(cb: (n: BSTNode<T, U>) => void) {
    const inorder = (current: BSTNode<T, U> | null) => {
      if (!current) {
        return;
      }

      inorder(current.left);
      cb(current);
      inorder(current.right);
    };

    inorder(this._root);
  }

  preorderTraversal(cb: (n: BSTNode<T, U>) => void) {
    const preorder = (current: BSTNode<T, U> | null) => {
      if (!current) {
        return;
      }

      cb(current);
      preorder(current.left);
      preorder(current.right);
    };

    preorder(this._root);
  }

  postorderTraversal(cb: (n: BSTNode<T, U>) => void) {
    const postorder = (current: BSTNode<T, U> | null) => {
      if (!current) {
        return;
      }

      postorder(current.left);
      postorder(current.right);
      cb(current);
    };

    postorder(this._root);
  }

  add(key: T, value: U) {
    const newNode = new BSTNode<T, U>(key, value);
    const addRecurse = (current: BSTNode<T, U> | null) => {
      if (!current) {
        return newNode;
      }

      if (key < current.key) {
        current.left = addRecurse(current.left);
      } else if (key > current.key) {
        current.right = addRecurse(current.right);
      } else {
        throw new ReferenceError(
          'Duplicate key found!, do you mean to use update method instead?'
        );
      }

      return current;
    };

    this._root = addRecurse(this._root);
    return newNode;
  }

  remove(key: T) {
    // hacks
    if (!this._root) {
      return null;
    }

    const removed = this.find(key);
    if (!removed) {
      return null;
    }

    const removeRecurse = (current: BSTNode<T, U> | null, k: T) => {
      if (!current) {
        return current;
        // traverse left
      } else if (k < current.key) {
        current.left = removeRecurse(current.left, k);
      }
      // traverse right
      else if (k > current.key) {
        current.right = removeRecurse(current.right, k);
      }
      // found
      else {
        // case 1: no left child
        if (!current.left) {
          const temp = current.right;
          current = null;
          return temp;
        }
        // case 2: no right child
        else if (!current.right) {
          const temp = current.left;
          current = null;
          return temp;
        }

        // case 3: have both left and right
        let minRight = this.minimum(current.right);

        if (!minRight) {
          throw new Error('Right minimum cannot be found');
        }

        // copy all properties
        current.key = minRight.key;
        current.value = minRight.value;
        current.right = removeRecurse(current.right, minRight.key);
      }

      return current;
    };

    this._root = removeRecurse(this._root, key);

    return removed;
  }

  private _findRecurse(current = this._root, k: T): BSTNode<T, U> | null {
    if (!current) {
      return null;
    } else if (current.key > k) {
      return this._findRecurse(current.left, k);
    } else if (current.key < k) {
      return this._findRecurse(current.right, k);
    } else {
      return current;
    }
  }

  find(key: T) {
    return this._findRecurse(this._root, key);
  }

  has(key: T) {
    return !!this._findRecurse(this._root, key);
  }

  update(key: T, newValue: U) {
    let curr = this.find(key);

    if (!curr) {
      return null;
    }

    curr.value = newValue;
    return curr;
  }
}
