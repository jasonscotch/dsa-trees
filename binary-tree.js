/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0;
    }
    function traverse(node, depth) {
      if (!node.left && !node.right) {
        return depth;
      }
      let leftDepth = Number.MAX_SAFE_INTEGER;
      let rightDepth = Number.MAX_SAFE_INTEGER;

      if (node.left) {
        leftDepth = traverse(node.left, depth + 1);
      }
      if (node.right) {
        rightDepth = traverse(node.right, depth + 1);
      }
      return Math.min(leftDepth, rightDepth);
    }
    return traverse(this.root, 1);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    }
    function traverse(node, depth) {
      if (!node.left && !node.right) {
        return depth;
      }
      let leftDepth = 0;
      let rightDepth = 0;

      if (node.left) {
        leftDepth = traverse(node.left, depth + 1);
      }
      if (node.right) {
        rightDepth = traverse(node.right, depth + 1);
      }
      return Math.max(leftDepth, rightDepth);
    }
    return traverse(this.root, 1);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = 0;
    function traverse(node) {
      if (!node) {
        return 0;
      }

      let leftSum = Math.max(0, traverse(node.left));
      let rightSum = Math.max(0, traverse(node.right));

      maxSum = Math.max(maxSum, leftSum + rightSum + node.val);
      return Math.max(leftSum, rightSum) + node.val;
    }
    traverse(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;
    function traverse(node) {
      if (node) {
        traverse(node.left);
        if (node.val > lowerBound) {
          if (result === null || node.val < result) {
            result = node.val;
          }
        }
        traverse(node.right);
      }
    }
    traverse(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    
    function bfsTraverse(root, target) {
      const queue = [{ node: root, parent: null, level: 0 }];

      while (queue.length > 0) {
        const { node, parent, level } = queue.shift();

        if (node === target) {
          return { parent, level };
        }
        if (node.left) {
          queue.push({ node: node.left, parent: node, level: level + 1 });
        }
        if (node.right) {
          queue.push({ node: node.right, parent: node, level: level + 1});
        }
      }
      return null;
    }
    const info1 = bfsTraverse(this.root, node1);
    const info2 = bfsTraverse(this.root, node2);

    if (info1 && info2) {
      return info1.level === info2.level && info1.parent !== info2.parent;
    }
    return false;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
