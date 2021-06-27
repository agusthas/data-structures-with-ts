import BST from './BST';
import AVLNode from './AVLNode';

export default class AVL<T extends number | string, U = undefined> extends BST<
  T,
  U
> {
  private _getNodeHeight(current: AVLNode<T, U> | null) {
    if (!current) {
      return 0;
    }

    return current.height;
  }

  private _updateHeight(current: AVLNode<T, U>) {
    const left = current.left as AVLNode<T, U>;
    const right = current.right as AVLNode<T, U>;
    return Math.max(this._getNodeHeight(left), this._getNodeHeight(right)) + 1;
  }

  private _rotateLeft(current: AVLNode<T, U>) {
    let right = current.right as AVLNode<T, U>;
    let rightLeft = right.left as AVLNode<T, U>;

    right!.left = current;
    current.right = rightLeft;

    current.height = this._updateHeight(current);
    right.height = this._updateHeight(right);

    return right;
  }

  private _rotateRight(current: AVLNode<T, U>) {
    let left = current.left as AVLNode<T, U>;
    let leftRight = left.right as AVLNode<T, U>;

    left.right = current;
    current.left = leftRight;

    current.height = this._updateHeight(current);
    left.height = this._updateHeight(left);

    return left;
  }

  private _getBalanceFactor(current: AVLNode<T, U>) {
    let left = current.left as AVLNode<T, U>;
    let right = current.right as AVLNode<T, U>;

    return this._getNodeHeight(left) - this._getNodeHeight(right);
  }

  private _balance(current: AVLNode<T, U>) {
    if (!current) {
      return null;
    }

    current.height = this._updateHeight(current);
    let bf = this._getBalanceFactor(current);

    if (bf < -1) {
      if (this._getBalanceFactor(current.right as AVLNode<T, U>) <= 0) {
        return this._rotateLeft(current);
      } else {
        current.right = this._rotateRight(current.right as AVLNode<T, U>);
        return this._rotateLeft(current);
      }
    } else if (bf > 1) {
      if (this._getBalanceFactor(current.left as AVLNode<T, U>) >= 0) {
        return this._rotateRight(current);
      } else {
        current.left = this._rotateLeft(current.left as AVLNode<T, U>);
        return this._rotateRight(current);
      }
    }

    return current;
  }

  add(key: T, value: U) {
    const addRecurse = (
      current: AVLNode<T, U> | null,
      newNode: AVLNode<T, U>
    ): AVLNode<T, U> | null => {
      if (!current) {
        return newNode;
      } else {
        if (current.key > newNode.key) {
          current.left = addRecurse(current.left as AVLNode<T, U>, newNode);
        } else if (current.key < newNode.key) {
          current.right = addRecurse(current.right as AVLNode<T, U>, newNode);
        } else {
          throw new Error(
            `Duplicate keys are not allowed, ${current.key} === ${newNode.key}`
          );
        }
      }

      return this._balance(current);
    };

    const newNode = new AVLNode(key, value);
    this._root = addRecurse(this._root as AVLNode<T, U>, newNode);

    return newNode;
  }

  remove(key: T): any {
    const removeRecursive = (
      current: AVLNode<T, U> | null,
      k: T
    ): AVLNode<T, U> | null => {
      if (!current) {
        return current;
      }
      // traverse left
      else if (k < current.key) {
        current.left = removeRecursive(current.left as AVLNode<T, U>, k);
      }
      // traverse right
      else if (k > current.key) {
        current.right = removeRecursive(current.right as AVLNode<T, U>, k);
      }
      // found
      else {
        // case 1: no left child
        if (!current.left) {
          const temp = current.right as AVLNode<T, U>;
          current = null;
          return temp;
        }
        // case 2: no right child
        else if (!current.right) {
          const temp = current.left as AVLNode<T, U>;
          current = null;
          return temp;
        }

        // case 3: have both left and right
        let temp = current.right as AVLNode<T, U> | null;

        while (!temp) {
          temp = temp!.left as AVLNode<T, U>;
        }

        // copy all properties
        current.key = temp.key;
        current.value = temp.value;
        current.right = removeRecursive(
          current.right as AVLNode<T, U>,
          temp.key
        );
      }

      return this._balance(current);
    };

    this._root = removeRecursive(this._root as AVLNode<T, U>, key);
  }
}
