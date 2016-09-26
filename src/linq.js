/* @license
 * linq for javascript
 * Authors: Anstinus@gmail.com
 * License: MIT
 */

///////////////////////////////// merge sort algo ///////////////////////////////////////////

// scan the whole seqence and divide then into sub sequences, each of which
// is natually ordered or contains equal iterms (depend on 'compGroupChecker').
function* genSubSequences(seq, comp, compGroupChecker) {
  let lastVal;
  let subSeq = [];
  for (let val of seq) {
    if (subSeq.length == 0) {
      subSeq = [val];
    } else if (compGroupChecker(comp(lastVal, val))) {
      subSeq.push(val);
    } else { // lastVal > val
      yield subSeq;
      subSeq = [val];
    }
    lastVal = val;
  }
  if (subSeq && subSeq.length != 0) {
    yield subSeq;
  }
}

function isUndefinedOrNull(val) {
  return val === undefined || val === null;
}

// merge values of two sorted sequences into one sequence
function* genTwoMergedSequence(seq1, seq2, comp) {
  let seqIter1 = seq1[Symbol.iterator]();
  let seqIter2 = seq2[Symbol.iterator]();
  let elem1 = seqIter1.next();
  let elem2 = seqIter2.next();
  while (true) {
    if (elem1.done && elem2.done) {
      return;
    } else if (elem1.done && !elem2.done) {
      yield elem2.value;
      elem2 = seqIter2.next();
    } else if (!elem1.done && elem2.done) {
      yield elem1.value;
      elem1 = seqIter1.next();
    } else {
      if (isUndefinedOrNull(elem1.value)) {
        yield elem1.value;
        elem1 = seqIter1.next();
      } else if (isUndefinedOrNull(elem2.value)) {
        yield elem2.value;
        elem2 = seqIter2.next();
      } else if (comp(elem1.value, elem2.value) <= 0) {
        yield elem1.value;
        elem1 = seqIter1.next();
      } else {
        yield elem2.value;
        elem2 = seqIter2.next();
      }
    }
  }
}

// merge sequences in pairs. generate a new sequence of sequences.
function* genPairMergedSequences(firstSeq, secondSeq, seqIter, comp) {
  let seq1 = firstSeq;
  let seq2 = secondSeq;
  while (true) {
    let localSeq1 = seq1;
    let localSeq2 = seq2;
    yield {
      [Symbol.iterator]: function () {
        return genTwoMergedSequence(localSeq1, localSeq2, comp)
      }
    };

    let elem1 = seqIter.next();
    if (elem1.done) {
      return;
    }
    let elem2 = seqIter.next();
    if (elem2.done) {
      yield elem1.value;
      return;
    }
    seq1 = elem1.value;
    seq2 = elem2.value;
  }
}

// repeatly merge sub sequences until only one left
function* genMergedAndSortedSequence(seqIter, comp) {
  while (true) {
    let firstElem = seqIter.next();
    if (firstElem.done) { // empty seq of seqs. so the result should also be empty.
      return;
    }

    let secondElem = seqIter.next();
    if (secondElem.done) { // only one seq in seq. just use values in it.
      yield * firstElem.value[Symbol.iterator]();
      return;
    }

    seqIter = genPairMergedSequences(firstElem.value, secondElem.value, seqIter, comp);
  }
}

// merge sort algo return an iterator
function genMergeSort(seq, comp) {
  // divide values into sub sequences each of which is natually ordered
  let seqIter = genSubSequences(seq, comp, x => x <= 0);
  // merge all these sub sequences
  return genMergedAndSortedSequence(seqIter, comp);
}

// the sort algo is complicated. I want to test each sub functions
// without export them. so, here is the work around...
export var _mergeSortTestPack = {
  genSubSequences,
  genTwoMergedSequence,
  genMergedAndSortedSequence,
  genMergeSort
};

///////////////////////////////// helpers for OrderBy()  /////////////////////////////////////

const OrderByTempObjectValName = '_orderByVal_';

let keyOrValueIter2ValueIter = function* (keyOrValueIter) {
  let elem;
  while (!(elem = keyOrValueIter.next()).done) {
    let keyOrVal = elem.value;
    yield keyOrVal[OrderByTempObjectValName] || keyOrVal;
  }
}

let keyOrValueSeq2ValueSeq = function (keyOrValueSeq) {
  return {
    [Symbol.iterator]: function () {
      return keyOrValueIter2ValueIter(keyOrValueSeq[Symbol.iterator]());
    }
  }
}

let orderByImpl = function* (seq, options) {
  if (options.length == 0) throw 'Logic error. "options.length" should not be 0.'

  // for current orderBy/thenBy
  // if custom @keySelector is used, we will create a new sequence of
  // objects with key and value.
  // so we could ensure keys are only to be arquired once during sorting.
  let [keySelector, comp, isKeyDefault] = options[0];
  let keyOrValSeq = seq;
  let keyOrValComp = comp;
  if (!isKeyDefault) {
    keyOrValComp = (x, y) => comp(x.key, y.key);
    keyOrValSeq = {
        [Symbol.iterator]: function* () {
        for (let val of seq) {
          let key = keySelector(val);
          yield {
            key: key,
            [OrderByTempObjectValName]: val
          };
        }
      }
    }
  }
  // sort
  let sortedKeyOrValIter = genMergeSort(keyOrValSeq, keyOrValComp);

  // check remaining options
  let remainingOptions = options.slice(1);
  if (remainingOptions.length === 0) {
    // no more thenBy, just return the result
    yield * keyOrValueIter2ValueIter(sortedKeyOrValIter);
  } else {
    // more thenBy.
    // group by current key first and sort each group by remaining sort options
    let seqIter = genSubSequences(sortedKeyOrValIter, keyOrValComp, x => x == 0);
    let elem;
    while (!(elem = seqIter.next()).done) {
      let subSeq = elem.value;
      let subSortedSeqIter = orderByImpl(keyOrValueSeq2ValueSeq(subSeq), remainingOptions);
      yield * keyOrValueIter2ValueIter(subSortedSeqIter);
    }
  }
}

let createSortOption = function (keySelector, comp) {
  let isKeyDefault = !keySelector;
  keySelector = keySelector || (x => x);
  return [keySelector, comp, isKeyDefault];
}

///////////////////////////////// Other helpers for Enumerable class /////////////////////////////////////

let defaultComp = (x, y) => (x === y ? 0 : (x < y ? -1 : 1));
let defaultEqual = (x, y) => x === y;
let defaultPred = x => true;
let defaultSelector = x => x;
let defaultTrans = x => x;

function joinImpl(
  _this,
  other,
  thisKeySelector,
  otherKeySelector,
  binaryTrans,
  equal,
  isGroupJoin) {
  if (other === undefined || other === null) {
    throw 'must provide a "right" sequence for join()';
  }
  return new Enumerable(function* () {
    // optimization consideration:
    // we assume 'this' have few duplicated keys while 'other' have many.
    // so we group 'other' to reduce compare times.
    // we should not group 'this' anyway because we need to make the result
    // be stable for 'this'.
    let yGroups = asEnumerable(other).groupBy(otherKeySelector);
    for (let x of _this) {
      for (let yg of yGroups) {
        let xKey = thisKeySelector(x);
        let yKey = yg.key;
        if (equal(xKey, yKey)) {
          let ySeq = yg;
          if (isGroupJoin) {
            yield binaryTrans(x, ySeq);
          } else {
            for (let y of ySeq) {
              yield binaryTrans(x, y);
            }
          }
        }
      }
    }
  });
}

///////////////////////////////// Enumerable class for building chain /////////////////////////////////////

class Enumerable {
  constructor(iterator, baseObject) {
    this[Symbol.iterator] = iterator;
    if (baseObject) {
      this._baseObject = baseObject;
    }
  }

  _isBaseObjectRandomlyAccessible() {
    return this._baseObject &&
      (Array.isArray(this._baseObject) || typeof this._baseObject === 'string');
  }

  _clone() {
    let result = new Enumerable(this[Symbol.iterator], this._baseObject);
    result._orderByOptions = this._orderByOptions.asEnumerable().toArray();
    return result;
  }

  /////////////////////////////////// chain operations ///////////////////////////////////

  skip(n) {
    if (!Number.isInteger(n)) {
      throw '@n must be an integer.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let startYield = false;
      let count = n;
      for (let x of _this) {
        if (count-- <= 0) {
          startYield = true;
        }
        if (startYield) {
          yield x;
        }
      }
    });
  }

  skipWhile(pred) {
    if (typeof pred !== 'function') {
      throw '@pred must be a function.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let startYield = false;
      let index = 0;
      for (let x of _this) {
        if (!pred(x, index++)) {
          startYield = true;
        }
        if (startYield) {
          yield x;
        }
      }
    });
  }

  take(n) {
    if (!Number.isInteger(n)) {
      throw '@n must be an integer.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let count = n;
      for (let x of _this) {
        if (count-- > 0) {
          yield x;
        } else {
          break;
        }
      }
    });
  }

  takeWhile(pred) {
    if (typeof pred !== 'function') {
      throw '@pred must be a function.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let index = 0;
      for (let x of _this) {
        if (pred(x, index++)) {
          yield x;
        } else {
          break;
        }
      }
    });
  }

  reverse() {
    let _this = this;
    return new Enumerable(function* () {
      let buf;
      if (_this._isBaseObjectRandomlyAccessible()) {
        buf = _this._baseObject;
      } else {
        buf = [];
        for (let x of _this) {
          buf.push(x);
        }
      }

      for (let i = buf.length - 1; i >= 0; i--) {
        yield buf[i];
      }
    });
  }

  select(trans) {
    if (typeof trans !== 'function') {
      throw '@trans must be a function.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let index = 0;
      for (let x of _this) {
        yield trans(x, index++);
      }
    })
  }

  where(pred) {
    if (typeof pred !== 'function') {
      throw '@pred must be a function.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let index = 0;
      for (let x of _this) {
        if (pred(x, index++)) {
          yield x;
        }
      }
    });
  }

  selectMany(genSeq, resultTrans) {
    if (typeof genSeq !== 'function') {
      throw '@genSeq must be a function.';
    }
    let _this = this;
    return new Enumerable(function* () {
      let index = 0;
      for (let x of _this) {
        let seq = genSeq(x, index++);
        if (resultTrans) {
          yield resultTrans(x, seq);
        } else {
          for (let y of seq) {
            yield y;
          }
        }
      }
    });
  }

  groupBy(keySelector = defaultSelector, valueSelector = defaultSelector, resultTrans, keyEqual) {
    let _this = this;
    if (keyEqual) { // for custom @keyEqual
      return new Enumerable(function* () {
        let groups = [];
        for (let x of _this) {
          let key = keySelector(x);
          let val = valueSelector(x);
          // this is a linear searching that makes this branch slow than the branch with default @keyEqual
          let existingGroup = asEnumerable(groups).firstOrDefault(g => keyEqual(key, g.key));
          if (!existingGroup) {
            existingGroup = {
              key: key,
              values: []
            };
            groups.push(existingGroup);
          }
          existingGroup.values.push(val);
        }
        for (let group of groups) {
          if (resultTrans) {
            yield resultTrans(group.key, group.values);
          } else {
            let result = asEnumerable(group.values);
            result.key = group.key;
            yield result;
          }
        }
      });
    } else { // optimization for default @keyEqual
      return new Enumerable(function* () {
        let seqMap = new Map();
        for (let x of _this) {
          let key = keySelector(x);
          let val = valueSelector(x);
          if (!seqMap.has(key)) {
            seqMap.set(key, []);
          }
          seqMap.get(key).push(val);
        }
        for (let [key, valSeq] of seqMap) {
          if (resultTrans) {
            yield resultTrans(key, valSeq);
          } else {
            let result = asEnumerable(valSeq);
            result.key = key;
            yield result;
          }
        }
      });

    }
  }

  orderBy(keySelector, comp = defaultComp) {
    // we use external merge sort algo here. It is
    // 1. Only need to do one pass scan of the sequence, which is required
    // in linq chain.
    // 2. It could fit into the executing logic of 'generator' perfectly,
    // resulting a totally lazy orderBy().
    let _this = this;
    var result = new Enumerable(function* () {
      let iter = orderByImpl(_this, this._orderByOptions);
      yield * iter;
    });
    result._orderByOptions = [createSortOption(keySelector, comp)];
    return result;
  }


  orderByDescending(keySelector, comp = defaultComp) {
    return this.orderBy(keySelector, (x, y) => -comp(x, y));
  }

  thenBy(keySelector, comp = defaultComp) {
    if (!this._orderByOptions) {
      throw 'thenBy() must follow an orderBy()/thenBy().';
    }
    // should copy current Enumerable object instead of modify it.
    // the current enumerable object may be used again somewhere else.
    let result = this._clone();
    result._orderByOptions.push(createSortOption(keySelector, comp));
    return result;
  }

  thenByDescending(keySelector, comp = defaultComp) {
    return this.thenBy(keySelector, (x, y) => -comp(x, y));
  }

  join(
    other,
    thisKeySelector = defaultSelector,
    otherKeySelector = defaultSelector,
    resultTrans = (x, y) => [x, y],
    equal = defaultEqual) {
    return joinImpl(this, other, thisKeySelector, otherKeySelector, resultTrans, equal, false);
  }

  groupJoin(
    other,
    thisKeySelector = defaultSelector,
    otherKeySelector = defaultSelector,
    resultTrans = (x, ySeq) => [x, ySeq],
    equal = defaultEqual) {
    return joinImpl(this, other, thisKeySelector, otherKeySelector, resultTrans, equal, true);
  }

  zip(other, resultTrans = (x, y) => [x, y]) {
    if (!other) {
      throw 'must provide @other';
    }
    let _this = this;
    return new Enumerable(function* () {
      let iter1 = _this[Symbol.iterator]();
      let iter2 = other[Symbol.iterator]();
      let elem1, elem2;
      while (!(elem1 = iter1.next()).done && !(elem2 = iter2.next()).done) {
        yield resultTrans(elem1.value, elem2.value);
      }
    });
  }

  /////////////////////////////////// sequence chain operations ///////////////////////////////////

  concat(other) {
    if (!other) {
      throw 'must provide @other';
    }
    let _this = this;
    return new Enumerable(function* () {
      for (let x of _this) {
        yield x;
      }
      for (let y of other) {
        yield y;
      }
    });
  }

  otherThan(other, equal) {
    if (!other) {
      throw 'must provide @other';
    }
    if (equal) {
      let otherCache = asEnumerable(other).distinct().eval();
      return this.where(x => otherCache.all(y => !equal(x, y)));
    } else { // optimization for default === compare
      let otherSet;
      return this.where(x => {
        if (!otherSet) { // optimizae for this is empty
          otherSet = asEnumerable(other).toSet();
        }
        return !otherSet.has(x);
      });
    }
  }

  /////////////////////////////////// set chain operations ///////////////////////////////////

  distinct(equal) {
    let _this = this;

    if (equal) {
      return new Enumerable(function* () {
        let generated = [];
        for (let x of _this) {
          if (asEnumerable(generated).all(y => !equal(x, y))) {
            generated.push(x);
            yield x;
          }
        }
      });
    } else {
      return new Enumerable(function* () {
        let valSet = new Set();
        for (let x of _this) {
          if (valSet.size !== valSet.add(x).size) {
            yield x;
          }
        }
      });
    }
  }

  union(other, equal) {
    if (!other) {
      throw 'must provide @other';
    }
    return this.concat(other).distinct(equal);
  }

  intersect(other, equal) {
    if (!other) {
      throw 'must provide @other';
    }
    if (equal) {
      let otherCache = asEnumerable(asEnumerable(other).toArray());
      return this.where(x => otherCache.any(y => equal(x, y)));
    } else {
      let otherSet;
      return this.where(x => {
        if (!otherSet) { // put this in loop to optimize when this is empty
          otherSet = asEnumerable(other).toSet();
        }
        return otherSet.has(x);
      }).distinct();
    }
  }

  except(other, equal) {
    if (!other) {
      throw 'must provide @other';
    }
    return this.distinct().otherThan(other, equal);
  }

  /////////////////////////////////// eval operations ///////////////////////////////////

  all(pred) {
    if (typeof pred !== 'function') {
      throw 'must provide @pred';
    }
    let index = 0;
    for (let x of this) {
      if (!pred(x, index++)) return false;
    }
    return true;
  }

  any(pred = x => true) {
    let index = 0;
    for (let x of this) {
      if (pred(x, index++)) return true;
    }
    return false;
  }

  singleOrDefault(pred = x => true, throwWhenNotFound) {
    let chosen;
    let alreadyMet = false;
    let index = 0;
    for (let x of this) {
      if (pred(x, index++)) {
        if (alreadyMet) {
          throw 'more than one element match.';
        } else {
          alreadyMet = true;
          chosen = x;
        }
      }
    }
    if (throwWhenNotFound && !alreadyMet) {
      throw 'no element found for specified @pred.';
    }
    return chosen;
  }

  single(pred = x => true) {
    return this.singleOrDefault(pred, true);
  }

  count(pred) {
    // optimize for array
    if (!pred && this._isBaseObjectRandomlyAccessible()) {
      return this._baseObject.length;
    }

    pred = pred || (x => true);
    let result = 0;
    for (let x of this) {
      if (pred(x)) {
        result++;
      }
    }
    return result;
  }

  contains(val, comp = (x, y) => x === y) {
    return this.any(x => comp(x, val));
  }

  elementAtOrDefault(index, throwWhenNotFound) {
    if (!Number.isInteger(index)) {
      throw '@index must be an integer';
    }

    if (this._isBaseObjectRandomlyAccessible()) {
      if (throwWhenNotFound && (index < 0 || index >= this._baseObject.length)) {
        throw 'No element found at specified index.';
      }
      return this._baseObject[index];
    }

    let currentIndex = 0;
    for (let x of this) {
      if (currentIndex++ === index) {
        return x;
      }
    }
    if (throwWhenNotFound) {
      throw 'No element found at specified index.';
    }
  }

  elementAt(index) {
    return this.elementAtOrDefault(index, true);
  }

  firstOrDefault(pred = x => true, throwWhenNotFound) {
    let index = 0;
    for (let x of this) {
      if (pred(x, index++)) {
        return x;
      }
    }
    if (throwWhenNotFound) {
      throw 'no elment found for specified @pred';
    }
  }

  first(pred = x => true) {
    return this.firstOrDefault(pred, true);
  }


  lastOrDefault(pred, throwWhenNotFound) {
    let isDefaultPred = !pred;
    pred = pred || (x => true);

    // optimization for Array
    if (this._isBaseObjectRandomlyAccessible()) {
      let index = this._baseObject.length;
      while (index-- > 0) {
        var x = this._baseObject[index];
        if (pred(x, index)) {
          return x;
        }
      }
      if (throwWhenNotFound) {
        throw 'no element found for specified @pred';
      }
      return undefined;
    }

    // optimization for simple last()
    // we only need one element buf
    if (isDefaultPred) {
      let buf;
      let notEmpty = false;
      for (let x of this) {
        notEmpty = true;
        buf = x;
      }
      if (throwWhenNotFound && !notEmpty) {
        throw 'no element found for specified @pred';
      }
      return buf;
    }

    // normal
    return this.reverse().firstOrDefault(pred, throwWhenNotFound);
  }

  last(pred) {
    return this.lastOrDefault(pred, true);
  }

  defaultIfEmpty(val) {
    return this.any() ? this : (val === undefined ? empty() : asEnumerable([val]));
  }

  sequenceEqual(other, comp = (x, y) => x === y) {
    let iter1 = this[Symbol.iterator]();
    let iter2 = other[Symbol.iterator]();
    let elem1, elem2;
    while (true) {
      elem1 = iter1.next();
      elem2 = iter2.next();
      if (elem1.done || elem2.done) break;
      if (!comp(elem1.value, elem2.value)) {
        return false;
      }
    }
    return elem1.done && elem2.done;
  }

  _minMaxImpl(keySelector, comp) {
    let minMaxKey = undefined;
    let minMaxItem = undefined;
    let index = 0;
    for (let item of this) {
      let key = keySelector(item, index++);
      if (minMaxKey === undefined) {
        [minMaxKey, minMaxItem] = [key, item];
      } else {
        if (comp(key, minMaxKey)) {
          [minMaxKey, minMaxItem] = [key, item];
        }
      }
    }
    return minMaxKey;
  }

  min(keySelector = x => x) {
    return this._minMaxImpl(keySelector, (x, y) => x < y);
  }

  max(keySelector = x => x) {
    return this._minMaxImpl(keySelector, (x, y) => x > y);
  }

  sum(trans = x => x) {
    let result = 0;
    let index = 0;
    for (let x of this) {
      result += trans(x, index++);
    }
    return result;
  }

  average(trans = x => x) {
    let result = 0;
    let count = 0;
    let index = 0;
    for (let x of this) {
      result += trans(x, index++);
      count++;
    }
    return count === 0 ? 0 : result / count;
  }



  aggregate(seed, aggFunc, resultTrans) {
    if (seed === undefined && aggFunc === undefined) {
      throw 'must provide @seed only (treat as @aggFunc) or both @seed and @aggFunc with optional @resultTrans';
    }

    let iter = this[Symbol.iterator]();

    // provide overload:  aggregate(aggFunc)
    if (seed && !aggFunc && !resultTrans) {
      aggFunc = seed;
      seed = iter.next().value;
    }

    resultTrans = resultTrans || (x => x);
    while (true) {
      let elem = iter.next();
      if (elem.done) {
        return resultTrans(seed);
      } else {
        seed = aggFunc(seed, elem.value);
      }
    }
  }

  eval() {
    return asEnumerable(this.toArray());
  }

  toArray() {
    let result = [];
    for (let x of this) {
      result.push(x);
    }
    return result;
  }

  toSet() {
    let result = new Set();
    for (let x of this) {
      result.add(x);
    }
    return result;
  }

  toMap(keySelector, valueSelector) {
    return new Map(this.select(x => [keySelector(x), valueSelector(x)]));
  }

  forEach(op) {
    if (typeof op !== 'function') {
      throw '@op must be a function.';
    }

    for (let x of this) {
      op(x);
    }
  }
}

export function asEnumerable(obj) {
  // for suffix form
  if (obj === undefined) {
    obj = this;
  }
  // an optimization to avoid uneccessary Enumerable object
  if (Enumerable.prototype.isPrototypeOf(obj)) {
    return obj;
  }
  // must be iteratable to be used with linq.
  if (!(obj[Symbol.iterator]())) {
    throw 'Object does not have a [iterator]. It cannot be used with asEnumerable()';
  }
  return new Enumerable(function* () {
    yield * obj[Symbol.iterator]();
  }, obj);
};

export function installAsEnumerable(constructor) {
  if (constructor) {
    constructor.prototype.asEnumerable = asEnumerable;
  } else {
    // Note: Do not install asEnumerable directly to Object.prototype
    // many code (e.g. angular.ui.router) would create a clean object and
    // enumerate all function members of an object and try to call all
    // of them which including this unexpected 'asEnumerable' function.
    String.prototype.asEnumerable = Array.prototype.asEnumerable = asEnumerable;
  }
}

export function range(start, count) {
  return new Enumerable(function* () {
    for (let i = start; i < start + count; i++) {
      yield i;
    }
  });
}

export function repeat(val, count) {
  return new Enumerable(function* () {
    let localCount = count;
    while (localCount-- > 0) {
      yield val;
    }
  });
}

export function empty() {
  return new Enumerable(function* () {});
}
