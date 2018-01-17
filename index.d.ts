type Predicate<T> = (item: T) => boolean;
type Func<TResult> = () => TResult;
type Func1<T1, TResult> = (x: T1) => TResult;
type Func2<T1, T2, TResult> = (x1: T1, x2: T2) => TResult;
type Func3<T1, T2, T3, TResult> = (x1: T1, x2: T2, x3: T3) => TResult;
type Func4<T1, T2, T3, T4, TResult> = (
  x1: T1,
  y1: T2,
  x3: T3,
  x4: T4
) => TResult;

interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  key: TKey;
}

interface IOrderedEnumerable<TElement> extends IEnumerable<TElement> {}

interface IEnumerable<TSource> {
  skip(count: number): IEnumerable<TSource>;
  skipWhile(pred: Predicate<TSource>): IEnumerable<TSource>;
  take(count: number): IEnumerable<TSource>;
  takeWhile(pred: Predicate<TSource>): IEnumerable<TSource>;
  reverse(): IEnumerable<TSource>;
  select<TResult>(selector: Func1<TSource, TResult>): IEnumerable<TResult>;
  where(pred: Predicate<TSource>): IEnumerable<TSource>;
  selectMany<TResult>(
    selector: Func1<TSource, IEnumerable<TResult>>
  ): IEnumerable<TResult>;
  groupBy<TKey>(
    keySelector: Func1<TSource, TKey>
  ): IEnumerable<IGrouping<TKey, TSource>>;
  orderBy<TKey>(keySelector: Func1<TSource, TKey>): IOrderedEnumerable<TSource>;
  orderByDescending<TKey>(
    keySelector: Func1<TSource, TKey>
  ): IOrderedEnumerable<TSource>;
  thenBy<TKey>(keySelector: Func1<TSource, TKey>): IOrderedEnumerable<TSource>;
  thenByDescending<TKey>(
    keySelector: Func1<TSource, TKey>
  ): IOrderedEnumerable<TSource>;
  join<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: Func1<TSource, TKey>,
    innerKeySelector: Func1<TInner, TKey>,
    resultSelector: Func2<TSource, TInner, TResult>
  ): IEnumerable<TResult>;
  groupJoin<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: Func1<TSource, TKey>,
    innerKeySelector: Func1<TInner, TKey>,
    resultSelector: Func2<TSource, IEnumerable<TInner>, TResult>
  ): IEnumerable<TResult>;
  zip<TSecond, TResult>(
    second: IEnumerable<TSecond>,
    resultSelector: Func2<TSource, TSecond, TResult>
  ): IEnumerable<TResult>;
  concat(second: IEnumerable<TSource>): IEnumerable<TSource>;
  distinct(): IEnumerable<TSource>;
  union(second: IEnumerable<TSource>): IEnumerable<TSource>;
  intersect(second: IEnumerable<TSource>): IEnumerable<TSource>;
  except(second: IEnumerable<TSource>): IEnumerable<TSource>;
  all(pred: Predicate<TSource>): boolean;
  any(pred: Predicate<TSource>): boolean;
  singleOrDefault(pred?: Predicate<TSource>): TSource | undefined;
  single(pred?: Predicate<TSource>): TSource;
  count(pred: Predicate<TSource>): number;
  contains(value: TSource): boolean;
  elementAtOrDefault(index: number): TSource | undefined;
  elementAt(index: number): TSource;
  firstAtOrDefault(index: number): TSource | undefined;
  firstAt(index: number): TSource;
  first(pred?: Predicate<TSource>): TSource;
  firstOrDefault(pred?: Predicate<TSource>): TSource | undefined;
  lastAtOrDefault(index: number): TSource | undefined;
  lastAt(index: number): TSource;
  last(pred?: Predicate<TSource>): TSource;
  lastOrDefault(pred?: Predicate<TSource>): TSource | undefined;
  defaultIfEmpty(val: TSource): IEnumerable<TSource>;
  sequenceEqual(second: IEnumerable<TSource>): boolean;
  min<TKey>(keySelector?: Func1<TSource, TKey>): TSource;
  max<TKey>(keySelector?: Func1<TSource, TKey>): TSource;
  sum<TKey>(keySelector?: Func1<TSource, TKey>): TSource;
  average<TKey>(keySelector?: Func1<TSource, TKey>): TSource;
  aggregate(func: Func2<TSource, TSource, TSource>): TSource;
  toArray(): TSource[];
  toSet(): Set<TSource>;
  toMap<TKey, TValue>(
    keySelector: Func1<TSource, TKey>,
    valSelector: Func1<TSource, TValue>
  ): Map<TKey, TValue>;
  forEach(iterFn: (source: TSource) => void): void;
}

interface LazyLinq {
  asEnumerable<T>(list: T[]): IEnumerable<T>;
}

declare const LazyLinq: LazyLinq;

declare module "lazy-linq" {
  export = LazyLinq;
}
