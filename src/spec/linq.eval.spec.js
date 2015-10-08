import * as linq from '../linq';

linq.installAsEnumerable();

describe('linq lib -> eval members ->', function () {
  describe('all()', function () {
    it('when @pred is not a function, should throw', function () {
      expect(() => data.all()).toThrow();
      expect(() => data.all(1)).toThrow();
      expect(() => data.all({})).toThrow();
    });

    let data = linq.range(1, 3);

    describe('with non-empty sequence', function () {
      it('when all are true, should return true', function () {
        expect(data.all(x => x > 0)).toBe(true);
      });

      it('when all are false, should return false', function () {
        expect(data.all(x => x < 0)).toBe(false);
      });

      it('when some are true and some are false, should return false', function () {
        expect(data.all(x => x > 1)).toBe(false);
      });
    });

    describe('with empty sequence', function () {
      it('should always return true', function () {
        expect(linq.empty().all(x => false)).toBe(true);
      });
    });
  });


  describe('any()', function () {
    let data = linq.range(1, 3);

    describe('with non-empty sequence', function () {
      it('when all are true, should return true', function () {
        expect(data.any(x => x > 0)).toBe(true);
      });

      it('when all are false, should return false', function () {
        expect(data.any(x => x < 0)).toBe(false);
      });

      it('when some are true and some are false, should return false', function () {
        expect(data.any(x => x > 1)).toBe(true);
      });

      it('when @pred is undefined, should return true', function () {
        expect(data.any()).toBe(true);
      });
    });

    describe('with empty sequence', function () {
      it('should always return false', function () {
        expect(linq.empty().any(x => true)).toBe(false);
        expect(linq.empty().any()).toBe(false);
      });
    });
  });

  describe('singleOrDefault()', function () {
    describe('with empty sequence', function () {
      let data = linq.empty();

      it('should always return undefined', function () {
        expect(data.singleOrDefault()).toBeUndefined();
        expect(data.singleOrDefault(x => true)).toBeUndefined();
      });
    });

    describe('with sequence with only one element', function () {
      let data = linq.range(1, 1);

      it('when @pred is default, should return the only element', function () {
        expect(data.singleOrDefault()).toBe(1);
      });

      it('when @pred is custom and meet, should return the only element', function () {
        expect(data.singleOrDefault(x => x >= 1)).toBe(1);
      });

      it('when @pred is custom and NOT meet, should return undefined', function () {
        expect(data.singleOrDefault(x => x >= 4)).toBeUndefined();
      });
    });

    describe('with sequence with more than one element', function () {
      let data = linq.range(1, 3);

      it('when @pred is default, should throw', function () {
        expect(() => data.singleOrDefault()).toThrow();
      });

      it('when @pred is custom and meet once, should return the only meet element', function () {
        expect(data.singleOrDefault(x => x % 2 === 0)).toBe(2);
      });

      it('when @pred is custom and meet twice, should throw', function () {
        expect(() => data.singleOrDefault(x => x % 2 !== 0)).toThrow();
      });

      it('when @pred is custom and NOT meet, should return undefined', function () {
        expect(data.singleOrDefault(x => x >= 4)).toBeUndefined();
      });
    });
  });

  describe('single()', function () {
    describe('with empty sequence', function () {
      let data = linq.empty();

      it('should always throw', function () {
        expect(() => data.single()).toThrow();
        expect(() => data.single(x => true)).toThrow();
      });
    });

    describe('with sequence with only one element', function () {
      let data = linq.range(1, 1);

      it('when @pred is default, should return the only element', function () {
        expect(data.single()).toBe(1);
      });

      it('when @pred is custom and meet, should return the only element', function () {
        expect(data.single(x => x >= 1)).toBe(1);
      });

      it('when @pred is custom and NOT meet, should throw', function () {
        expect(() => data.single(x => x >= 4)).toThrow();
      });
    });

    describe('with sequence with more than one element', function () {
      let data = linq.range(1, 3);

      it('when @pred is default, should throw', function () {
        expect(() => data.single()).toThrow();
      });

      it('when @pred is custom and meet once, should return the only meet element', function () {
        expect(data.single(x => x % 2 === 0)).toBe(2);
      });

      it('when @pred is custom and meet twice, should throw', function () {
        expect(() => data.single(x => x % 2 !== 0)).toThrow();
      });

      it('when @pred is custom and NOT meet, should throw', function () {
        expect(() => data.single(x => x >= 4)).toThrow();
      });
    });
  });

  describe('count()', function () {
    let data = linq.range(1, 3);

    describe('with non-empty sequence', function () {
      it('when @pred != undefined should return matched count', function () {
        expect(data.count(x => x >= 2)).toBe(2);
      });

      it('when @pred is undefined should return element count', function () {
        expect(data.count()).toBe(3);
      });
    });

    describe('with empty sequence', function () {
      it('should always return 0', function () {
        expect(linq.empty().count(x => true)).toBe(0);
        expect(linq.empty().count()).toBe(0);
      });
    });
  });

  describe('contains()', function () {
    describe('with non-empty sequence', function () {
      describe('with default @comp', function () {
        let data = linq.range(1, 3);

        it('when @val is an existing element, should return true', function () {
          expect(data.contains(2)).toBe(true);
        });

        it('when @val is NOT an existing element, should return false', function () {
          expect(data.contains(4)).toBe(false);
        });
      });

      describe('with custom @comp', function () {
        let data = ['aa', 'bb', 'cc'].asEnumerable();

        it('when any @comp() result is true, should return true', function () {
          expect(data.contains('cd', (x, y) => x[0] === y[0])).toBe(true);
        });

        it('when all @comp() result are false, should return false', function () {
          expect(data.contains('cd', (x, y) => x[1] === y[1])).toBe(false);
        });
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('should always return false', function () {
        expect(data.contains(1)).toBe(false);
        expect(data.contains(1, (x, y) => true)).toBe(false);
        expect(data.contains()).toBe(false);
      });
    });
  });

  describe('elementAtOrDefault()', function () {
    let data = linq.range(1, 3);
    let arrayData = [1, 2, 3].asEnumerable();

    it('when @index is not an integer, should throw', function () {
      expect(() => linq.empty().elementAtOrDefault('abc')).toThrow();
      expect(() => data.elementAtOrDefault('abc')).toThrow();
      expect(() => linq.empty().elementAtOrDefault()).toThrow();
      expect(() => data.elementAtOrDefault()).toThrow();
    });

    it('when @index is in range, should return the corresponding element', function () {
      expect(data.elementAtOrDefault(1)).toBe(2);
      expect(arrayData.elementAtOrDefault(1)).toBe(2);
    });

    it('when @index is out of range, should return undefined', function () {
      expect(data.elementAtOrDefault(-1)).toBeUndefined();
      expect(data.elementAtOrDefault(3)).toBeUndefined();
      expect(arrayData.elementAtOrDefault(-1)).toBeUndefined();
      expect(arrayData.elementAtOrDefault(3)).toBeUndefined();
    });
  });

  describe('elementAt()', function () {
    let data = linq.range(1, 3);
    let arrayData = [1, 2, 3].asEnumerable();

    it('when @index is not an integer, should throw', function () {
      expect(() => linq.empty().elementAt('abc')).toThrow();
      expect(() => data.elementAt('abc')).toThrow();
      expect(() => linq.empty().elementAt()).toThrow();
      expect(() => data.elementAt()).toThrow();
    });

    it('when @index is in range, should return the corresponding element', function () {
      expect(data.elementAt(1)).toBe(2);
      expect(arrayData.elementAt(1)).toBe(2);
    });

    it('when @index is out of range, should throw', function () {
      expect(() => data.elementAt(-1)).toThrow();
      expect(() => data.elementAt(3)).toThrow();
      expect(() => arrayData.elementAt(-1)).toThrow();
      expect(() => arrayData.elementAt(3)).toThrow();
    });
  });


  describe('firstOrDefault()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);

      it('when @pred is default, should return the first element', function () {
        expect(data.firstOrDefault()).toBe(1);
      });

      it('when @pred is custom and meet, should return the first element that meets @pred', function () {
        expect(data.firstOrDefault(x => x >= 2)).toBe(2);
      });

      it('when @pred is custom and NOT meet, should return undefined', function () {
        expect(data.firstOrDefault(x => x >= 4)).toBeUndefined();
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('should always return undefined', function () {
        expect(data.firstOrDefault()).toBeUndefined();
        expect(data.firstOrDefault(x => true)).toBeUndefined();
      });
    });
  });

  describe('first()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);

      it('when @pred is default, should return the first element', function () {
        expect(data.first()).toBe(1);
      });

      it('when @pred is custom and meet, should return the first element that meets @pred', function () {
        expect(data.first(x => x >= 2)).toBe(2);
      });

      it('when @pred is custom and NOT meet, should throw', function () {
        expect(() => data.first(x => x >= 4)).toThrow();
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('should always throw', function () {
        expect(() => data.first()).toThrow();
        expect(() => data.first(x => true)).toThrow();
      });
    });
  });

  describe('lastOrDefault()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);
      let arrayData = [1, 2, 3].asEnumerable();

      it('when @pred is default, should return the last element', function () {
        expect(data.lastOrDefault()).toBe(3);
        expect(arrayData.lastOrDefault()).toBe(3);
      });

      it('when @pred is custom and meet, should return the last element that meets @pred', function () {
        expect(data.lastOrDefault(x => x <= 2)).toBe(2);
        expect(arrayData.lastOrDefault(x => x <= 2)).toBe(2);
      });

      it('when @pred is custom and NOT meet, should return undefined', function () {
        expect(data.lastOrDefault(x => x >= 4)).toBeUndefined();
        expect(arrayData.lastOrDefault(x => x >= 4)).toBeUndefined();
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();
      let arrayData = [].asEnumerable();

      it('should always return undefined', function () {
        expect(data.lastOrDefault()).toBeUndefined();
        expect(data.lastOrDefault(x => true)).toBeUndefined();
        expect(arrayData.lastOrDefault()).toBeUndefined();
        expect(arrayData.lastOrDefault(x => true)).toBeUndefined();
      });
    });
  });

  describe('last()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);
      let arrayData = [1, 2, 3].asEnumerable();

      it('when @pred is default, should return the last element', function () {
        expect(data.last()).toBe(3);
        expect(arrayData.last()).toBe(3);
      });

      it('when @pred is custom and meet, should return the last element that meets @pred', function () {
        expect(data.last(x => x <= 2)).toBe(2);
        expect(arrayData.last(x => x <= 2)).toBe(2);
      });

      it('when @pred is custom and NOT meet, should throw', function () {
        expect(() => data.last(x => x >= 4)).toThrow();
        expect(() => arrayData.last(x => x >= 4)).toThrow();
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();
      let arrayData = [].asEnumerable();

      it('should always throw', function () {
        expect(() => data.last()).toThrow();
        expect(() => data.last(x => true)).toThrow();
        expect(() => arrayData.last()).toThrow();
        expect(() => arrayData.last(x => true)).toThrow();
      });
    });
  });

  describe('defaultIfEmpty()', function () {
    describe('with empty sequence', function () {
      it('when @val is defined, should return sequence contains only one element = @val', function () {
        expect(linq.empty().defaultIfEmpty(1).toArray()).toEqual([1]);
      });

      it('when @val is undefined, should return an empty sequence', function () {
        expect(linq.empty().defaultIfEmpty().toArray().length).toBe(0);
      });
    });

    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);
      it('should always return original object', function () {
        expect(data.defaultIfEmpty()).toBe(data);
      });
    });
  });

  describe('sequenceEqual()', function () {
    it('when two sequences are extatly equal, should return true', function () {
      let seq1 = linq.range(1, 3);
      let seq2 = linq.range(1, 3);
      expect(seq1.sequenceEqual(seq2)).toBe(true);
    });

    it('when length are equal but elements are differnt, should return false', function () {
      let seq1 = linq.range(1, 3);
      let seq2 = linq.range(2, 3);
      expect(seq1.sequenceEqual(seq2)).toBe(false);
    });

    it('when length are different, should return false', function () {
      let seq1 = linq.range(1, 3);
      let seq2 = linq.range(1, 4);
      expect(seq1.sequenceEqual(seq2)).toBe(false);
    });
  });

  describe('min()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);

      it('when @trans is default', function () {
        expect(data.min()).toBe(1);
      });

      it('when @trans is custom, should return min defined by @trans result', function () {
        expect(data.min(x => x * -1)).toBe(-3);
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('always return undefined', function () {
        expect(data.min()).toBeUndefined();
        expect(data.min(x => x * -1)).toBeUndefined();
      });
    });
  });

  describe('max()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.range(1, 3);

      it('when @trans is default', function () {
        expect(data.max()).toBe(3);
      });

      it('when @trans is custom, should return max defined by @trans result', function () {
        expect(data.max(x => x * -1)).toBe(-1);
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('always return undefined', function () {
        expect(data.max()).toBeUndefined();
        expect(data.max(x => x * -1)).toBeUndefined();
      });
    });
  });

  describe('sum()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.repeat(1, 3);

      it('when @trans is default', function () {
        expect(data.sum()).toBe(3);
      });

      it('when @trans is custom, should return sum defined by @trans result', function () {
        expect(data.sum(x => x * -1)).toBe(-3);
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('always return 0', function () {
        expect(data.sum()).toBe(0);
        expect(data.sum(x => x * -1)).toBe(0);
      });
    });
  });

  describe('average()', function () {
    describe('with non-empty sequence', function () {
      let data = linq.repeat(1, 3);

      it('when @trans is default', function () {
        expect(data.average()).toBe(1);
      });

      it('when @trans is custom, should return sum defined by @trans result', function () {
        expect(data.average(x => x * -1)).toBe(-1);
      });
    });

    describe('with empty sequence', function () {
      let data = linq.empty();

      it('always return 0', function () {
        expect(data.average()).toBe(0);
        expect(data.average(x => x * -1)).toBe(0);
      });
    });
  });

  describe('aggregate()', function () {
    let data = linq.repeat(1, 3);

    it('when both @seed and @aggFunc are not provided, should throw', function () {
      expect(() => data.aggregate()).toThrow();
    });

    it('when @resultTrans is undefined, return the aggregate result directly', function () {
      expect(data.aggregate(1, (s, x) => s + x)).toBe(4);
    });

    it('when @resultTrans defined, return the aggregate result transformed', function () {
      expect(data.aggregate(1, (s, x) => s + x, x => x * -1)).toBe(-4);
    });

    describe('when only @seed is provided', function () {
      it('and sequence is empty, should return undefined', function () {
        expect(linq.empty().aggregate((s, x) => s + x)).toBeUndefined();
      });

      it('and sequence is not empty, should use the first element as seed', function () {
        expect(data.aggregate((s, x) => s + x)).toBe(3);
      });
    });
  });

  describe('toArray()', function () {
    let data = linq.range(1, 3);

    it('should work', function () {
      expect(data.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('toSet()', function () {
    it('when sequence is empty, should return an empty Set', function () {
      let data = linq.empty();
      expect(data.toSet().size).toBe(0);
    });

    it('when sequence is not empty, should add all to Set', function () {
      let set = [1, 2, 2, 3].asEnumerable().toSet();
      expect(set.size).toBe(3);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(true);
      expect(set.has(3)).toBe(true);
    });
  });

  describe('toMap()', function () {
    it('when sequence is empty, should always return empty Map', function () {
      let data = linq.empty();
      expect(data.toMap().size).toBe(0);
    });

    describe('testee name', function () {
      let data = ['aa', 'ab', 'bb', 'cc', 'bb'].asEnumerable();

      it('should work with duplicated keys.', function () {
        let map = data.toMap(x => x, y => y[0]);
        expect(map.size).toBe(4);
        expect(map.has('aa')).toBe(true);
        expect(map.has('ab')).toBe(true);
        expect(map.has('bb')).toBe(true);
        expect(map.has('cc')).toBe(true);
        expect(map.get('aa')).toBe('a');
        expect(map.get('ab')).toBe('a');
        expect(map.get('bb')).toBe('b');
        expect(map.get('cc')).toBe('c');
      });
    });
  });

  describe('forEach()', function () {
    it('when @op is not a function, should throw', function () {
      expect(() => [].asEnumerable().forEach()).toThrow();
    });

    it('when sequence is not empty, should enumerable all elements', function () {
      let dest = [];
      [1, 2, 3].asEnumerable().forEach(x => dest.push(x));
      expect(dest).toEqual([1, 2, 3]);
    });

    it('when sequence is empty, should not call @op', function () {
      let isCalled = false;
      [].asEnumerable().forEach(x => isCalled = true);
      expect(isCalled).toBe(false);
    });
  });
});
