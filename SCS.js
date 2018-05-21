// shortest common supersequence
// like lcs but includes characters from the other strings
// key thing to realize is that
// the length of scs is the total length of the two strings
// less the length of the lcs
// because each lcs occurs in both strings
// so they "overlap" and only need to be in the scs once
// optimal substructure - even tho we can just do a difference
// i want to try my mind at coming up with a recursion
// scs( s, t ) = 2 + scs( s[:-1], t[:-1] ) if s[-1] != t[-1]
// scs( s, t ) = 1 + Math.min( scs( s, t[:-1] ), scs(s[:-1], t ) ) 
// if s[-1] == t[-1]
// if s == 0 or t == 0 then scs(s,t) == 1 but if 
// s == 0 and t == 0 then scs(s.t) == 0
// i don't think this is right, but i'll try it against
// the correct solution later

{
  Object.assign( self, {scs, scsm});

  test_scs();

  function scs(s, t) {
    return s.length + t.length - lcsm(s, t);
  }

  function scsr(s, t) {
    if ( s.length == 0 && t.length == 0 ) {
      return 0;
    } else if ( s.length == 0 || t.length == 0 ) {
      return Math.max( s.length, t.length );
    }
    if ( s.slice(-1) == t.slice(-1) ) {
      return 1 + scsr( s.slice(0,-1), t.slice(0,-1) );
    } else {
      // The reason this is 1
      // not 2 is because we are subtracting 1 for either of the strings
      // in the two recursions
      return 1 + Math.min( scsr( s.slice(0,-1), t ), scsr( s, t.slice(0,-1) ) );
    }
  }

  function scsm(s, t, m = {}) {
    const key = `${s.length},${t.length}`;
    if ( Number.isInteger(m[key]) ) {
      return m[key];
    } else {
      if ( s.length == 0 && t.length == 0 ) {
        return m[key] = 0;
      } else if ( s.length == 0 || t.length == 0 ) {
        return m[key] = Math.max( s.length, t.length );
      }
      if ( s.slice(-1) == t.slice(-1) ) {
        return m[key] = 1 + scsm( s.slice(0,-1), t.slice(0,-1), m );
      } else {
        return m[key] = 1 + Math.min( scsm( s.slice(0,-1), t, m ), 
            scsm( s, t.slice(0,-1), m ) );
      }
    }
  }

  function test_scs() {
    const tests = [
      [ 'AGGTAB', 'GXTXAYB', 9 ],
      [ 'geek', 'eke', 5 ],
      [ 'CrisStringfellow', 'MinimumFellowString', 28 ]
    ];
    tests.forEach( ([s, t, r]) => console.log(
      scs(s, t) == r ? `Test scs ${s} ${t} == ${r} passed` :
        `Tests scs ${s} ${t} == ${r} failed`
    ));
    /* 
      tests.forEach( ([s, t, r]) => console.log(
        scsr(s, t) == r ? `Test scsr ${s} ${t} == ${r} passed` :
          `Tests scsr ${s} ${t} == ${r} failed`
      ));
    */
    tests.forEach( ([s, t, r]) => console.log(
      scsm(s, t) == r ? `Test scsm ${s} ${t} == ${r} passed` :
        `Tests scsm ${s} ${t} == ${r} failed`
    ));
  }
}
