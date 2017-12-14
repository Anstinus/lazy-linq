# lazy-linq
A full port of LINQ for javascript. It works fully in 'lazy' mode for the best performance.

## Introduction
This library is written in ES6 and transpiled using Babel. It implements all API from .Net static class `System.Linq.Enumerable`. 

By levering the power of `generator` in ES6, this library works in a lazy(or deferred) way as in .NET -- Instead of doing computing on the whole sequence at once, it would only do necessary computing while you iterating through the sequence.

## Installation and usage
The code is written is ES6 and transpiled into different format so you can easily integrate it into your project.

* `src/linq.js`: Source code written in ES6. You could choose to use this file directly.
* `linq.js`: Transpiled with Babel runtime mode. Use in server side or in browser with proper module loader.
* `linq-browser.js`: Transpiled with Babel. Use in browser with `browser-polyfill.js`.


**Details are explained below:**


### Use in Node.js

* Install with `npm`
```bash
npm install lazy-linq 
```

* `require` and use it
```js
var linq = require('lazy-linq');

var data = linq.asEnumerable([1, 2, 3]);
data.select(function(x) { return x * 2}).forEach(function(x) { console.log(x); });
// output will be:
// 2
// 4
// 6
```

### Use in browsers without any loader

* Install with `bower`
```bash
bower install lazy-linq
```
This would also auto install the dependency [babel-polyfill](https://github.com/nicksrandall/babel-polyfill).

* Include `browser-polyfill.js` and 'linq-browser.js' to your `index.html`. 
```html
<script src="../bower_components/babel-polyfill/browser-polyfill.js"></script>
<script src="../bower_components/lazy-linq/linq-browser.js"></script>
```

* Use it in your js files
```js
var data = linq.asEnumerable([1, 2, 3]);
data.select(function(x) { return x * 2}).forEach(function(x) { console.log(x); });
// output will be:
// 2
// 4
// 6
```

### Use in browsers when you're already using ES6

You should use the linq code written in ES6 rather than the transpiled one and feed it to your ES6 transpiling engine along with all your other js files.

* suggest to copy the source file to 'local' location first. This could avoid many problems...
```js
gulp.src('node_modules/lazy-linq/src/linq.js')
  .pipe(gulp.dest('src/app/components/linq/'));
```

* `import` it in your `index.js`
```js
// assuming index.js is in 'src/app/' folder
import * as linq from 'components/linq/linq';

// then you could attach 'linq' to global namespace for convenience:
this.linq = linq; 
  
// or any other way suiting your code. E.g. in `angular`:
angular.module('myModule').constant('linq', linq); // make 'linq' be injectable in controller/service/etc.
```

#### Using `webpack` and [babel-loader](https://github.com/babel/babel-loader) (with `runtime` option)

* Simply `import` the transpiled linq.js in you `index.js`
```js
// assuming index.js is in 'src/app/' folder
import * as linq from '../../node_components/lazy-linq/linq';
```
That's it. `webpack` should be able to check dependencies and pack linq.js and babel runtime together into your packed index.js.


## Tutorial

### Basic usages 
```js
// create a lazy range of 1 ~ 100000
var seq = linq.range(1, 100000); 

// create a enumerable object which WILL but NOT YET find all even numbers in seq
var even = seq.where(function(x) { return x % 2 === 0; }); 

// find the first 100 even number. 
var count = 0;
even.forEach(function(x) {
  console.log(x);
  if (++count >= 100) return;
});

// use "even" again will cause it to be evaluated from start.
// also find the first 100 even numbers and put them to an actual array.
var top100_even = even.take(100).toArray();
```
### Helper functions
```js
// generate a lazy sequence of [0, ... , 9]
var seq = linq.range(0, 10);

// generate a lazy sequence of [1, 1, 1, 1, 1]
var seq = linq.repeat(1, 5);

// generate a lazy empty sequence
var seq = linq.empty();

```

### Use suffix form of `asEnumerable()`
```js
// this will install asEnumerable() for `Array` and `String`
linq.installAsEnumerable(); 
// then you can do this
[1, 2, 3].asEnumerable().where(....)


// if you have a custom class with iterator
class MyCollection {
  [Symbol.iterator]: function* () { ... }
}
// you could also install asEnumerable() for it
linq.installAsEnumerable(MyCollection);
```

## Documentation

Coming soon...
