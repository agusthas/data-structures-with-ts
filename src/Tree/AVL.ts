import BST from './BST';
import AVLNode from './AVLNode';

export default class AVL<T extends number | string, U = undefined> extends BST<
  T,
  U
> {
  private _getHeight(current: AVLNode<T, U> | null) {
    if (!current) {
      return 0;
    }

    return current.height;
  }

  private _rotateLeft(current: AVLNode<T, U>) {
    let right = current.right! as AVLNode<T, U>;
    let rightLeft = right.left as AVLNode<T, U>;

    right!.left = current;
    current.right = rightLeft;

    current.height =
      Math.max(
        this._getHeight(current.left as AVLNode<T, U>),
        this._getHeight(current.right as AVLNode<T, U>)
      ) + 1;
    right.height =
      Math.max(
        this._getHeight(right.left as AVLNode<T, U>),
        this._getHeight(right.right as AVLNode<T, U>)
      ) + 1;

    return right;
  }

  private _rotateRight(current: AVLNode<T, U>) {
    let left = current.left! as AVLNode<T, U>;
    let leftRight = left.right as AVLNode<T, U>;

    left.right = current;
    current.left = leftRight;

    current.height =
      Math.max(
        this._getHeight(current.left as AVLNode<T, U>),
        this._getHeight(current.right as AVLNode<T, U>)
      ) + 1;
    left.height =
      Math.max(
        this._getHeight(left.left as AVLNode<T, U>),
        this._getHeight(left.right as AVLNode<T, U>)
      ) + 1;

    return left;
  }

  private _getBalanceFactor(current: AVLNode<T, U>) {
    if (!current) {
      return 0;
    }

    return (
      this._getHeight(current.left as AVLNode<T, U>) -
      this._getHeight(current.right as AVLNode<T, U>)
    );
  }

  private _balance(current: AVLNode<T, U>) {
    if (!current) {
      return null;
    }

    current.height =
      Math.max(
        this._getHeight(current.left as AVLNode<T, U>),
        this._getHeight(current.right as AVLNode<T, U>)
      ) + 1;
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
        return this._rotateRight(current.left as AVLNode<T, U>);
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

  debugging() {
    const printDebug = (
      current: AVLNode<T, U> | null,
      indent: string,
      last: boolean
    ): void => {
      if (current) {
        process.stdout.write(indent);

        if (last) {
          process.stdout.write('R----');
          indent += '    ';
        } else {
          process.stdout.write('L----');
          indent += '|   ';
        }
        process.stdout.write(`${current.key} | ${current.height}\n`);
        printDebug(current!.left as AVLNode<T, U>, indent, false);
        printDebug(current.right as AVLNode<T, U>, indent, true);
      }
    };

    process.stdout.write('\n');
    printDebug(this._root as AVLNode<T, U>, '', true);
  }
}
