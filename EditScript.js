// Dynamic programming - Edit script
// optimal substructure - recurrence relations can represent the solution because of symmetry
// overlapping subproblems - memoization can save subproblems which are solved again and again in the recursive solution

"use strict";

{
  Object.assign( self, { lcs, lcsm } );

  // longest common subsequence
  function lcs( s, t ) {
    if ( s.length == 0 || t.length == 0 ) {
      return 0;
    } else if ( s.substr(-1) == t.substr(-1) ) {
      return 1 + lcs(s.slice(0,-1), t.slice(0,-1));
    } else {
      return Math.max( lcs(s.slice(0,-1), t), lcs(s, t.slice(0,-1) ) );
    }
  }

  // lcs with memoization
  function lcsm( s, t, m = {} ) {
    const key = `${s.length},${t.length}`;
    if ( m[key] ) {
      return m[key];
    } else {
      if ( s.length == 0 || t.length == 0 ) {
        return 0;
      } else if ( s.substr(-1) == t.substr(-1) ) {
        return m[key] = 1 + lcsm(s.slice(0,-1), t.slice(0,-1), m );
      } else {
        return m[key] = Math.max( lcsm(s.slice(0,-1), t, m), lcsm(s, t.slice(0,-1), m ) );
      }
    }
  }
}
