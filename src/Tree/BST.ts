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

  private _max(current = this._root) {
    if (!current) {
      return null;
    }

    while (current.right) {
      current = current.right;
    }

    return current;
  }

  maximum() {
    const current = this._max();
    return current && { key: current.key, value: current.value };
  }

  private _min(current = this._root) {
    if (!current) {
      return null;
    }

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  minimum() {
    const current = this._min();
    return current && { key: current.key, value: current.value };
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

  private _addRecursive(newNode: BSTNode<T, U>, current: BSTNode<T, U>) {
    if (newNode.key < current.key) {
      if (current.left) {
        this._addRecursive(newNode, current.left);
      } else {
        newNode.parent = current;
        current.left = newNode;
      }
    } else if (newNode.key > current.key) {
      if (current.right) {
        this._addRecursive(newNode, current.right);
      } else {
        newNode.parent = current;
        current.right = newNode;
      }
    } else {
      throw new Error(
        'Duplicate Key is not allowed. Do you mean to use .update(key, newValue) instead?'
      );
    }
  }

  add(key: T, value: U) {
    const newNode = new BSTNode<T, U>(key, value);
    if (!this._root) {
      this._root = newNode;
    } else {
      this._addRecursive(newNode, this._root);
    }

    return newNode;
  }

  private _removeRecursive(k: T, current: BSTNode<T, U> | null): boolean {
    if (!current) {
      return false;
    }

    // traverse left
    if (k < current.key) {
      return this._removeRecursive(k, current.left);
    }

    // traverse right
    if (k > current.key) {
      return this._removeRecursive(k, current.right);
    }

    // FOUND

    // case 1: if leaf (no children)
    if (!current.left && !current.right) {
      if (!current.parent) {
        this._root = null;
      } else if (k < current.parent.key) {
        current.parent.left = null;
      } else {
        current.parent.right = null;
      }
      return true;
    }

    // case 2: if no right child and have left child
    if (!current.right && current.left) {
      const currLeft = current.left;
      const currParent = current.parent;

      if (!currParent) {
        this._root = currLeft;
      } else if (k < currParent.key) {
        currParent.left = currLeft;
      } else {
        currParent.right = currLeft;
      }

      currLeft.parent = currParent;
      return true;
    }

    // case 3: if no left child and have right child
    if (!current.left && current.right) {
      const currParent = current.parent;
      const currRight = current.right;

      if (!currParent) {
        this._root = currRight;
      } else if (k < currParent.key) {
        currParent.left = currRight;
      } else {
        currParent.right = currRight;
      }

      currRight.parent = currParent;
      return true;
    }

    let min = current.right!;
    while (min.left) {
      min = min.left;
    }
    // let min = this.minimum(current.right);

    // copy properties
    current.key = min.key;
    current.value = min.value;
    return this._removeRecursive(min.key, min);
  }

  remove(key: T) {
    return this._removeRecursive(key, this._root);
  }

  private _findRecurse(k: T, current = this._root): BSTNode<T, U> | null {
    if (!current) {
      return null;
    } else if (current.key > k) {
      return this._findRecurse(k, current.left);
    } else if (current.key < k) {
      return this._findRecurse(k, current.right);
    } else {
      return current;
    }
  }

  find(key: T) {
    const n = this._findRecurse(key);
    return n && { key: n.key, value: n.value };
  }

  has(key: T) {
    return !!this._findRecurse(key);
  }

  update(key: T, newValue: U) {
    let curr = this._findRecurse(key);

    if (!curr) {
      return null;
    }

    curr.value = newValue;
    return { key: curr.key, value: curr.value };
  }
}
