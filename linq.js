(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/symbol/iterator', 'babel-runtime/core-js/number/is-integer', 'babel-runtime/core-js/map', 'babel-runtime/core-js/set'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('babel-runtime/helpers/class-call-check'), require('babel-runtime/regenerator'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/symbol/iterator'), require('babel-runtime/core-js/number/is-integer'), require('babel-runtime/core-js/map'), require('babel-runtime/core-js/set'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._classCallCheck, global._regeneratorRuntime, global._getIterator, global._Symbol$iterator, global._Number$isInteger, global._Map, global._Set);
    global.linq = mod.exports;
  }
})(this, function (exports, _babelRuntimeHelpersClassCallCheck, _babelRuntimeRegenerator, _babelRuntimeCoreJsGetIterator, _babelRuntimeCoreJsSymbolIterator, _babelRuntimeCoreJsNumberIsInteger, _babelRuntimeCoreJsMap, _babelRuntimeCoreJsSet) {
  /* @license
   * linq for javascript
   * Authors: Anstinus@gmail.com
   * License: MIT
   */

  'use strict';

  exports.__esModule = true;
  exports.asEnumerable = asEnumerable;
  exports.installAsEnumerable = installAsEnumerable;
  exports.range = range;
  exports.repeat = repeat;
  exports.empty = empty;
  var marked0$0 = [genSubSequences, genTwoMergedSequence, genPairMergedSequences, genMergedAndSortedSequence].map(_babelRuntimeRegenerator['default'].mark);

  function genSubSequences(seq, comp, compGroupChecker) {
    var lastVal, subSeq, _iterator, _isArray, _i, _ref, val;

    return _babelRuntimeRegenerator['default'].wrap(function genSubSequences$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          lastVal = undefined;
          subSeq = undefined;
          _iterator = seq, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _babelRuntimeCoreJsGetIterator['default'](_iterator);

        case 3:
          if (!_isArray) {
            context$1$0.next = 9;
            break;
          }

          if (!(_i >= _iterator.length)) {
            context$1$0.next = 6;
            break;
          }

          return context$1$0.abrupt('break', 28);

        case 6:
          _ref = _iterator[_i++];
          context$1$0.next = 13;
          break;

        case 9:
          _i = _iterator.next();

          if (!_i.done) {
            context$1$0.next = 12;
            break;
          }

          return context$1$0.abrupt('break', 28);

        case 12:
          _ref = _i.value;

        case 13:
          val = _ref;

          if (!(lastVal === undefined)) {
            context$1$0.next = 18;
            break;
          }

          subSeq = [val];
          context$1$0.next = 25;
          break;

        case 18:
          if (!compGroupChecker(comp(lastVal, val))) {
            context$1$0.next = 22;
            break;
          }

          subSeq.push(val);
          context$1$0.next = 25;
          break;

        case 22:
          context$1$0.next = 24;
          return subSeq;

        case 24:
          subSeq = [val];

        case 25:
          lastVal = val;

        case 26:
          context$1$0.next = 3;
          break;

        case 28:
          if (!subSeq) {
            context$1$0.next = 31;
            break;
          }

          context$1$0.next = 31;
          return subSeq;

        case 31:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  function genTwoMergedSequence(seq1, seq2, comp) {
    var seqIter1, seqIter2, elem1, elem2;
    return _babelRuntimeRegenerator['default'].wrap(function genTwoMergedSequence$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          seqIter1 = _babelRuntimeCoreJsGetIterator['default'](seq1);
          seqIter2 = _babelRuntimeCoreJsGetIterator['default'](seq2);
          elem1 = seqIter1.next();
          elem2 = seqIter2.next();

        case 4:
          if (!true) {
            context$1$0.next = 32;
            break;
          }

          if (!(elem1.done && elem2.done)) {
            context$1$0.next = 9;
            break;
          }

          return context$1$0.abrupt('return');

        case 9:
          if (!(elem1.done && !elem2.done)) {
            context$1$0.next = 15;
            break;
          }

          context$1$0.next = 12;
          return elem2.value;

        case 12:
          elem2 = seqIter2.next();
          context$1$0.next = 30;
          break;

        case 15:
          if (!(!elem1.done && elem2.done)) {
            context$1$0.next = 21;
            break;
          }

          context$1$0.next = 18;
          return elem1.value;

        case 18:
          elem1 = seqIter1.next();
          context$1$0.next = 30;
          break;

        case 21:
          if (!(comp(elem1.value, elem2.value) <= 0)) {
            context$1$0.next = 27;
            break;
          }

          context$1$0.next = 24;
          return elem1.value;

        case 24:
          elem1 = seqIter1.next();
          context$1$0.next = 30;
          break;

        case 27:
          context$1$0.next = 29;
          return elem2.value;

        case 29:
          elem2 = seqIter2.next();

        case 30:
          context$1$0.next = 4;
          break;

        case 32:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[1], this);
  }

  function genPairMergedSequences(firstSeq, secondSeq, seqIter, comp) {
    var seq1, seq2, _ref2, elem;

    return _babelRuntimeRegenerator['default'].wrap(function genPairMergedSequences$(context$1$0) {
      var _this2 = this;

      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          seq1 = firstSeq;
          seq2 = secondSeq;

        case 2:
          if (!true) {
            context$1$0.next = 16;
            break;
          }

          if (!(seq1 && seq2)) {
            context$1$0.next = 5;
            break;
          }

          return context$1$0.delegateYield(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
            var localSeq1, localseq2;
            return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  localSeq1 = seq1;
                  localseq2 = seq2;
                  context$2$0.next = 4;
                  return (_ref2 = {}, _ref2[_babelRuntimeCoreJsSymbolIterator['default']] = function () {
                    return genTwoMergedSequence(localSeq1, localseq2, comp);
                  }, _ref2);

                case 4:
                  seq1 = seq2 = undefined;

                case 5:
                case 'end':
                  return context$2$0.stop();
              }
            }, callee$1$0, _this2);
          })(), 't0', 5);

        case 5:
          elem = seqIter.next();

          if (!elem.done) {
            context$1$0.next = 13;
            break;
          }

          if (!seq1) {
            context$1$0.next = 10;
            break;
          }

          context$1$0.next = 10;
          return seq1;

        case 10:
          return context$1$0.abrupt('return');

        case 13:
          if (!seq1) {
            seq1 = elem.value;
          } else {
            seq2 = elem.value;
          }

        case 14:
          context$1$0.next = 2;
          break;

        case 16:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[2], this);
  }

  function genMergedAndSortedSequence(seqIter, comp) {
    var firstElem, secondElem;
    return _babelRuntimeRegenerator['default'].wrap(function genMergedAndSortedSequence$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          if (!true) {
            context$1$0.next = 11;
            break;
          }

          firstElem = seqIter.next();

          if (!firstElem.done) {
            context$1$0.next = 4;
            break;
          }

          return context$1$0.abrupt('return');

        case 4:
          secondElem = seqIter.next();

          if (!secondElem.done) {
            context$1$0.next = 8;
            break;
          }

          return context$1$0.delegateYield(_babelRuntimeCoreJsGetIterator['default'](firstElem.value), 't0', 7);

        case 7:
          return context$1$0.abrupt('return');

        case 8:

          seqIter = genPairMergedSequences(firstElem.value, secondElem.value, seqIter, comp);
          context$1$0.next = 0;
          break;

        case 11:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[3], this);
  }

  function genMergeSort(seq, comp) {
    var seqIter = genSubSequences(seq, comp, function (x) {
      return x <= 0;
    });

    return genMergedAndSortedSequence(seqIter, comp);
  }

  var _mergeSortTestPack = {
    genSubSequences: genSubSequences,
    genTwoMergedSequence: genTwoMergedSequence,
    genMergedAndSortedSequence: genMergedAndSortedSequence,
    genMergeSort: genMergeSort
  };

  exports._mergeSortTestPack = _mergeSortTestPack;

  var OrderByTempObjectValName = '_orderByVal_';

  var keyOrValueIter2ValueIter = _babelRuntimeRegenerator['default'].mark(function keyOrValueIter2ValueIter(keyOrValueIter) {
    var elem, keyOrVal;
    return _babelRuntimeRegenerator['default'].wrap(function keyOrValueIter2ValueIter$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          elem = undefined;

        case 1:
          if ((elem = keyOrValueIter.next()).done) {
            context$1$0.next = 7;
            break;
          }

          keyOrVal = elem.value;
          context$1$0.next = 5;
          return keyOrVal[OrderByTempObjectValName] || keyOrVal;

        case 5:
          context$1$0.next = 1;
          break;

        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, keyOrValueIter2ValueIter, this);
  });

  var keyOrValueSeq2ValueSeq = function keyOrValueSeq2ValueSeq(keyOrValueSeq) {
    var _ref3;

    return (_ref3 = {}, _ref3[_babelRuntimeCoreJsSymbolIterator['default']] = function () {
      return keyOrValueIter2ValueIter(_babelRuntimeCoreJsGetIterator['default'](keyOrValueSeq));
    }, _ref3);
  };

  var orderByImpl = _babelRuntimeRegenerator['default'].mark(function orderByImpl(seq, options) {
    var _options$0, keySelector, comp, isKeyDefault, keyOrValSeq, keyOrValComp, _keyOrValSeq, sortedKeyOrValIter, remainingOptions, seqIter, elem, subSeq, subSortedSeqIter;

    return _babelRuntimeRegenerator['default'].wrap(function orderByImpl$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          if (!(options.length == 0)) {
            context$1$0.next = 2;
            break;
          }

          throw 'Logic error. "options.length" should not be 0.';

        case 2:
          _options$0 = options[0];
          keySelector = _options$0[0];
          comp = _options$0[1];
          isKeyDefault = _options$0[2];
          keyOrValSeq = seq;
          keyOrValComp = comp;

          if (!isKeyDefault) {
            keyOrValComp = function (x, y) {
              return comp(x.key, y.key);
            };
            keyOrValSeq = (_keyOrValSeq = {}, _keyOrValSeq[_babelRuntimeCoreJsSymbolIterator['default']] = _babelRuntimeRegenerator['default'].mark(function callee$1$0() {
              var _iterator2, _isArray2, _i2, _ref5, _ref4, val, key;

              return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    _iterator2 = seq, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _babelRuntimeCoreJsGetIterator['default'](_iterator2);

                  case 1:
                    if (!_isArray2) {
                      context$2$0.next = 7;
                      break;
                    }

                    if (!(_i2 >= _iterator2.length)) {
                      context$2$0.next = 4;
                      break;
                    }

                    return context$2$0.abrupt('break', 17);

                  case 4:
                    _ref4 = _iterator2[_i2++];
                    context$2$0.next = 11;
                    break;

                  case 7:
                    _i2 = _iterator2.next();

                    if (!_i2.done) {
                      context$2$0.next = 10;
                      break;
                    }

                    return context$2$0.abrupt('break', 17);

                  case 10:
                    _ref4 = _i2.value;

                  case 11:
                    val = _ref4;
                    key = keySelector(val);
                    context$2$0.next = 15;
                    return (_ref5 = {
                      key: key
                    }, _ref5[OrderByTempObjectValName] = val, _ref5);

                  case 15:
                    context$2$0.next = 1;
                    break;

                  case 17:
                  case 'end':
                    return context$2$0.stop();
                }
              }, callee$1$0, this);
            }), _keyOrValSeq);
          }
          sortedKeyOrValIter = genMergeSort(keyOrValSeq, keyOrValComp);
          remainingOptions = options.slice(1);

          if (!(remainingOptions.length === 0)) {
            context$1$0.next = 15;
            break;
          }

          return context$1$0.delegateYield(keyOrValueIter2ValueIter(sortedKeyOrValIter), 't0', 13);

        case 13:
          context$1$0.next = 23;
          break;

        case 15:
          seqIter = genSubSequences(sortedKeyOrValIter, keyOrValComp, function (x) {
            return x == 0;
          });
          elem = undefined;

        case 17:
          if ((elem = seqIter.next()).done) {
            context$1$0.next = 23;
            break;
          }

          subSeq = elem.value;
          subSortedSeqIter = orderByImpl(keyOrValueSeq2ValueSeq(subSeq), remainingOptions);
          return context$1$0.delegateYield(keyOrValueIter2ValueIter(subSortedSeqIter), 't1', 21);

        case 21:
          context$1$0.next = 17;
          break;

        case 23:
        case 'end':
          return context$1$0.stop();
      }
    }, orderByImpl, this);
  });

  var createSortOption = function createSortOption(keySelector, comp) {
    var isKeyDefault = !keySelector;
    keySelector = keySelector || function (x) {
      return x;
    };
    return [keySelector, comp, isKeyDefault];
  };

  var defaultComp = function defaultComp(x, y) {
    return x === y ? 0 : x < y ? -1 : 1;
  };
  var defaultEqual = function defaultEqual(x, y) {
    return x === y;
  };
  var defaultPred = function defaultPred(x) {
    return true;
  };
  var defaultSelector = function defaultSelector(x) {
    return x;
  };
  var defaultTrans = function defaultTrans(x) {
    return x;
  };

  function joinImpl(_this, other, thisKeySelector, otherKeySelector, binaryTrans, equal, isGroupJoin) {
    if (other === undefined || other === null) {
      throw 'must provide a "right" sequence for join()';
    }
    return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
      var yGroups, _iterator3, _isArray3, _i3, _ref6, x, _iterator4, _isArray4, _i4, _ref7, yg, xKey, yKey, ySeq, _iterator5, _isArray5, _i5, _ref8, y;

      return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            yGroups = asEnumerable(other).groupBy(otherKeySelector);
            _iterator3 = _this, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _babelRuntimeCoreJsGetIterator['default'](_iterator3);

          case 2:
            if (!_isArray3) {
              context$2$0.next = 8;
              break;
            }

            if (!(_i3 >= _iterator3.length)) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('break', 54);

          case 5:
            _ref6 = _iterator3[_i3++];
            context$2$0.next = 12;
            break;

          case 8:
            _i3 = _iterator3.next();

            if (!_i3.done) {
              context$2$0.next = 11;
              break;
            }

            return context$2$0.abrupt('break', 54);

          case 11:
            _ref6 = _i3.value;

          case 12:
            x = _ref6;
            _iterator4 = yGroups, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _babelRuntimeCoreJsGetIterator['default'](_iterator4);

          case 14:
            if (!_isArray4) {
              context$2$0.next = 20;
              break;
            }

            if (!(_i4 >= _iterator4.length)) {
              context$2$0.next = 17;
              break;
            }

            return context$2$0.abrupt('break', 52);

          case 17:
            _ref7 = _iterator4[_i4++];
            context$2$0.next = 24;
            break;

          case 20:
            _i4 = _iterator4.next();

            if (!_i4.done) {
              context$2$0.next = 23;
              break;
            }

            return context$2$0.abrupt('break', 52);

          case 23:
            _ref7 = _i4.value;

          case 24:
            yg = _ref7;
            xKey = thisKeySelector(x);
            yKey = yg.key;

            if (!equal(xKey, yKey)) {
              context$2$0.next = 50;
              break;
            }

            ySeq = yg;

            if (!isGroupJoin) {
              context$2$0.next = 34;
              break;
            }

            context$2$0.next = 32;
            return binaryTrans(x, ySeq);

          case 32:
            context$2$0.next = 50;
            break;

          case 34:
            _iterator5 = ySeq, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _babelRuntimeCoreJsGetIterator['default'](_iterator5);

          case 35:
            if (!_isArray5) {
              context$2$0.next = 41;
              break;
            }

            if (!(_i5 >= _iterator5.length)) {
              context$2$0.next = 38;
              break;
            }

            return context$2$0.abrupt('break', 50);

          case 38:
            _ref8 = _iterator5[_i5++];
            context$2$0.next = 45;
            break;

          case 41:
            _i5 = _iterator5.next();

            if (!_i5.done) {
              context$2$0.next = 44;
              break;
            }

            return context$2$0.abrupt('break', 50);

          case 44:
            _ref8 = _i5.value;

          case 45:
            y = _ref8;
            context$2$0.next = 48;
            return binaryTrans(x, y);

          case 48:
            context$2$0.next = 35;
            break;

          case 50:
            context$2$0.next = 14;
            break;

          case 52:
            context$2$0.next = 2;
            break;

          case 54:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    }));
  }

  var Enumerable = (function () {
    function Enumerable(iterator, baseObject) {
      _babelRuntimeHelpersClassCallCheck['default'](this, Enumerable);

      this[_babelRuntimeCoreJsSymbolIterator['default']] = iterator;
      if (baseObject) {
        this._baseObject = baseObject;
      }
    }

    Enumerable.prototype._isBaseObjectRandomlyAccessible = function _isBaseObjectRandomlyAccessible() {
      return this._baseObject && (Array.isArray(this._baseObject) || typeof this._baseObject === 'string');
    };

    Enumerable.prototype._clone = function _clone() {
      var result = new Enumerable(this[_babelRuntimeCoreJsSymbolIterator['default']], this._baseObject);
      result._orderByOptions = this._orderByOptions.asEnumerable().toArray();
      return result;
    };

    Enumerable.prototype.skip = function skip(n) {
      if (!_babelRuntimeCoreJsNumberIsInteger['default'](n)) {
        throw '@n must be an integer.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var startYield, count, _iterator6, _isArray6, _i6, _ref9, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              startYield = false;
              count = n;
              _iterator6 = _this, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _babelRuntimeCoreJsGetIterator['default'](_iterator6);

            case 3:
              if (!_isArray6) {
                context$3$0.next = 9;
                break;
              }

              if (!(_i6 >= _iterator6.length)) {
                context$3$0.next = 6;
                break;
              }

              return context$3$0.abrupt('break', 20);

            case 6:
              _ref9 = _iterator6[_i6++];
              context$3$0.next = 13;
              break;

            case 9:
              _i6 = _iterator6.next();

              if (!_i6.done) {
                context$3$0.next = 12;
                break;
              }

              return context$3$0.abrupt('break', 20);

            case 12:
              _ref9 = _i6.value;

            case 13:
              x = _ref9;

              if (count-- <= 0) {
                startYield = true;
              }

              if (!startYield) {
                context$3$0.next = 18;
                break;
              }

              context$3$0.next = 18;
              return x;

            case 18:
              context$3$0.next = 3;
              break;

            case 20:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.skipWhile = function skipWhile(pred) {
      if (typeof pred !== 'function') {
        throw '@pred must be a function.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var startYield, index, _iterator7, _isArray7, _i7, _ref10, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              startYield = false;
              index = 0;
              _iterator7 = _this, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _babelRuntimeCoreJsGetIterator['default'](_iterator7);

            case 3:
              if (!_isArray7) {
                context$3$0.next = 9;
                break;
              }

              if (!(_i7 >= _iterator7.length)) {
                context$3$0.next = 6;
                break;
              }

              return context$3$0.abrupt('break', 20);

            case 6:
              _ref10 = _iterator7[_i7++];
              context$3$0.next = 13;
              break;

            case 9:
              _i7 = _iterator7.next();

              if (!_i7.done) {
                context$3$0.next = 12;
                break;
              }

              return context$3$0.abrupt('break', 20);

            case 12:
              _ref10 = _i7.value;

            case 13:
              x = _ref10;

              if (!pred(x, index++)) {
                startYield = true;
              }

              if (!startYield) {
                context$3$0.next = 18;
                break;
              }

              context$3$0.next = 18;
              return x;

            case 18:
              context$3$0.next = 3;
              break;

            case 20:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.take = function take(n) {
      if (!_babelRuntimeCoreJsNumberIsInteger['default'](n)) {
        throw '@n must be an integer.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var count, _iterator8, _isArray8, _i8, _ref11, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              count = n;
              _iterator8 = _this, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _babelRuntimeCoreJsGetIterator['default'](_iterator8);

            case 2:
              if (!_isArray8) {
                context$3$0.next = 8;
                break;
              }

              if (!(_i8 >= _iterator8.length)) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 5:
              _ref11 = _iterator8[_i8++];
              context$3$0.next = 12;
              break;

            case 8:
              _i8 = _iterator8.next();

              if (!_i8.done) {
                context$3$0.next = 11;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 11:
              _ref11 = _i8.value;

            case 12:
              x = _ref11;

              if (!(count-- > 0)) {
                context$3$0.next = 18;
                break;
              }

              context$3$0.next = 16;
              return x;

            case 16:
              context$3$0.next = 19;
              break;

            case 18:
              return context$3$0.abrupt('break', 21);

            case 19:
              context$3$0.next = 2;
              break;

            case 21:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.takeWhile = function takeWhile(pred) {
      if (typeof pred !== 'function') {
        throw '@pred must be a function.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var index, _iterator9, _isArray9, _i9, _ref12, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              index = 0;
              _iterator9 = _this, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _babelRuntimeCoreJsGetIterator['default'](_iterator9);

            case 2:
              if (!_isArray9) {
                context$3$0.next = 8;
                break;
              }

              if (!(_i9 >= _iterator9.length)) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 5:
              _ref12 = _iterator9[_i9++];
              context$3$0.next = 12;
              break;

            case 8:
              _i9 = _iterator9.next();

              if (!_i9.done) {
                context$3$0.next = 11;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 11:
              _ref12 = _i9.value;

            case 12:
              x = _ref12;

              if (!pred(x, index++)) {
                context$3$0.next = 18;
                break;
              }

              context$3$0.next = 16;
              return x;

            case 16:
              context$3$0.next = 19;
              break;

            case 18:
              return context$3$0.abrupt('break', 21);

            case 19:
              context$3$0.next = 2;
              break;

            case 21:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.reverse = function reverse() {
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var buf, _iterator10, _isArray10, _i10, _ref13, x, i;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              buf = undefined;

              if (!_this._isBaseObjectRandomlyAccessible()) {
                context$3$0.next = 5;
                break;
              }

              buf = _this._baseObject;
              context$3$0.next = 21;
              break;

            case 5:
              buf = [];
              _iterator10 = _this, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _babelRuntimeCoreJsGetIterator['default'](_iterator10);

            case 7:
              if (!_isArray10) {
                context$3$0.next = 13;
                break;
              }

              if (!(_i10 >= _iterator10.length)) {
                context$3$0.next = 10;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 10:
              _ref13 = _iterator10[_i10++];
              context$3$0.next = 17;
              break;

            case 13:
              _i10 = _iterator10.next();

              if (!_i10.done) {
                context$3$0.next = 16;
                break;
              }

              return context$3$0.abrupt('break', 21);

            case 16:
              _ref13 = _i10.value;

            case 17:
              x = _ref13;

              buf.push(x);

            case 19:
              context$3$0.next = 7;
              break;

            case 21:
              i = buf.length - 1;

            case 22:
              if (!(i >= 0)) {
                context$3$0.next = 28;
                break;
              }

              context$3$0.next = 25;
              return buf[i];

            case 25:
              i--;
              context$3$0.next = 22;
              break;

            case 28:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.select = function select(trans) {
      if (typeof trans !== 'function') {
        throw '@trans must be a function.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var index, _iterator11, _isArray11, _i11, _ref14, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              index = 0;
              _iterator11 = _this, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _babelRuntimeCoreJsGetIterator['default'](_iterator11);

            case 2:
              if (!_isArray11) {
                context$3$0.next = 8;
                break;
              }

              if (!(_i11 >= _iterator11.length)) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('break', 17);

            case 5:
              _ref14 = _iterator11[_i11++];
              context$3$0.next = 12;
              break;

            case 8:
              _i11 = _iterator11.next();

              if (!_i11.done) {
                context$3$0.next = 11;
                break;
              }

              return context$3$0.abrupt('break', 17);

            case 11:
              _ref14 = _i11.value;

            case 12:
              x = _ref14;
              context$3$0.next = 15;
              return trans(x, index++);

            case 15:
              context$3$0.next = 2;
              break;

            case 17:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.where = function where(pred) {
      if (typeof pred !== 'function') {
        throw '@pred must be a function.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var index, _iterator12, _isArray12, _i12, _ref15, x;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              index = 0;
              _iterator12 = _this, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _babelRuntimeCoreJsGetIterator['default'](_iterator12);

            case 2:
              if (!_isArray12) {
                context$3$0.next = 8;
                break;
              }

              if (!(_i12 >= _iterator12.length)) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('break', 18);

            case 5:
              _ref15 = _iterator12[_i12++];
              context$3$0.next = 12;
              break;

            case 8:
              _i12 = _iterator12.next();

              if (!_i12.done) {
                context$3$0.next = 11;
                break;
              }

              return context$3$0.abrupt('break', 18);

            case 11:
              _ref15 = _i12.value;

            case 12:
              x = _ref15;

              if (!pred(x, index++)) {
                context$3$0.next = 16;
                break;
              }

              context$3$0.next = 16;
              return x;

            case 16:
              context$3$0.next = 2;
              break;

            case 18:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.selectMany = function selectMany(genSeq, resultTrans) {
      if (typeof genSeq !== 'function') {
        throw '@genSeq must be a function.';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var index, _iterator13, _isArray13, _i13, _ref16, x, seq, _iterator14, _isArray14, _i14, _ref17, y;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              index = 0;
              _iterator13 = _this, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _babelRuntimeCoreJsGetIterator['default'](_iterator13);

            case 2:
              if (!_isArray13) {
                context$3$0.next = 8;
                break;
              }

              if (!(_i13 >= _iterator13.length)) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('break', 37);

            case 5:
              _ref16 = _iterator13[_i13++];
              context$3$0.next = 12;
              break;

            case 8:
              _i13 = _iterator13.next();

              if (!_i13.done) {
                context$3$0.next = 11;
                break;
              }

              return context$3$0.abrupt('break', 37);

            case 11:
              _ref16 = _i13.value;

            case 12:
              x = _ref16;
              seq = genSeq(x, index++);

              if (!resultTrans) {
                context$3$0.next = 19;
                break;
              }

              context$3$0.next = 17;
              return resultTrans(x, seq);

            case 17:
              context$3$0.next = 35;
              break;

            case 19:
              _iterator14 = seq, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _babelRuntimeCoreJsGetIterator['default'](_iterator14);

            case 20:
              if (!_isArray14) {
                context$3$0.next = 26;
                break;
              }

              if (!(_i14 >= _iterator14.length)) {
                context$3$0.next = 23;
                break;
              }

              return context$3$0.abrupt('break', 35);

            case 23:
              _ref17 = _iterator14[_i14++];
              context$3$0.next = 30;
              break;

            case 26:
              _i14 = _iterator14.next();

              if (!_i14.done) {
                context$3$0.next = 29;
                break;
              }

              return context$3$0.abrupt('break', 35);

            case 29:
              _ref17 = _i14.value;

            case 30:
              y = _ref17;
              context$3$0.next = 33;
              return y;

            case 33:
              context$3$0.next = 20;
              break;

            case 35:
              context$3$0.next = 2;
              break;

            case 37:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.groupBy = function groupBy(keySelector, valueSelector, resultTrans, keyEqual) {
      if (keySelector === undefined) keySelector = defaultSelector;
      if (valueSelector === undefined) valueSelector = defaultSelector;

      var _this = this;
      if (keyEqual) {
        return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
          var groups, _loop, _iterator15, _isArray15, _i15, _ref18, _ret2, _iterator16, _isArray16, _i16, _ref19, group, result;

          return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                groups = [];

                _loop = function () {
                  if (_isArray15) {
                    if (_i15 >= _iterator15.length) return 'break';
                    _ref18 = _iterator15[_i15++];
                  } else {
                    _i15 = _iterator15.next();
                    if (_i15.done) return 'break';
                    _ref18 = _i15.value;
                  }

                  var x = _ref18;

                  var key = keySelector(x);
                  var val = valueSelector(x);

                  var existingGroup = asEnumerable(groups).firstOrDefault(function (g) {
                    return keyEqual(key, g.key);
                  });
                  if (!existingGroup) {
                    existingGroup = {
                      key: key,
                      values: []
                    };
                    groups.push(existingGroup);
                  }
                  existingGroup.values.push(val);
                };

                _iterator15 = _this, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _babelRuntimeCoreJsGetIterator['default'](_iterator15);

              case 3:
                _ret2 = _loop();

                if (!(_ret2 === 'break')) {
                  context$3$0.next = 6;
                  break;
                }

                return context$3$0.abrupt('break', 8);

              case 6:
                context$3$0.next = 3;
                break;

              case 8:
                _iterator16 = groups, _isArray16 = Array.isArray(_iterator16), _i16 = 0, _iterator16 = _isArray16 ? _iterator16 : _babelRuntimeCoreJsGetIterator['default'](_iterator16);

              case 9:
                if (!_isArray16) {
                  context$3$0.next = 15;
                  break;
                }

                if (!(_i16 >= _iterator16.length)) {
                  context$3$0.next = 12;
                  break;
                }

                return context$3$0.abrupt('break', 31);

              case 12:
                _ref19 = _iterator16[_i16++];
                context$3$0.next = 19;
                break;

              case 15:
                _i16 = _iterator16.next();

                if (!_i16.done) {
                  context$3$0.next = 18;
                  break;
                }

                return context$3$0.abrupt('break', 31);

              case 18:
                _ref19 = _i16.value;

              case 19:
                group = _ref19;

                if (!resultTrans) {
                  context$3$0.next = 25;
                  break;
                }

                context$3$0.next = 23;
                return resultTrans(group.key, group.values);

              case 23:
                context$3$0.next = 29;
                break;

              case 25:
                result = asEnumerable(group.values);

                result.key = group.key;
                context$3$0.next = 29;
                return result;

              case 29:
                context$3$0.next = 9;
                break;

              case 31:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }));
      } else {
        return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
          var seqMap, _iterator17, _isArray17, _i17, _ref20, x, key, val, _iterator18, _isArray18, _i18, _ref21, valSeq, result;

          return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                seqMap = new _babelRuntimeCoreJsMap['default']();
                _iterator17 = _this, _isArray17 = Array.isArray(_iterator17), _i17 = 0, _iterator17 = _isArray17 ? _iterator17 : _babelRuntimeCoreJsGetIterator['default'](_iterator17);

              case 2:
                if (!_isArray17) {
                  context$3$0.next = 8;
                  break;
                }

                if (!(_i17 >= _iterator17.length)) {
                  context$3$0.next = 5;
                  break;
                }

                return context$3$0.abrupt('break', 19);

              case 5:
                _ref20 = _iterator17[_i17++];
                context$3$0.next = 12;
                break;

              case 8:
                _i17 = _iterator17.next();

                if (!_i17.done) {
                  context$3$0.next = 11;
                  break;
                }

                return context$3$0.abrupt('break', 19);

              case 11:
                _ref20 = _i17.value;

              case 12:
                x = _ref20;
                key = keySelector(x);
                val = valueSelector(x);

                if (!seqMap.has(key)) {
                  seqMap.set(key, []);
                }
                seqMap.get(key).push(val);

              case 17:
                context$3$0.next = 2;
                break;

              case 19:
                _iterator18 = seqMap, _isArray18 = Array.isArray(_iterator18), _i18 = 0, _iterator18 = _isArray18 ? _iterator18 : _babelRuntimeCoreJsGetIterator['default'](_iterator18);

              case 20:
                if (!_isArray18) {
                  context$3$0.next = 26;
                  break;
                }

                if (!(_i18 >= _iterator18.length)) {
                  context$3$0.next = 23;
                  break;
                }

                return context$3$0.abrupt('break', 43);

              case 23:
                _ref21 = _iterator18[_i18++];
                context$3$0.next = 30;
                break;

              case 26:
                _i18 = _iterator18.next();

                if (!_i18.done) {
                  context$3$0.next = 29;
                  break;
                }

                return context$3$0.abrupt('break', 43);

              case 29:
                _ref21 = _i18.value;

              case 30:
                key = _ref21[0];
                valSeq = _ref21[1];

                if (!resultTrans) {
                  context$3$0.next = 37;
                  break;
                }

                context$3$0.next = 35;
                return resultTrans(key, valSeq);

              case 35:
                context$3$0.next = 41;
                break;

              case 37:
                result = asEnumerable(valSeq);

                result.key = key;
                context$3$0.next = 41;
                return result;

              case 41:
                context$3$0.next = 20;
                break;

              case 43:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }));
      }
    };

    Enumerable.prototype.orderBy = function orderBy(keySelector) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? defaultComp : arguments[1];

      var _this = this;
      var result = new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var iter;
        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              iter = orderByImpl(_this, this._orderByOptions);
              return context$3$0.delegateYield(iter, 't0', 2);

            case 2:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
      result._orderByOptions = [createSortOption(keySelector, comp)];
      return result;
    };

    Enumerable.prototype.orderByDescending = function orderByDescending(keySelector) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? defaultComp : arguments[1];

      return this.orderBy(keySelector, function (x, y) {
        return -comp(x, y);
      });
    };

    Enumerable.prototype.thenBy = function thenBy(keySelector) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? defaultComp : arguments[1];

      if (!this._orderByOptions) {
        throw 'thenBy() must follow an orderBy()/thenBy().';
      }

      var result = this._clone();
      result._orderByOptions.push(createSortOption(keySelector, comp));
      return result;
    };

    Enumerable.prototype.thenByDescending = function thenByDescending(keySelector) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? defaultComp : arguments[1];

      return this.thenBy(keySelector, function (x, y) {
        return -comp(x, y);
      });
    };

    Enumerable.prototype.join = function join(other) {
      var thisKeySelector = arguments.length <= 1 || arguments[1] === undefined ? defaultSelector : arguments[1];
      var otherKeySelector = arguments.length <= 2 || arguments[2] === undefined ? defaultSelector : arguments[2];
      var resultTrans = arguments.length <= 3 || arguments[3] === undefined ? function (x, y) {
        return [x, y];
      } : arguments[3];
      var equal = arguments.length <= 4 || arguments[4] === undefined ? defaultEqual : arguments[4];

      return joinImpl(this, other, thisKeySelector, otherKeySelector, resultTrans, equal, false);
    };

    Enumerable.prototype.groupJoin = function groupJoin(other) {
      var thisKeySelector = arguments.length <= 1 || arguments[1] === undefined ? defaultSelector : arguments[1];
      var otherKeySelector = arguments.length <= 2 || arguments[2] === undefined ? defaultSelector : arguments[2];
      var resultTrans = arguments.length <= 3 || arguments[3] === undefined ? function (x, ySeq) {
        return [x, ySeq];
      } : arguments[3];
      var equal = arguments.length <= 4 || arguments[4] === undefined ? defaultEqual : arguments[4];

      return joinImpl(this, other, thisKeySelector, otherKeySelector, resultTrans, equal, true);
    };

    Enumerable.prototype.zip = function zip(other) {
      var resultTrans = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
        return [x, y];
      } : arguments[1];

      if (!other) {
        throw 'must provide @other';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var iter1, iter2, elem1, elem2;
        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              iter1 = _babelRuntimeCoreJsGetIterator['default'](_this);
              iter2 = _babelRuntimeCoreJsGetIterator['default'](other);
              elem1 = undefined, elem2 = undefined;

            case 3:
              if (!(!(elem1 = iter1.next()).done && !(elem2 = iter2.next()).done)) {
                context$3$0.next = 8;
                break;
              }

              context$3$0.next = 6;
              return resultTrans(elem1.value, elem2.value);

            case 6:
              context$3$0.next = 3;
              break;

            case 8:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.concat = function concat(other) {
      if (!other) {
        throw 'must provide @other';
      }
      var _this = this;
      return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
        var _iterator19, _isArray19, _i19, _ref22, x, _iterator20, _isArray20, _i20, _ref23, y;

        return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              _iterator19 = _this, _isArray19 = Array.isArray(_iterator19), _i19 = 0, _iterator19 = _isArray19 ? _iterator19 : _babelRuntimeCoreJsGetIterator['default'](_iterator19);

            case 1:
              if (!_isArray19) {
                context$3$0.next = 7;
                break;
              }

              if (!(_i19 >= _iterator19.length)) {
                context$3$0.next = 4;
                break;
              }

              return context$3$0.abrupt('break', 16);

            case 4:
              _ref22 = _iterator19[_i19++];
              context$3$0.next = 11;
              break;

            case 7:
              _i19 = _iterator19.next();

              if (!_i19.done) {
                context$3$0.next = 10;
                break;
              }

              return context$3$0.abrupt('break', 16);

            case 10:
              _ref22 = _i19.value;

            case 11:
              x = _ref22;
              context$3$0.next = 14;
              return x;

            case 14:
              context$3$0.next = 1;
              break;

            case 16:
              _iterator20 = other, _isArray20 = Array.isArray(_iterator20), _i20 = 0, _iterator20 = _isArray20 ? _iterator20 : _babelRuntimeCoreJsGetIterator['default'](_iterator20);

            case 17:
              if (!_isArray20) {
                context$3$0.next = 23;
                break;
              }

              if (!(_i20 >= _iterator20.length)) {
                context$3$0.next = 20;
                break;
              }

              return context$3$0.abrupt('break', 32);

            case 20:
              _ref23 = _iterator20[_i20++];
              context$3$0.next = 27;
              break;

            case 23:
              _i20 = _iterator20.next();

              if (!_i20.done) {
                context$3$0.next = 26;
                break;
              }

              return context$3$0.abrupt('break', 32);

            case 26:
              _ref23 = _i20.value;

            case 27:
              y = _ref23;
              context$3$0.next = 30;
              return y;

            case 30:
              context$3$0.next = 17;
              break;

            case 32:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      }));
    };

    Enumerable.prototype.otherThan = function otherThan(other, equal) {
      var _this3 = this;

      if (!other) {
        throw 'must provide @other';
      }
      if (equal) {
        var _ret3 = (function () {
          var otherCache = asEnumerable(other).distinct().eval();
          return {
            v: _this3.where(function (x) {
              return otherCache.all(function (y) {
                return !equal(x, y);
              });
            })
          };
        })();

        if (typeof _ret3 === 'object') return _ret3.v;
      } else {
        var _ret4 = (function () {
          var otherSet = undefined;
          return {
            v: _this3.where(function (x) {
              if (!otherSet) {
                otherSet = asEnumerable(other).toSet();
              }
              return !otherSet.has(x);
            })
          };
        })();

        if (typeof _ret4 === 'object') return _ret4.v;
      }
    };

    Enumerable.prototype.distinct = function distinct(equal) {
      var _this = this;

      if (equal) {
        return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
          var generated, _loop2, _iterator21, _isArray21, _i21, _ref24, _ret5;

          return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
            var _this4 = this;

            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                generated = [];
                _loop2 = _babelRuntimeRegenerator['default'].mark(function callee$3$0() {
                  var x;
                  return _babelRuntimeRegenerator['default'].wrap(function callee$3$0$(context$4$0) {
                    while (1) switch (context$4$0.prev = context$4$0.next) {
                      case 0:
                        if (!_isArray21) {
                          context$4$0.next = 6;
                          break;
                        }

                        if (!(_i21 >= _iterator21.length)) {
                          context$4$0.next = 3;
                          break;
                        }

                        return context$4$0.abrupt('return', 'break');

                      case 3:
                        _ref24 = _iterator21[_i21++];
                        context$4$0.next = 10;
                        break;

                      case 6:
                        _i21 = _iterator21.next();

                        if (!_i21.done) {
                          context$4$0.next = 9;
                          break;
                        }

                        return context$4$0.abrupt('return', 'break');

                      case 9:
                        _ref24 = _i21.value;

                      case 10:
                        x = _ref24;

                        if (!asEnumerable(generated).all(function (y) {
                          return !equal(x, y);
                        })) {
                          context$4$0.next = 15;
                          break;
                        }

                        generated.push(x);
                        context$4$0.next = 15;
                        return x;

                      case 15:
                      case 'end':
                        return context$4$0.stop();
                    }
                  }, callee$3$0, _this4);
                });
                _iterator21 = _this, _isArray21 = Array.isArray(_iterator21), _i21 = 0, _iterator21 = _isArray21 ? _iterator21 : _babelRuntimeCoreJsGetIterator['default'](_iterator21);

              case 3:
                return context$3$0.delegateYield(_loop2(), 't0', 4);

              case 4:
                _ret5 = context$3$0.t0;

                if (!(_ret5 === 'break')) {
                  context$3$0.next = 7;
                  break;
                }

                return context$3$0.abrupt('break', 9);

              case 7:
                context$3$0.next = 3;
                break;

              case 9:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }));
      } else {
        return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {
          var valSet, _iterator22, _isArray22, _i22, _ref25, x;

          return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                valSet = new _babelRuntimeCoreJsSet['default']();
                _iterator22 = _this, _isArray22 = Array.isArray(_iterator22), _i22 = 0, _iterator22 = _isArray22 ? _iterator22 : _babelRuntimeCoreJsGetIterator['default'](_iterator22);

              case 2:
                if (!_isArray22) {
                  context$3$0.next = 8;
                  break;
                }

                if (!(_i22 >= _iterator22.length)) {
                  context$3$0.next = 5;
                  break;
                }

                return context$3$0.abrupt('break', 18);

              case 5:
                _ref25 = _iterator22[_i22++];
                context$3$0.next = 12;
                break;

              case 8:
                _i22 = _iterator22.next();

                if (!_i22.done) {
                  context$3$0.next = 11;
                  break;
                }

                return context$3$0.abrupt('break', 18);

              case 11:
                _ref25 = _i22.value;

              case 12:
                x = _ref25;

                if (!(valSet.size !== valSet.add(x).size)) {
                  context$3$0.next = 16;
                  break;
                }

                context$3$0.next = 16;
                return x;

              case 16:
                context$3$0.next = 2;
                break;

              case 18:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }));
      }
    };

    Enumerable.prototype.union = function union(other, equal) {
      if (!other) {
        throw 'must provide @other';
      }
      return this.concat(other).distinct(equal);
    };

    Enumerable.prototype.intersect = function intersect(other, equal) {
      var _this5 = this;

      if (!other) {
        throw 'must provide @other';
      }
      if (equal) {
        var _ret6 = (function () {
          var otherCache = asEnumerable(asEnumerable(other).toArray());
          return {
            v: _this5.where(function (x) {
              return otherCache.any(function (y) {
                return equal(x, y);
              });
            })
          };
        })();

        if (typeof _ret6 === 'object') return _ret6.v;
      } else {
        var _ret7 = (function () {
          var otherSet = undefined;
          return {
            v: _this5.where(function (x) {
              if (!otherSet) {
                otherSet = asEnumerable(other).toSet();
              }
              return otherSet.has(x);
            }).distinct()
          };
        })();

        if (typeof _ret7 === 'object') return _ret7.v;
      }
    };

    Enumerable.prototype.except = function except(other, equal) {
      if (!other) {
        throw 'must provide @other';
      }
      return this.distinct().otherThan(other, equal);
    };

    Enumerable.prototype.all = function all(pred) {
      if (typeof pred !== 'function') {
        throw 'must provide @pred';
      }
      var index = 0;
      for (var _iterator23 = this, _isArray23 = Array.isArray(_iterator23), _i23 = 0, _iterator23 = _isArray23 ? _iterator23 : _babelRuntimeCoreJsGetIterator['default'](_iterator23);;) {
        var _ref26;

        if (_isArray23) {
          if (_i23 >= _iterator23.length) break;
          _ref26 = _iterator23[_i23++];
        } else {
          _i23 = _iterator23.next();
          if (_i23.done) break;
          _ref26 = _i23.value;
        }

        var x = _ref26;

        if (!pred(x, index++)) return false;
      }
      return true;
    };

    Enumerable.prototype.any = function any() {
      var pred = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return true;
      } : arguments[0];

      var index = 0;
      for (var _iterator24 = this, _isArray24 = Array.isArray(_iterator24), _i24 = 0, _iterator24 = _isArray24 ? _iterator24 : _babelRuntimeCoreJsGetIterator['default'](_iterator24);;) {
        var _ref27;

        if (_isArray24) {
          if (_i24 >= _iterator24.length) break;
          _ref27 = _iterator24[_i24++];
        } else {
          _i24 = _iterator24.next();
          if (_i24.done) break;
          _ref27 = _i24.value;
        }

        var x = _ref27;

        if (pred(x, index++)) return true;
      }
      return false;
    };

    Enumerable.prototype.singleOrDefault = function singleOrDefault(pred, throwWhenNotFound) {
      if (pred === undefined) pred = function (x) {
        return true;
      };

      var chosen = undefined;
      var alreadyMet = false;
      var index = 0;
      for (var _iterator25 = this, _isArray25 = Array.isArray(_iterator25), _i25 = 0, _iterator25 = _isArray25 ? _iterator25 : _babelRuntimeCoreJsGetIterator['default'](_iterator25);;) {
        var _ref28;

        if (_isArray25) {
          if (_i25 >= _iterator25.length) break;
          _ref28 = _iterator25[_i25++];
        } else {
          _i25 = _iterator25.next();
          if (_i25.done) break;
          _ref28 = _i25.value;
        }

        var x = _ref28;

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
    };

    Enumerable.prototype.single = function single() {
      var pred = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return true;
      } : arguments[0];

      return this.singleOrDefault(pred, true);
    };

    Enumerable.prototype.count = function count(pred) {
      if (!pred && this._isBaseObjectRandomlyAccessible()) {
        return this._baseObject.length;
      }

      pred = pred || function (x) {
        return true;
      };
      var result = 0;
      for (var _iterator26 = this, _isArray26 = Array.isArray(_iterator26), _i26 = 0, _iterator26 = _isArray26 ? _iterator26 : _babelRuntimeCoreJsGetIterator['default'](_iterator26);;) {
        var _ref29;

        if (_isArray26) {
          if (_i26 >= _iterator26.length) break;
          _ref29 = _iterator26[_i26++];
        } else {
          _i26 = _iterator26.next();
          if (_i26.done) break;
          _ref29 = _i26.value;
        }

        var x = _ref29;

        if (pred(x)) {
          result++;
        }
      }
      return result;
    };

    Enumerable.prototype.contains = function contains(val) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
        return x === y;
      } : arguments[1];

      return this.any(function (x) {
        return comp(x, val);
      });
    };

    Enumerable.prototype.elementAtOrDefault = function elementAtOrDefault(index, throwWhenNotFound) {
      if (!_babelRuntimeCoreJsNumberIsInteger['default'](index)) {
        throw '@index must be an integer';
      }

      if (this._isBaseObjectRandomlyAccessible()) {
        if (throwWhenNotFound && (index < 0 || index >= this._baseObject.length)) {
          throw 'No element found at specified index.';
        }
        return this._baseObject[index];
      }

      var currentIndex = 0;
      for (var _iterator27 = this, _isArray27 = Array.isArray(_iterator27), _i27 = 0, _iterator27 = _isArray27 ? _iterator27 : _babelRuntimeCoreJsGetIterator['default'](_iterator27);;) {
        var _ref30;

        if (_isArray27) {
          if (_i27 >= _iterator27.length) break;
          _ref30 = _iterator27[_i27++];
        } else {
          _i27 = _iterator27.next();
          if (_i27.done) break;
          _ref30 = _i27.value;
        }

        var x = _ref30;

        if (currentIndex++ === index) {
          return x;
        }
      }
      if (throwWhenNotFound) {
        throw 'No element found at specified index.';
      }
    };

    Enumerable.prototype.elementAt = function elementAt(index) {
      return this.elementAtOrDefault(index, true);
    };

    Enumerable.prototype.firstOrDefault = function firstOrDefault(pred, throwWhenNotFound) {
      if (pred === undefined) pred = function (x) {
        return true;
      };

      var index = 0;
      for (var _iterator28 = this, _isArray28 = Array.isArray(_iterator28), _i28 = 0, _iterator28 = _isArray28 ? _iterator28 : _babelRuntimeCoreJsGetIterator['default'](_iterator28);;) {
        var _ref31;

        if (_isArray28) {
          if (_i28 >= _iterator28.length) break;
          _ref31 = _iterator28[_i28++];
        } else {
          _i28 = _iterator28.next();
          if (_i28.done) break;
          _ref31 = _i28.value;
        }

        var x = _ref31;

        if (pred(x, index++)) {
          return x;
        }
      }
      if (throwWhenNotFound) {
        throw 'no elment found for specified @pred';
      }
    };

    Enumerable.prototype.first = function first() {
      var pred = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return true;
      } : arguments[0];

      return this.firstOrDefault(pred, true);
    };

    Enumerable.prototype.lastOrDefault = function lastOrDefault(pred, throwWhenNotFound) {
      var isDefaultPred = !pred;
      pred = pred || function (x) {
        return true;
      };

      if (this._isBaseObjectRandomlyAccessible()) {
        var index = this._baseObject.length;
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

      if (isDefaultPred) {
        var buf = undefined;
        var notEmpty = false;
        for (var _iterator29 = this, _isArray29 = Array.isArray(_iterator29), _i29 = 0, _iterator29 = _isArray29 ? _iterator29 : _babelRuntimeCoreJsGetIterator['default'](_iterator29);;) {
          var _ref32;

          if (_isArray29) {
            if (_i29 >= _iterator29.length) break;
            _ref32 = _iterator29[_i29++];
          } else {
            _i29 = _iterator29.next();
            if (_i29.done) break;
            _ref32 = _i29.value;
          }

          var _x18 = _ref32;

          notEmpty = true;
          buf = _x18;
        }
        if (throwWhenNotFound && !notEmpty) {
          throw 'no element found for specified @pred';
        }
        return buf;
      }

      return this.reverse().firstOrDefault(pred, throwWhenNotFound);
    };

    Enumerable.prototype.last = function last(pred) {
      return this.lastOrDefault(pred, true);
    };

    Enumerable.prototype.defaultIfEmpty = function defaultIfEmpty(val) {
      return this.any() ? this : val === undefined ? empty() : asEnumerable([val]);
    };

    Enumerable.prototype.sequenceEqual = function sequenceEqual(other) {
      var comp = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
        return x === y;
      } : arguments[1];

      var iter1 = _babelRuntimeCoreJsGetIterator['default'](this);
      var iter2 = _babelRuntimeCoreJsGetIterator['default'](other);
      var elem1 = undefined,
          elem2 = undefined;
      while (true) {
        elem1 = iter1.next();
        elem2 = iter2.next();
        if (elem1.done || elem2.done) break;
        if (!comp(elem1.value, elem2.value)) {
          return false;
        }
      }
      return elem1.done && elem2.done;
    };

    Enumerable.prototype._minMaxImpl = function _minMaxImpl(keySelector, comp) {
      var minMaxKey = undefined;
      var minMaxItem = undefined;
      var index = 0;
      for (var _iterator30 = this, _isArray30 = Array.isArray(_iterator30), _i30 = 0, _iterator30 = _isArray30 ? _iterator30 : _babelRuntimeCoreJsGetIterator['default'](_iterator30);;) {
        var _ref33;

        if (_isArray30) {
          if (_i30 >= _iterator30.length) break;
          _ref33 = _iterator30[_i30++];
        } else {
          _i30 = _iterator30.next();
          if (_i30.done) break;
          _ref33 = _i30.value;
        }

        var item = _ref33;

        var key = keySelector(item, index++);
        if (minMaxKey === undefined) {
          minMaxKey = key;
          minMaxItem = item;
        } else {
          if (comp(key, minMaxKey)) {
            minMaxKey = key;
            minMaxItem = item;
          }
        }
      }
      return minMaxKey;
    };

    Enumerable.prototype.min = function min() {
      var keySelector = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return x;
      } : arguments[0];

      return this._minMaxImpl(keySelector, function (x, y) {
        return x < y;
      });
    };

    Enumerable.prototype.max = function max() {
      var keySelector = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return x;
      } : arguments[0];

      return this._minMaxImpl(keySelector, function (x, y) {
        return x > y;
      });
    };

    Enumerable.prototype.sum = function sum() {
      var trans = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return x;
      } : arguments[0];

      var result = 0;
      var index = 0;
      for (var _iterator31 = this, _isArray31 = Array.isArray(_iterator31), _i31 = 0, _iterator31 = _isArray31 ? _iterator31 : _babelRuntimeCoreJsGetIterator['default'](_iterator31);;) {
        var _ref34;

        if (_isArray31) {
          if (_i31 >= _iterator31.length) break;
          _ref34 = _iterator31[_i31++];
        } else {
          _i31 = _iterator31.next();
          if (_i31.done) break;
          _ref34 = _i31.value;
        }

        var x = _ref34;

        result += trans(x, index++);
      }
      return result;
    };

    Enumerable.prototype.average = function average() {
      var trans = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
        return x;
      } : arguments[0];

      var result = 0;
      var count = 0;
      var index = 0;
      for (var _iterator32 = this, _isArray32 = Array.isArray(_iterator32), _i32 = 0, _iterator32 = _isArray32 ? _iterator32 : _babelRuntimeCoreJsGetIterator['default'](_iterator32);;) {
        var _ref35;

        if (_isArray32) {
          if (_i32 >= _iterator32.length) break;
          _ref35 = _iterator32[_i32++];
        } else {
          _i32 = _iterator32.next();
          if (_i32.done) break;
          _ref35 = _i32.value;
        }

        var x = _ref35;

        result += trans(x, index++);
        count++;
      }
      return count === 0 ? 0 : result / count;
    };

    Enumerable.prototype.aggregate = function aggregate(seed, aggFunc, resultTrans) {
      if (seed === undefined && aggFunc === undefined) {
        throw 'must provide @seed only (treat as @aggFunc) or both @seed and @aggFunc with optional @resultTrans';
      }

      var iter = _babelRuntimeCoreJsGetIterator['default'](this);

      if (seed && !aggFunc && !resultTrans) {
        aggFunc = seed;
        seed = iter.next().value;
      }

      resultTrans = resultTrans || function (x) {
        return x;
      };
      while (true) {
        var elem = iter.next();
        if (elem.done) {
          return resultTrans(seed);
        } else {
          seed = aggFunc(seed, elem.value);
        }
      }
    };

    Enumerable.prototype.eval = function _eval() {
      return asEnumerable(this.toArray());
    };

    Enumerable.prototype.toArray = function toArray() {
      var result = [];
      for (var _iterator33 = this, _isArray33 = Array.isArray(_iterator33), _i33 = 0, _iterator33 = _isArray33 ? _iterator33 : _babelRuntimeCoreJsGetIterator['default'](_iterator33);;) {
        var _ref36;

        if (_isArray33) {
          if (_i33 >= _iterator33.length) break;
          _ref36 = _iterator33[_i33++];
        } else {
          _i33 = _iterator33.next();
          if (_i33.done) break;
          _ref36 = _i33.value;
        }

        var x = _ref36;

        result.push(x);
      }
      return result;
    };

    Enumerable.prototype.toSet = function toSet() {
      var result = new _babelRuntimeCoreJsSet['default']();
      for (var _iterator34 = this, _isArray34 = Array.isArray(_iterator34), _i34 = 0, _iterator34 = _isArray34 ? _iterator34 : _babelRuntimeCoreJsGetIterator['default'](_iterator34);;) {
        var _ref37;

        if (_isArray34) {
          if (_i34 >= _iterator34.length) break;
          _ref37 = _iterator34[_i34++];
        } else {
          _i34 = _iterator34.next();
          if (_i34.done) break;
          _ref37 = _i34.value;
        }

        var x = _ref37;

        result.add(x);
      }
      return result;
    };

    Enumerable.prototype.toMap = function toMap(keySelector, valueSelector) {
      return new _babelRuntimeCoreJsMap['default'](this.select(function (x) {
        return [keySelector(x), valueSelector(x)];
      }));
    };

    Enumerable.prototype.forEach = function forEach(op) {
      if (typeof op !== 'function') {
        throw '@op must be a function.';
      }

      for (var _iterator35 = this, _isArray35 = Array.isArray(_iterator35), _i35 = 0, _iterator35 = _isArray35 ? _iterator35 : _babelRuntimeCoreJsGetIterator['default'](_iterator35);;) {
        var _ref38;

        if (_isArray35) {
          if (_i35 >= _iterator35.length) break;
          _ref38 = _iterator35[_i35++];
        } else {
          _i35 = _iterator35.next();
          if (_i35.done) break;
          _ref38 = _i35.value;
        }

        var x = _ref38;

        op(x);
      }
    };

    return Enumerable;
  })();

  function asEnumerable(obj) {
    if (obj === undefined) {
      obj = this;
    }

    if (Enumerable.prototype.isPrototypeOf(obj)) {
      return obj;
    }

    if (!_babelRuntimeCoreJsGetIterator['default'](obj)) {
      throw 'Object does not have a [iterator]. It cannot be used with asEnumerable()';
    }
    return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
      return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.delegateYield(_babelRuntimeCoreJsGetIterator['default'](obj), 't0', 1);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    }), obj);
  }

  ;

  function installAsEnumerable(constructor) {
    if (constructor) {
      constructor.prototype.asEnumerable = asEnumerable;
    } else {
      String.prototype.asEnumerable = Array.prototype.asEnumerable = asEnumerable;
    }
  }

  function range(start, count) {
    return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
      var i;
      return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            i = start;

          case 1:
            if (!(i < start + count)) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 4;
            return i;

          case 4:
            i++;
            context$2$0.next = 1;
            break;

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    }));
  }

  function repeat(val, count) {
    return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
      var localCount;
      return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            localCount = count;

          case 1:
            if (!(localCount-- > 0)) {
              context$2$0.next = 6;
              break;
            }

            context$2$0.next = 4;
            return val;

          case 4:
            context$2$0.next = 1;
            break;

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    }));
  }

  function empty() {
    return new Enumerable(_babelRuntimeRegenerator['default'].mark(function callee$1$0() {
      return _babelRuntimeRegenerator['default'].wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    }));
  }
});