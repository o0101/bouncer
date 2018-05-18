// Binary Search Tree

"use strict";

{
  class BinarySearchTree {
    constructor() {
      this.root = { data: null, left: null, right: null };
    }
    insert(item) {
      const newNode = { data:item, left: null, right: null };
      const p = this.findParent(item);
      if ( item == p.data ) {
        // already inserted
        return true;
      } else if ( item < p.data ) {
        if ( ! p.left ) {
          p.left = newNode;
        } 
      } else if ( item > p.data ) {
        if ( ! p.right ) {
          p.right = newNode;
        }
      }
    }
    has(item) {
      const p = this.findParent(item);
      if ( !! p && p.data == item ) {
        return true;
      }
      return false;
    }
    findParent(item) {
      let node = this.root;
      let p = node;
      while( !! node ) {
        if ( node.data == item ) {
          return node;
        } else if ( item < node.data ) {
          p = node;
          node = node.left;
        } else if ( item > node.data ) {
          p = node;
          node = node.right;
        }
      }
      return p;
    }
    rebalance() {
      // create an empty binary tree
      // copy the tree across
    }
  }

  Object.assign(self, {BinarySearchTree});
  
  function test_bst() {
    const b = new BinarySearchTree();
    b.insert(1);
    b.insert(2);
    b.insert(3);
    b.insert(4);
    b.insert(5);
    console.log(b);
  }
}
