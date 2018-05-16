// HashTable implementation for https://github.com/dosyago-coder-0/bouncer
// helper functions are static methods on the class

class HashTable {
  constructor({
    hashFunction: hashFunction = HashTable.basicHash,
    pairsList: pairsList = null,
    numSlots: numSlots = 256,
    maxRatio: maxRatio = 0.75, // load factor ( keys/slots ) at which to grow and rehash
    desiredCollisionProbability: desiredCollisionProbability = NaN,
    ensurePowerOfTwo: ensurePowerOfTwo = false, 
    growthRate: growthRate = 2.0, // how much to multiple the number of slots by at rehashing
    probeStrategy: probeStrategy = 'OPEN_ADDRESSING', // or 'CHAINING'
  } = {}) {
    let numKeys = 0;
    const spec = { 
      numKeys, 
      numSlots, maxRatio, desiredCollisionProbability, ensurePowerOfTwo, 
      probeStrategy, growthRate,
      hashFunction 
    };
    Object.assign( this, spec );
    this.growAndRehashAllEntries( { pairsList, growthRate: 1.0 } );
    console.log("Created HashTable to spec", spec );
  }

  // rehash and grow

    growAndRehashAllEntries( {
      pairsList: pairsList = this.allPairs(),
      growthRate: growthRate = this.growthRate
    } = {} ) {
      this.numSlots = this.calculateNumSlots({ pairsList, growthRate });
      this.slots = new Array( this.numSlots );
      if ( Array.isArray( pairsList ) ) {
        pairsList.forEach( ([key, value]) => this.insert(key, value) );
      }
    }

  allPairs() {
    return [];
  }

  // Sizing calculations

    // The following methods are used to calculate
    // correspondence between slots and keys counts
    // given their ratio or a desired collision probability

    static numSlotsForRatio(r,numKeys) {
      return numKeys / r;
    }
    static numKeysForRatio(r,numSlots) {
      return numSlots * r;
    }

    // the following two formulas are from the 
    // birthday cooincidence probability problem
    // generalized to collissions 
    // from https://en.wikipedia.org/wiki/Birthday_problem#Cast_as_a_collision_problem

    static numSlotsForCollissionProbability(p,numKeys) {
      return (numKeys**2)/(2*Math.log(1/1-p));
    }
    static numKeysForCollissionProbability(p,numSlots) {
      return Math.ceil(Math.sqrt(Math.log(1/(1-p))*2*numSlots));
    }

    static toThisOrNextPowerOfTwo(num) {
      return 2**(Math.ceil(Math.log2(num)));
    }

    calculateNumSlots( {
      pairsList : pairsList = null,
      growthRate : growthRate = this.growthRate
    } = {} ) {

      let minSlots;
      if ( Array.isArray( pairsList ) ) {
        const approxNumKeys = pairsList.length;
        minSlots = HashTable.numSlotsForRatio(this.maxRatio,approxNumKeys);
      }
      minSlots = this.numSlots * growthRate;
      if ( ! Number.isNaN(this.desiredCollisionProbability) && ! Number.isNaN(this.numKeys) ) {
        minSlots = Math.max(minSlots,HashTable.numSlotsForCollisionProbability(this.desiredCollisionProbability, this.numKeys));
      }
      if ( this.ensurePowerOfTwo ) {
        minSlots = HashTable.toThisOrNextPowerOfTwo(minSlots);
      }
      return minSlots;
      
    }
  
  // hash function

    static basicHash( key, seed = 11.37 /* why not? :) */ ) {
      // This code is take from my tifuhash https://github.com/dosyago-coder-0/tifuhash
      const keyString = HashTable.anythingToString( key );
      let n = Array.from(keyString);
      let m = seed;
      if ( n.length == 0 ) {
        // seed only
        n = [m];
      }
      const s = parseFloat(n.length ? n.pop() : 0);
      m = Array.from(m).concat(n);
      const isFloat = m.every(x => !isNaN(parseFloat(x)));
      if ( isFloat ) {
        m = m.map( x => parseFloat(x));
      } else {
        m = HashTable.stringToUTF8Bytes(m.join(''));
      }
      let a=new Float64Array(4);
      a[0] = 1; 
      a[2] = s ? Math.pow(s+1/s, 1/2) : 3;
      a[3] = s ? Math.pow(s+1/s, 1/5) : 7;
      m.forEach((x,i) => {
        a[1] = (x+i+1)/a[3];
        a[2] += a[0]/a[1]; a[2] = 1/a[2];
        a[3] += x; a[3] = a[0]/a[3];
        a[0] = a[1]+1;
      });
      a[2] *= Math.PI+a[3];
      a[3] *= Math.E+a[2];  
      const h = new Uint32Array(a.buffer);
      return (h[4]^h[5]^h[6]^h[7])>>>0;
    }

  // static helpers  

    static stringToUTF8Bytes( s ) {
      const utf8Str = unescape(encodeURIComponent(s));
      return Array.from(utf8Str).map( c => c.charCodeAt(0));
    }
    
    static anythingToString( a ) {
      const type = Object.prototype.toString.call( a );
      let json = '[json:circular]';
      try {
        json = JSON.stringify(a);
      } catch(e) {};
      const str = a+'';
      const numStr = a+0+'';
      const numStrStrict = (a*1)+'';
      const rep = `${type}:${json}:${str}:${numStr}:{numStrStrict}`;
      return rep;   
    }
    
    hashValueToTableSize( hval ) {
      // could also add
      // ( as in Java implementaion to ensure high bits have effect ):
      // hval = hval ^ (hval >> 16);
      return hval % this.numSlots;
    }
}

Object.assign( self, {HashTable});

new HashTable();
