import * as linq from '../linq';

linq.installAsEnumerable();

describe('linq lib -> chain members ->', function () {
  describe('skip()', function () {
    let data = linq.range(1, 3);

    it('when @n is not an integer, should throw', function () {
      expect(() => data.skip()).toThrow();
      expect(() => data.skip(null)).toThrow();
      expect(() => data.skip({})).toThrow();
      expect(() => data.skip(1.2)).toThrow();
    });

    it('when @n <= 0, should skip none', function () {
      expect(data.skip(0).toArray()).toEqual([1, 2, 3]);
      expect(data.skip(-1).toArray()).toEqual([1, 2, 3]);
    });

    it('when @n > 0, should skip @n', function () {
      expect(data.skip(1).toArray()).toEqual([2, 3]);
    });
  });

  describe('skipWhile()', function () {
    let data = linq.range(1, 3);

    it('when @pred is not a function, should throw', function () {
      expect(() => data.skipWhile().toArray()).toThrow();
      expect(() => data.skipWhile(1).toArray()).toThrow();
      expect(() => data.skipWhile({}).toArray()).toThrow();
    });

    it('should skip while @pred() is true', function () {
      expect(data.skipWhile(x => x <= 2).toArray()).toEqual([3]);
    });
  });

  describe('take()', function () {
    let data = linq.range(1, 3);

    it('when @n is not an integer, should throw', function () {
      expect(() => data.take()).toThrow();
      expect(() => data.take(null)).toThrow();
      expect(() => data.take({})).toThrow();
      expect(() => data.take(1.2)).toThrow();
    });

    it('when @n <= 0, should take none', function () {
      expect(data.take(0).toArray().length).toEqual(0);
      expect(data.take(-1).toArray().length).toEqual(0);
    });

    it('when @n > 0, should take @n', function () {
      expect(data.take(2).toArray()).toEqual([1, 2]);
    });
  });

  describe('takeWhile()', function () {
    let data = linq.range(1, 3);

    it('when @pred is not a function, should throw', function () {
      expect(() => data.takeWhile().toArray()).toThrow();
    });

    it('should take while @pred() is true', function () {
      expect(data.takeWhile(x => x <= 2).toArray()).toEqual([1, 2]);
    });
  });

  describe('reverse()', function () {
    let data = linq.range(1, 3);

    it('when sequence is not empty, should reverse() all elements', function () {
      expect(data.reverse().toArray()).toEqual([3, 2, 1]);
    });

    it('when sequence is empty, should return empty sequence', function () {
      expect(linq.empty().reverse().toArray().length).toBe(0);
    });
  });

  describe('select()', function () {
    let data = linq.range(1, 3);

    it('when @trans is not a function, should throw', function () {
      expect(() => data.select()).toThrow();
      expect(() => data.select(1)).toThrow();
      expect(() => data.select({})).toThrow();
    });

    it('should transform values', function () {
      expect(data.select(x => x + 1).toArray()).toEqual([2, 3, 4]);
    });
  });

  describe('where()', function () {
    let data = linq.range(1, 3);

    it('when @pred is not a funtion, should throw', function () {
      expect(() => data.where().toArray()).toThrow();
      expect(() => data.where(1).toArray()).toThrow();
      expect(() => data.where({}).toArray()).toThrow();
    });

    it('should return all element meet @pred', function () {
      expect(data.where(x => x % 2 !== 0).toArray()).toEqual([1, 3]);
    });
  });

  describe('selectMany()', function () {
    let data = linq.range(1, 3);

    it('when @genSeq is not a function, should throw', function () {
      expect(() => data.selectMany().toArray()).toThrow();
      expect(() => data.selectMany(1).toArray()).toThrow();
      expect(() => data.selectMany({}).toArray()).toThrow();
    });

    it('when @resultTrans is not provided, should flat all result of @genSeq', function () {
      expect(data.selectMany(x => linq.repeat(x, 2)).toArray()).toEqual([1, 1, 2, 2, 3, 3]);
    });

    it('when @resultTrans is provided, should transform each result of @genSeq', function () {
      expect(data.selectMany(x => linq.repeat(x, 2), (x, seq) => seq.sum()).toArray()).toEqual([2, 4, 6]);
    });
  });

  describe('groupBy()', function () {
    let data = [1, 2, 3, 1].asEnumerable();

    it('when all parameters are default, should use element themselves as key and value', function () {
      let result = data.groupBy().toArray();
      expect(result.length).toBe(3);
      expect(result[0].key).toEqual(1);
      expect(result[0].toArray()).toEqual([1, 1]);
      expect(result[1].key).toEqual(2);
      expect(result[1].toArray()).toEqual([2]);
      expect(result[2].key).toEqual(3);
      expect(result[2].toArray()).toEqual([3]);
    });

    it('when @keySelector is custom, should use @keySelector(element) as key', function () {
      let result = data.groupBy(x => x % 2).toArray();
      expect(result.length).toBe(2);
      expect(result[0].key).toEqual(1);
      expect(result[0].toArray()).toEqual([1, 3, 1]);
      expect(result[1].key).toEqual(0);
      expect(result[1].toArray()).toEqual([2]);
    });

    it('when @valueSelector is custom, should use @valueSelector(element) as value', function () {
      let result = data.groupBy(x => x, y => y * -1).toArray();
      expect(result.length).toBe(3);
      expect(result[0].key).toEqual(1);
      expect(result[0].toArray()).toEqual([-1, -1]);
      expect(result[1].key).toEqual(2);
      expect(result[1].toArray()).toEqual([-2]);
      expect(result[2].key).toEqual(3);
      expect(result[2].toArray()).toEqual([-3]);
    });

    it('when @resultTrans is custom, should use @resultTrans(key, valSeq) as final value', function () {
      let result = data.groupBy(x => x, y => y, (key, valSeq) => valSeq.asEnumerable().sum()).toArray();
      expect(result.length).toBe(3);
      expect(result[0]).toEqual(2);
      expect(result[1]).toEqual(2);
      expect(result[2]).toEqual(3);
    });

    it('when @keyEqual is custom, should use it to determine whether two keys are equal or not', function () {
      let data = ['ab', 'bc', 'aa', 'cc'].asEnumerable();
      let result = data.groupBy(...[, , , (x, y) => x[0] === y[0]]).toArray();
      expect(result.length).toBe(3);
      expect(result[0].key).toEqual('ab');
      expect(result[0].toArray()).toEqual(['ab', 'aa']);
      expect(result[1].key).toEqual('bc');
      expect(result[1].toArray()).toEqual(['bc']);
      expect(result[2].key).toEqual('cc');
      expect(result[2].toArray()).toEqual(['cc']);
    });
  });

  describe('orderBy()', function () {
    let data = [3, 1, 2].asEnumerable();

    it('should sort correctly', function () {
      expect(data.orderBy().toArray()).toEqual([1, 2, 3]);
    });

    it('when @keySelector is custom, should order by @keySelector(element)', function () {
      expect(data.orderBy(x => 1 / x).toArray()).toEqual([3, 2, 1]);
    });

    it('when @comp is custom, should compare elements pair by @comp(elem1, elem2)', function () {
      expect(data.orderBy(x => x, (x, y) => y - x).toArray()).toEqual([3, 2, 1]);
    });

    it('should be stable', function () {
      let data = ['ba', 'cb', 'ab', 'ca', 'aa', 'bb'].asEnumerable();

      expect(data.orderBy(x => x[0]).toArray()).toEqual(['ab', 'aa', 'ba', 'bb', 'cb', 'ca']);
    });
  });

  describe('thenBy()', function () {
    let data = ['cac', 'bca', 'cba', 'cab'].asEnumerable();

    it('should sort after orderBy()', function () {
      expect(data.orderBy(x => x[0]).thenBy(x => x[1]).toArray()).toEqual(['bca', 'cac', 'cab', 'cba']);
    });

    it('should sort for more than one thenBy()', function () {
      expect(data.orderBy(x => x[0]).thenBy(x => x[1]).thenBy(x => x[2]).toArray()).toEqual(['bca', 'cab', 'cac', 'cba']);
    });

    it('duplicated key selector to should not change order', function () {
      expect(data.orderBy(x => x[0]).thenBy(x => x[0]).thenBy(x => x[0]).toArray()).toEqual(['bca', 'cac', 'cba', 'cab']);
    });

    it('when not follow a orderBy(), should throw', function () {
      expect(() => data.thenBy(x => x)).toThrow();
    });

    it('when @keySelector is default, should use whole value to sort', function () {
      expect(data.orderBy(x => x[0]).thenBy().toArray()).toEqual(['bca', 'cab', 'cac', 'cba']);
    });

    it('when @comp is custom, should use it to sort', function () {
      let comp = (x, y) => x === y ? 0 : (x < y ? 1 : -1);
      expect(data.orderBy(x => x[0]).thenBy(x => x[1], comp).toArray()).toEqual(['bca', 'cba', 'cac', 'cab']);
    });
  });

  describe('orderByDescending()', function () {
    let data = [3, 1, 2].asEnumerable();

    it('should sort dec', function () {
      expect(data.orderByDescending().toArray()).toEqual([3, 2, 1]);
    });
  });

  describe('thenByDescending()', function () {
    let data = ['cac', 'bca', 'cba', 'cab'].asEnumerable();

    it('should sort after orderBy() desc', function () {
      expect(data.orderBy(x => x[0]).thenByDescending(x => x[1]).toArray()).toEqual(['bca', 'cba', 'cac', 'cab']);
    });

    it('should work with orderByDescending()', function () {
      expect(data.orderByDescending(x => x[0]).thenByDescending(x => x[1]).toArray()).toEqual(['cba', 'cac', 'cab', 'bca']);
    });
  });

  describe('join()', function () {
    let data1 = [1, 2, 3, 4].asEnumerable();
    let data2 = [2, 4, 6];

    it('when other is not provided, should throw', function () {
      expect(() => data1.join()).toThrow();
      expect(() => data1.join(null)).toThrow();
    });

    it('with default parameters, should join by values them selves and return a sequence of array with both values from left and right sequences', function () {
      expect(data1.join(data2).toArray()).toEqual([
        [2, 2],
        [4, 4]
      ]);
    });

    it('when no pair matched, should return empty result', function () {
      expect(data1.join([5, 6]).toArray().length).toBe(0);
    });

    it('when any or both sequences are empty, should return empty result', function () {
      expect(data1.join([]).toArray().length).toBe(0);
      expect([].asEnumerable().join(data2).toArray().length).toBe(0);
      expect([].asEnumerable().join([]).toArray().length).toBe(0);
    });

    it('when @thisKeySelector is provided, should use it', function () {
      expect(data1.join(data2, x => x + 1).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });

    it('when @otherKeySelector is provided, should use it', function () {
      expect(data1.join(data2, undefined, y => y - 1).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });

    it('when @resultTrans is provided, should use it', function () {
      expect(data1.join(data2, ...[, , (x, y) => x + y]).toArray()).toEqual([4, 8]);
    });

    it('when @equal is provided, should use it', function () {
      expect(data1.join(data2, ...[, , , (x, y) => x + 1 === y]).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });
  });

  describe('groupJoin()', function () {
    let data1 = [1, 2, 3, 4].asEnumerable();
    let data2 = [2, 4, 6];

    it('when other is not provided, should throw', function () {
      expect(() => data1.join()).toThrow();
      expect(() => data1.join(null)).toThrow();
    });

    it('with default parameters, should join by values them selves and return a sequence of array with both values from left and right sequences', function () {
      expect(data1.join(data2).toArray()).toEqual([
        [2, 2],
        [4, 4]
      ]);
    });

    it('when no pair matched, should return empty result', function () {
      expect(data1.join([5, 6]).toArray().length).toBe(0);
    });

    it('when any or both sequences are empty, should return empty result', function () {
      expect(data1.join([]).toArray().length).toBe(0);
      expect([].asEnumerable().join(data2).toArray().length).toBe(0);
      expect([].asEnumerable().join([]).toArray().length).toBe(0);
    });

    it('when @thisKeySelector is provided, should use it', function () {
      expect(data1.join(data2, x => x + 1).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });

    it('when @otherKeySelector is provided, should use it', function () {
      expect(data1.join(data2, undefined, y => y - 1).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });

    it('when @resultTrans is provided, should use it', function () {
      expect(data1.join(data2, ...[, , (x, y) => x + y]).toArray()).toEqual([4, 8]);
    });

    it('when @equal is provided, should use it', function () {
      expect(data1.join(data2, ...[, , , (x, y) => x + 1 === y]).toArray()).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });
  });

  describe('zip()', function () {
    let data1 = [1, 2].asEnumerable();
    let data2 = [2, 3, 4];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.zip()).toThrow();
      expect(() => data1.zip(null)).toThrow();
    });

    it('when all parameter are default, should generate matched pair array', function () {
      expect(data1.zip(data2).toArray()).toEqual([
        [1, 2],
        [2, 3]
      ])
    });

    it('when one of or both sequences are empty, should return empty sequence', function () {
      expect(data1.zip([]).toArray()).toEqual([]);
      expect([].asEnumerable().zip(data2).toArray()).toEqual([]);
      expect([].asEnumerable().zip([]).toArray()).toEqual([]);
    });
  });

  describe('concat()', function () {
    let data1 = [1, 2].asEnumerable();
    let data2 = [2, 3];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.concat()).toThrow();
      expect(() => data1.concat(null)).toThrow();
    });

    it('should concat both sequences', function () {
      expect(data1.concat(data2).toArray()).toEqual([1, 2, 2, 3]);
    });

    it('when either or both of the two sequences are empty, should work fine', function () {
      expect(data1.concat([]).toArray()).toEqual([1, 2]);
      expect([].asEnumerable().concat(data2).toArray()).toEqual([2, 3]);
      expect([].asEnumerable().concat([]).toArray()).toEqual([]);
    });
  });

  describe('otherThan()', function () {
    let data1 = [1, 2, 1].asEnumerable();
    let data2 = [2, 3, 2];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.otherThan()).toThrow();
      expect(() => data1.otherThan(null)).toThrow();
    });

    it('should remove items from this who are equal to any iterm in other', function () {
      expect(data1.otherThan(data2).toArray()).toEqual([1, 1]);
    });

    it('when @other is an empty sequence, should return this sequence', function () {
      expect(data1.otherThan([]).toArray()).toEqual([1, 2, 1]);
    });

    it('when this is an empty sequence, should return empty sequence', function () {
      expect([].asEnumerable().otherThan(data2).toArray()).toEqual([]);
    });

    it('when @equal is provided, should use it to compare items', function () {
      data1 = ['ab', 'bb'].asEnumerable();
      data2 = ['ac', 'aa'];
      expect(data1.otherThan(data2, (x, y) => x[0] === y[0]).toArray()).toEqual(['bb']);
    });
  });

  describe('distinct()', function () {
    let data = [1, 2, 3, 2, 1].asEnumerable();

    it('when @equal is default, should remove duplicated items', function () {
      expect(data.distinct().toArray()).toEqual([1, 2, 3]);
    });

    it('when @equal is custom, should use it to compare items', function () {
      data = ['ab', 'bb', 'ac'].asEnumerable();
      expect(data.distinct((x, y) => x[0] == y[0]).toArray()).toEqual(['ab', 'bb']);
    });

    it('when this is empty, should return empty', function () {
      expect([].asEnumerable().distinct().toArray()).toEqual([]);
    });
  });

  describe('union()', function () {
    let data1 = [1, 2, 1].asEnumerable();
    let data2 = [2, 3, 2];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.union()).toThrow();
      expect(() => data1.union(null)).toThrow();
    });

    it('should contain items from both sequnces with no duplication', function () {
      expect(data1.union(data2).toArray()).toEqual([1, 2, 3]);
    });

    it('when @other is an empty sequence, should return this sequence with no duplication', function () {
      expect(data1.union([]).toArray()).toEqual([1, 2]);
    });

    it('when this is an empty sequence, should other sequence', function () {
      expect([].asEnumerable().union(data2).toArray()).toEqual([2, 3]);
    });

    it('when @equal is provided, should use it to compare items', function () {
      data1 = ['ab', 'bb'].asEnumerable();
      data2 = ['ac', 'aa'];
      expect(data1.union(data2, (x, y) => x[0] === y[0]).toArray()).toEqual(['ab', 'bb']);
    });
  });

  describe('intersect()', function () {
    let data1 = [1, 2, 1].asEnumerable();
    let data2 = [2, 3, 2];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.intersect()).toThrow();
      expect(() => data1.intersect(null)).toThrow();
    });

    it('should contain items exist in both sequnces but with no duplication', function () {
      expect(data1.intersect(data2).toArray()).toEqual([2]);
    });

    it('when @other is an empty sequence, should return empty sequence', function () {
      expect(data1.intersect([]).toArray()).toEqual([]);
    });

    it('when this is an empty sequence, should return empty sequence', function () {
      expect([].asEnumerable().intersect(data2).toArray()).toEqual([]);
    });

    it('when @equal is provided, should use it to compare items', function () {
      data1 = ['ab', 'bb'].asEnumerable();
      data2 = ['ac', 'aa'];
      expect(data1.intersect(data2, (x, y) => x[0] === y[0]).toArray()).toEqual(['ab']);
    });
  });

  describe('except()', function () {
    let data1 = [1, 2, 1].asEnumerable();
    let data2 = [2, 3, 2];

    it('when @other is not provided, should throw', function () {
      expect(() => data1.except()).toThrow();
      expect(() => data1.except(null)).toThrow();
    });

    it('should remove items from this who are equal to any iterm in other and also remove any duplication in this', function () {
      expect(data1.except(data2).toArray()).toEqual([1]);
    });

    it('when @other is an empty sequence, should return this sequence', function () {
      expect(data1.except([]).toArray()).toEqual([1, 2]);
    });

    it('when this is an empty sequence, should return empty sequence', function () {
      expect([].asEnumerable().except(data2).toArray()).toEqual([]);
    });

    it('when @equal is provided, should use it to compare items', function () {
      data1 = ['ab', 'bb', 'ad'].asEnumerable();
      data2 = ['ac', 'aa'];
      expect(data1.except(data2, (x, y) => x[0] === y[0]).toArray()).toEqual(['bb']);
    });
  });
});
