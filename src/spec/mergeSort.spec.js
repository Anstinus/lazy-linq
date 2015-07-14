import {
  _mergeSortTestPack as algo
}
from '../linq';

function iterToArray(iter) {
  let elem;
  let result = [];
  while (!(elem = iter.next()).done) {
    result.push(elem.value);
  }
  return result;
}

describe('sort algo -> ', function () {
  describe('genSubSequences()', function () {

    it('should divided sequence by natual order', function () {
      let data = [2, 1, 3, 6, 4, 2, 2, 5, 3, 4];
      let result = iterToArray(algo.genSubSequences(data, (x, y) => x - y, x => x <= 0));
      expect(result).toEqual([
        [2],
        [1, 3, 6],
        [4],
        [2, 2, 5],
        [3, 4]
      ]);
    });

    it('should divide according to @comp', function () {
      let data = [2, 1, 3, 6, 4, 2, 2, 5, 3, 4];
      let result = iterToArray(algo.genSubSequences(data, (x, y) => y - x, x => x <= 0));
      expect(result).toEqual([
        [2, 1],
        [3],
        [6, 4, 2, 2],
        [5, 3],
        [4]
      ]);
    });

    it('should divide according to @compGroupChecker', function () {
      let data = [2, 1, 3, 6, 4, 2, 2, 5, 3, 4];
      let result = iterToArray(algo.genSubSequences(data, (x, y) => x - y, x => x === 0));
      expect(result).toEqual([
        [2],
        [1],
        [3],
        [6],
        [4],
        [2, 2],
        [5],
        [3],
        [4]
      ]);
    });

    it('when seqence is empty, should return empty sequence', function () {
      let data = [];
      let result = iterToArray(algo.genSubSequences(data, (x, y) => x - y, x => x <= 0));
      expect(result.length).toBe(0);
    });
  });

  describe('genTwoMergedSequence()', function () {
    it('should merge', function () {
      let data1 = [1, 3, 4];
      let data2 = [2, 4, 5];
      let result = iterToArray(algo.genTwoMergedSequence(data1, data2, (x, y) => x - y));
      expect(result).toEqual([1, 2, 3, 4, 4, 5]);
    });

    it('should merge according to @comp', function () {
      let data1 = [4, 3, 1];
      let data2 = [5, 4, 2];
      let result = iterToArray(algo.genTwoMergedSequence(data1, data2, (x, y) => y - x));
      expect(result).toEqual([5, 4, 4, 3, 2, 1]);
    });

    it('should workd fine when one sequence is empty', function () {
      let data1 = [1, 3, 4];
      let data2 = [2, 4, 5];

      var result = iterToArray(algo.genTwoMergedSequence([], data2, (x, y) => x - y));
      expect(result).toEqual([2, 4, 5]);

      var result = iterToArray(algo.genTwoMergedSequence(data1, [], (x, y) => x - y));
      expect(result).toEqual([1, 3, 4]);
    });
  });

  describe('genMergedAndSortedSequence()', function () {
    it('when sequence count is even, should merge correctly', function () {
      let data = [[1, 2], [1, 4], [2], [1, 3]];
      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result).toEqual([1, 1, 1, 2, 2, 3, 4]);
    });

    it('when sequence count is odd, should merge correctly', function () {
      let data = [[1, 2], [1, 4], [2]];
      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result).toEqual([1, 1, 2, 2, 4]);
    });

    it('when sequence count is 2, should merge correctly', function () {
      let data = [[1, 2], [1, 4]];
      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result).toEqual([1, 1, 2, 4]);
    });


    it('when sequence count is 1, should return it directly', function () {
      let data = [[1, 2]];

      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result).toEqual([1, 2]);
    });

    it('when sequence count is 0, should return empty sequence', function () {
      let data = [];

      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result.length).toEqual(0);
    });

    it('when some sequence is empty, should merge without error', function () {
      let data = [[1, 2], [1, 4], [], []];
      let result = iterToArray(algo.genMergedAndSortedSequence(data[Symbol.iterator](), (x, y) => x - y));

      expect(result).toEqual([1, 1, 2, 4]);
    });
  });

  describe('genMergeSort()', function () {
    it('should sort correctly', function () {
      let data = [3, 2, 7, 9, 5, 0];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => x - y));

      expect(result).toEqual([0, 2, 3, 5, 7, 9]);
    });

    it('when sequence is empty, should return empty sequence', function () {
      let data = [];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => x - y));

      expect(result.length).toBe(0);
    });

    it('when sequence contains only 1 element, should work fine', function () {
      let data = [3];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => x - y));

      expect(result).toEqual([3]);
    });

    it('when sequence contains only 2 elements, should work fine', function () {
      let data = [6, 2];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => x - y));

      expect(result).toEqual([2, 6]);
    });

    it('when @comp is provided, should sort by it', function () {
      let data = [1, 3, 2];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => y - x));

      expect(result).toEqual([3, 2, 1]);
    });

    it('should be stable', function () {
      let data = ['bd', 'bb', 'cc', 'aa', 'ab'];
      let result = iterToArray(algo.genMergeSort(data, (x, y) => x[0] < y[0] ? -1 : (x[0] === y[0] ? 0 : 1)));

      expect(result).toEqual(['aa', 'ab', 'bd', 'bb', 'cc']);
    });
  });

});
