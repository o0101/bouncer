// Binary Search Tree

"use strict";

{
  class BSTInorder {
    constructor( tree, { showNodes: showNodes = false } = {}) {
      this.showNodes = showNodes;
      this.tree = tree;
    }
    get [Symbol.iterator]() {
      const that = this;
      return function *traverser() {
        yield *recursive_inorder_dfs(this.tree.root);
      };
      function *recursive_inorder_dfs(node) {
        if ( !! node.left ) {
          yield *recursive_inorder_dfs(node.left);
        }
        if ( that.showNodes ) {
          yield node;
        } else {
          yield node.data;
        }
        if ( !! node.right ) {
          yield *recursive_inorder_dfs(node.right);
        }
      }
    }
  }

  class BinarySearchTree {
    constructor( ) {
      this.root = { data: null, left: null, right: null };
      this.numKeys = 0;
    }
    static fullEmptyOfHeight( h ) {
      const b = new this;
      const total = 2**h - 1;
      let i = 1;
      const queue = [b.root];
      while( i < total ) {
        const left = { data : null, left: null, right: null };
        const right = { data : null, left: null, right: null };
        queue.unshift( right, left );
        const node = queue.pop(); 
        Object.assign( node, {left, right} );
        i += 2;
      }
      return b;
    }
    insert(item) {
      const newNode = { data:item, left: null, right: null };
      const p = this.findParent(item);
      if ( item == p.data ) {
        // already inserted
        return true;
      } else if ( p.data == null ) {
        this.numKeys += 1;
        p.data = item;
        return true;
      } else if ( item < p.data ) {
        if ( ! p.left ) {
          this.numKeys += 1;
          p.left = newNode;
          return true;
        } 
        return false;
      } else if ( item > p.data ) {
        if ( ! p.right ) {
          this.numKeys += 1;
          p.right = newNode;
          return true;
        }
        return false;
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
        if ( node.data == item || node.data == null ) {
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
      const idealHeight = Math.ceil(Math.log2(this.numKeys));
      const newTree = BinarySearchTree.fullEmptyOfHeight(idealHeight);
      const newIterator = new BSTInorder(newTree, {showNodes: true});
      const thisIterator = new BSTInorder(this);
      const inorder = [ ...thisIterator ];
      for ( const node of newIterator ) {
        if ( inorder.length == 0 ) {
          break;
        }
        node.data = inorder.shift();
      }
      this.root = newTree.root;
    }
    toString() {
      return JSON.stringify(this.root, ['left', 'data', 'right'], 2 );
    }
  }

  Object.assign(self, {BinarySearchTree, BSTInorder});
  
  test_bst();

  function test_bst() {
    console.log("Testing BST...");
    const b = new BinarySearchTree();
    const list = new Array(15).join('.').split('.').map( (_,i) => i );
    list.forEach( i => b.insert(i) );
    console.log(b);
    Object.assign(self, {b});
    const tw = new BSTInorder(b);
    console.log( ...tw );
    console.log(b+'');
    b.rebalance();
    console.log(b+'');
  }
}
