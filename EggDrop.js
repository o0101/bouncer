// Egg drop
// Recursion
// Optimal substructure
// floors and eggs
// Drop an egg from a floor. 
// What's the minimum number of drops to 
// determine the floor at which eggs break?
// ed(f, e)
// we have e eggs and drop 1 at floor x
// if egg breaks then
// x - 1 floors and e - 1 eggs left
// if egg doesn't break then
// f - x floors and e eggs left
// So we want the minimum number of trials
// ( in the worst case )
// So we need the max of the two possibilities
// And minimize it over the number of floors 
// because what else to minimize over ? 
// So dt(f, e) = 1 + min(max(dt(x - 1, e - 1), dt(f - x, e))): x in [1...f]
// So recursion and memoization

"use strict";
{
  Object.assign( self, {ed, edr, edm});

  test_ed();

  function ed() {

  }

  function edr() {

  }

  function edm() {

  }

  function test_ed() {

  }
}
