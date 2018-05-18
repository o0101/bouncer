// Iterators for BFS and DFS
// recursive and iterative

"use strict";

{
  { 
    // Iterative BFS 
    class IterativeBFS {
      constructor( tree ) {
        this.tree = tree;
      }
      get [Symbol.iterator]() {
        const tree = this.tree;
        return iterativeBFS;
        function *iterativeBFS() {
          let node = tree.root;
          const queue = [node];
          while( queue.length ) {
            node = queue.pop();
            const children = Array.from(node.children);
            children.reverse();
            queue.unshift( ...children );
            yield node;
          }
        }
      }
    }

    Object.assign( self, { IterativeBFS });

    test_ibfs();

    function test_ibfs() {
      console.log("Testing iterative BFS");
      const tw = new IterativeBFS(t); 
      for(const n of tw) { console.log(n) };
      const ibfs_order = [ ...tw ];
      console.log( ibfs_order );
    }
  }

  {
    // Recursive BFS
    class RecursiveBFS {
      constructor( tree ) {
        this.tree = tree;
      }
      get [Symbol.iterator]() {
        const tree = this.tree;
        return recursiveBFS;
        function *recursiveBFS() {
          const Q = [tree.root];
          yield *recursiveBFS_func(Q);
        }
        function *recursiveBFS_func(queue) {
          if ( queue.length == 0 ) {
            return;
          }
          const node = queue.pop();
          const children = Array.from(node.children);
          children.reverse();
          queue.unshift( ...children );
          yield node;
          yield *recursiveBFS_func(queue);
        }
      }
    }

    Object.assign( self, { RecursiveBFS });

    test_rbfs();

    function test_rbfs() {
      console.log("Testing recursive BFS");
      const tw = new RecursiveBFS(t); 
      for(const n of tw) { console.log(n) };
      const rbfs_order = [ ...tw ];
      console.log( rbfs_order );
    }
  }
}
