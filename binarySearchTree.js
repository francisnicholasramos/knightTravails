class Tree {
  constructor(arr) {
    const sorted = [...new Set(arr)].sort((a,b) => a - b); // unpack elements (...) and removes duplicates 
    this.root = this.buildTree(sorted)
  }

  buildTree(arr, start=0, end=arr.length-1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2)
    let node = new Node(arr[mid]);

    node.leftChild = this.buildTree(arr, start, mid-1)
    node.rightChild = this.buildTree(arr, mid+1, end)

    return node;
  }

  insert(value, root=this.root) {
    if (root === null) {
      root = new Node(value)
    }

    if (root.value === value) {
      return root;
    }

    if (value < root.value) {
      root.leftChild = this.insert(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.insert(value, root.rightChild)
    }

    return root;
  }

  delete(value, root=this.root) {
    if (root === null) return root;

    // Recursively traverses the BST to find the node
    if (value < root.value) {
      root.leftChild = this.delete(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.delete(value, root.rightChild)
    } 

    // Value matches
    else {
      // option 1: Node has only one child
      if (root.leftChild === null) {
        return root.rightChild;
      } else if (root.rightChild === null) {
        return root.leftChild;
      }

      root.value = this.minValue(root.rightChild); // option 2: Node has two children
      root.rightChild = this.delete(root.value, root.rightChild) // deletes the copy 
    }
    return root;
  }

  find(value, root=this.root) {
    if (root === null || root.value === value) return root;

    if (value < root.value) {
      return this.find(value, root.leftChild);
    } 
    return this.find(value, root.rightChild);
  } 

  levelOrder(arr = [], queue = [], root = this.root) {
    if (root === null) return;
    arr.push(root.value);

    queue.push(root.leftChild);
    queue.push(root.rightChild);

    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(arr, queue, level)
    }

    return arr;
  }

  preOrder(root=this.root, list=[]) {
    if (root === null) return;

    list.push(root.value)
    this.preOrder(root.leftChild, list)
    this.preOrder(root.rightChild, list)
    
    return list
  }

  inOrder(root=this.root, list=[]) {
    if (root === null) return;

    this.inOrder(root.leftChild, list)
    list.push(root.value)
    this.inOrder(root.rightChild, list)

    return list;
  }

  postOrder(root=this.root, list=[]) {
    if (root === null) return;

    this.postOrder(root.leftChild, list)
    this.postOrder(root.rightChild, list)
    list.push(root.value)

    return list;
  }

  // height of the node
  height(value) {
    const node = this.find(value, this.root);
    if (!node) return null;

    function getHeight(root) { 
      if (root === null) return -1;

      let left = getHeight(root.leftChild);
      let right = getHeight(root.rightChild);

      return Math.max(left, right) + 1;
    }

    return getHeight(node);
  }

  // depth of the node
  depth(value, root=this.root, depth=0) {
    if (value === null || root === null) return null;

    if (value === root.value) return `Depth: ${depth}`;
    if (value < root) {
      return this.depth(value, root.leftChild, depth+=1)
    } else {
      return this.depth(value, root.rightChild, depth+=1)
    }
  }

  isBalanced(root=this.root) {
    if (root === null) return true;

    let left = this.heightOfTree(root.leftChild)
    let right = this.heightOfTree(root.rightChild)

    let diff = Math.abs(left - right);
    
    if (diff > 1) return false;

    return this.isBalanced(root.leftChild) && this.isBalanced(root.rightChild);
  }

  rebalance(root=this.root) {
    let arr = this.levelOrder([], [], root);
    arr.sort((a,b) => a - b);
    return this.root = this.buildTree(arr)
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) return;

    if (node.rightChild !== null) {
      this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  log(root = this.root) {
    console.log('Current root:', root.leftChild.value)
  };

  // helper methods
  minValue(root) {
    let min = root.value;

    while (root.leftChild !== null) {
      min = root.leftChild.value;
      root = root.leftChild;
    }
    return min;
  }

  heightOfTree(root=this.root) {
    if (root === null) return -1;
    let left = this.heightOfTree(root.leftChild)
    let right = this.heightOfTree(root.rightChild)
    return Math.max(left, right) +1
  }

}

class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null; 
    this.rightChild = null;
  }
}

// let arr = [27,10,23,2,18,5,9]
let arr = [1,2,3,4,5,6,7]
const tree = new Tree(arr)

console.log(tree.levelOrder())

// console.log('Is Balanced? (1)', tree.isBalanced())
//
// console.log('Pre Order:', tree.preOrder())
// console.log('In Order:', tree.inOrder())
// console.log('Post Order:', tree.postOrder())
// tree.insert(500)
// tree.insert(5660)
// tree.insert(999)
// console.log('Is Balanced? (2)', tree.isBalanced())
// tree.prettyPrint()
// console.log(tree.rebalance())
// console.log('Is Balanced? (3)', tree.isBalanced())
