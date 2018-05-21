// Dynamic programming - Edit script
// optimal substructure - recurrence relations can represent the solution because of symmetry
// overlapping subproblems - memoization can save subproblems which are solved again and again in the recursive solution

"use strict";

{
  Object.assign( self, { editdistr, editdistm } );

  // I had a feeling ED(s,t) = s.length + t.length - 2*LCS(s,t);
    // But it's not this
    // because we can have replacements if characters are "in the same position"
    // instead of just deleting and inserting
    // But there is probably some way to express ED in terms of LCS or other related
    // The above would be true if we have no replacements 
    // In other words
    // ED(s,t) = s.length + t.length - 2*ALIGNMENT(s,t)
    // since alignment can include SNP

  test_editdist();

  function noreplacement_ed( s, t ) {
    return s.length + t.length - 2*lcsm(s,t);
  }

  function editdistr( s, t ) {
    if ( s.length == 0 ) {
      return t.length;
    } else if ( t.length == 0 ) {
      return s.length;
    } else {
      if ( s.slice(-1) == t.slice(-1) ) {
        return editdistr(s.slice(0,-1), t.slice(0,-1));
      } else {
        return Math.min(
          1 + editdistr( s.slice(0,-1), t ),
          1 + editdistr( s, t.slice(0,-1) ),
          1 + editdistr( s.slice(0,-1), t.slice(0,-1) )
        );
      }
    }
  }

  function editdistm( s, t, m = {} ) {
    const key = `${s.length},${t.length}`;
    if ( Number.isInteger(m[key]) ) {
      return m[key];
    }
    if ( s.length == 0 ) {
      return m[key] = t.length;
    } else if ( t.length == 0 ) {
      return m[key] = s.length;
    } else {
      if ( s.slice(-1) == t.slice(-1) ) {
        return m[key] = editdistm(s.slice(0,-1), t.slice(0,-1), m );
      } else {
        return m[key] = Math.min(
          1 + editdistm( s.slice(0,-1), t, m ),
          1 + editdistm( s, t.slice(0,-1), m ),
          1 + editdistm( s.slice(0,-1), t.slice(0,-1), m )
        );
      }
    }
  }

  function test_editdist() {
    const tests = [
      [ 'geek', 'geesk', 1 ],
      [ 'saturday', 'sunday', 3 ],
      [ 'cattle', 'turkey', 6 ],
      [ 'christopher', 'stringfellow', 10 ]
    ];
    tests.forEach( ([s,t,r]) => console.log(
      editdistm(s,t) == r ? `Test editdistm ${s} ${t} == ${r} passed` :
        `Test editdistm ${s} ${t} == ${r} failed`
    ));
  }
}
