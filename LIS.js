// Longest increasing subsequence
// Notes
// Optimal substructure - recursion 
// main problem can be solved by combining solutions to subproblems
// lis ( s[:-1] ) == lis( s ) + 1 if s[-1] > largestSoFar
// lis ( s ) = 1 + lis( s[:-1] ) if s[-1] > max( s[:-1] )
// Overlapping subproblems - memoization ? 
// Unknown, maybe not since it's linear, only 1 piece of memory (max)
// required so not really super memoization like edit distance, or lcs



"use strict";
{
  Object.assign(self, {lis, lism});

  test_lis();

  function lis( s ) {
    if ( s.length == 0 ) {
      return 0;
    } else if ( s.length == 1 ) {
      return 1;
    }
    const maxSoFar = Math.max( ...s.slice(0,-1) );
    const last = s.slice(-1)[0];
    if ( last > maxSoFar ) {
      return 1 + lis( s.slice(0,-1) );
    } else {
      return lis( s.slice(0,-1) );
    }
  }

  function lism( s, m = [0,1] ) {
    if ( Number.isInteger( m[s.length] ) ) {
      return m[s.length];
    } else {
      const maxSoFar = Math.max( ...s.slice(0,-1) );
      const last = s.slice(-1)[0];
      if ( last > maxSoFar ) {
        return m[s.length] = 1 + lism( s.slice(0,-1), m );
      } else {
        return m[s.length] = lis( s.slice(0,-1), m );
      }
    }
  }

  function test_lis() {
    const tests = [
      [ [10,22,9,33,21,50,41,60,80], 6 ],
      [ [1,2,0,-9,4,-23,77], 4 ]
    ];
    tests.forEach( ([a, r]) => console.log(
      lis(a) == r ? 
        `LIS Test ${a} == ${r} passed` : `Test ${a} == ${r} failed`
    ));
    tests.forEach( ([a, r]) => console.log(
      lism(a) == r ? 
        `LIS m Test ${a} == ${r} passed` : `Test ${a} == ${r} failed`
    ));
  }
}
