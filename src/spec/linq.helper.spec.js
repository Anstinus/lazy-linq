import * as linq from '../linq';

linq.installAsEnumerable();

describe('linq lib -> helper function ->', function () {
  describe('range()', function () {
    it('should generate incremental sequence', function () {
      expect(linq.range(1, 3).toArray()).toEqual([1, 2, 3]);
    });

    it('with @count == 0 should generate empty sequence', function () {
      expect(linq.range(1, 0).toArray().length).toBe(0);
    });

    it('with @count < 0 should generate empty sequence', function () {
      expect(linq.range(1, -1).toArray().length).toBe(0);
    });

    it('toArray() again on the same range() should generate the same result', function () {
      let data = linq.range(1, 3);
      expect(data.toArray()).toEqual([1, 2, 3]);
      expect(data.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('repeat()', function () {
    it('should generate identical sequence', function () {
      expect(linq.repeat(1, 3).toArray()).toEqual([1, 1, 1]);
    });

    it('with @count == 0 should generate empty sequence', function () {
      expect(linq.repeat(1, 0).toArray().length).toBe(0);
    });

    it('with @count < 0 should generate empty sequence', function () {
      expect(linq.repeat(1, -1).toArray().length).toBe(0);
    });

    it('toArray() again on the same repeat() should generate the same result', function () {
      let data = linq.repeat(1, 3);
      expect(data.toArray()).toEqual([1, 1, 1]);
      expect(data.toArray()).toEqual([1, 1, 1]);
    });
  });

  describe('empty()', function () {
    it('should be empty', function () {
      expect(linq.empty().toArray().length).toBe(0);
    });
  });
});
