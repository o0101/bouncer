// Dynamic programming - Edit script
// optimal substructure - recurrence relations can represent the solution because of symmetry
// overlapping subproblems - memoization can save subproblems which are solved again and again in the recursive solution
// The script to convert the second string into the first

"use strict";

{
  Object.assign( self, { editscrm } );

  test_editscr();

  function editscrm( s, t, m = {} ) {
    const key = `${s.length},${t.length}`;
    if ( Array.isArray(m[key]) ) {
      return m[key];
    }
    if ( s.length == 0 ) {
      return m[key] = Array.from(t).map( c => {insert:c} );
    } else if ( t.length == 0 ) {
      return m[key] = Array.from(s).map( c => {insert:c} );
    } else {
      if ( s.slice(-1) == t.slice(-1) ) {
        return m[key] = editscrm(s.slice(0,-1), t.slice(0,-1), m );
      } else {
        const moves = [
          editscrm( s.slice(0,-1), t, m ).concat( {insert: s.slice(-1)} ),
          editscrm( s, t.slice(0,-1), m ).concat( {remove: t.slice(-1)} ),
          editscrm( s.slice(0,-1), t.slice(0,-1), m ).concat( { replace: [t.slice(-1), s.slice(-1)] } )
        ];
        const minCost = Math.min( ...moves.map( m => m.length ) );
        const minCostMove = moves.find( m => m.length == minCost );
        return m[key] = minCostMove;
      }
    }
  }

  function test_editscr() {
    const tests = [
      [ 'geek', 'geesk', 1 ],
      [ 'saturday', 'sunday', 3 ],
      [ 'cattle', 'turkey', 6 ],
      [ 'christopher', 'stringfellow', 10 ]
    ];
    tests.forEach( ([s,t,r]) => console.log((
      console.log(editscrm(s,t)),
      editscrm(s,t).length == r ? `Test editscrm ${s} ${t} == ${r} passed` :
        `Test editscrm ${s} ${t} == ${r} failed`
    )));
  }
}
