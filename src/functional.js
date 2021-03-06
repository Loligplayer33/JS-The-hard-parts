/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/
// commented out code should be seen as valid (commented out to get rid of errors)

console.log(".....................................");
console.log("FUNCTIONAL PROGRAMMING");

// what is actually a function ?
/* => the definition of a function will evolve during this file, so don't take the
      first one that gets presented to you as granted. All definitions will be correct
      but only the last one will be complete*/

function addNumbers(x = 0, y = 0, z = 0, w = 0) {
  var total = x + y + z + w;
  // logging makes a function impure
  console.log(total);
}

function extraNumbers(x = 2, ...args) {
  return addNumbers(x, 40, ...args);
}

extraNumbers(); //42
extraNumbers(3, 8, 11); //62

/* a function not only has to take some input and do something with it, it also
   has to return something out of the function and they can only call other functions
   => if they call a procedure, they are a procedure too automatically
   => 'addNumbers' doesn't accomplish all of these criteria, therefore it is not a function.
      'extraNumbers' is calling a procedure and through that violates one of the 
      principles that it needs to qulify as a function
      => They are both procedures
   */

function tuple(x, y) {
  return [x + 1, y - 1];
}

var [a, b] = tuple(...[5, 10]);

console.log(`a: ${a}  b: ${b}`);

/**This 'function' takes two inputs and manipulates both of them and then returns them.
 * It actually has two outputs:
 *  1. The array with the manipulated values x and y (not used)
 *  2. The two specific values of the array, gathered in 'var[a, b]'
 * => 'tuple' wouldn't be defined as a real function, since there is no semantic
 *    relationship between the input (x,y) and the computed output ((x- 1), (y + 1))
 */

function shippingRate1(size, weight, speed) {
  return (size + 1) * weight + speed;
}

shippingRate1(20, 5, 50);

/**This function's output is in direct semantic relation to it's input values
 * If you look at the function name and the parameters, it gets clear for what the
 * parameters are needed, how they are going to affect the outcome and what the outcome
 * will represent => The relationship between the input and the output gets clear!
 */

/**
 *
 *
 *
 *
 *
 */

console.log("...side Effects!!!");

// no parameters correlating with the used vars => polluting / accessing outer namespace
// => side Effect
function shippingRate2() {
  rate = (size + 1) * weight + speed;
}

var rate;
var size = 12;
var weight = 4;
var speed = 5;
shippingRate2();
console.log(`first rate: ${rate}`);

size = 8;
speed = 6;
shippingRate2();
console.log(`second rate: ${rate}`);

/* This 'function' is really to what it is doing compared to 'shippingRate1'.
  But this time, it is not a real function but rather also a procedure.
  => To understand why, we have to add another piece to our definition of what a function
    actually is: A function not only has to take some input, do something with it,
    return some output and has to have a semantic relationship between the input and
    the computed output, it also has to be direct (not polluting or accessing
    any values outside of the function itself).
      => No indirect inputs nor outputs are allowed in a real function
      => This function affects some varibles outside of the function. 
         It creates so called 'side-effects'
  */

// The right way to declare the upper procedure as a real function is like this:
function shippingRate3(size, weight, speed) {
  return (size + 1) * weight + speed;
}

var rate3 = shippingRate3(12, 4, 5); //57
rate3 = shippingRate3(8, 4, 6); // 42

/*!!! 
   In JavaScript, there is no such thing as a 'function', there is such a thing
   as a 'function call'. The actual definition of a function isn't the most important
   part. The most Important part is that the function gets called, gives direct input
   and gets direct output at that specific call (cf. l.104, 105)

   => The call is what determines if there are side-effects or not. That's why the 
      function call plays a big role in determening if we have a procedure or a function.
      (not all side-effects can be avoided by only paying attention to the function calls)
!!!*/

/**
 * Using varibles indirectly is just one possible side-effect.
 * Others are:
 * I / O - operations (console.files etc)
 * Database Storage
 * Network Calls
 * DOM
 * Timestamps
 * Random Numbers
 * (CPU Heat, CPU Time Delay)
  => we notice that it is literually impossible to avoid all kind of side-effects
    Thats why it is not our goal to abandon them, but rather to be aware of them
    and try to minimize the amount. (We should do that, because side-effects take
    away the benefits of functional programming as a whole)

    => Make side-effect obvious and try to use them as little as possible

    Seperate your side effect code from the core, functional code.
 */

/**A pure function is a function that takes all of its inputs direct, it 
   outputs direct and has no side effects.
   => In JS, what really matters are the function calls and their purity.
 */

// pure function:
function addTwo(x, y) {
  return x + y;
}

// impure function:
function addSomethinElse(x, y) {
  return x + y + z;
}
var z = 0;
// There is more than that too it. but this is the most obvious case.

// Can this function be considered 'pure' ?
function getId(obj) {
  return obj.id;
}

// no, because pure function calls have to act in isolation.
// => that means: given the same input, the function always has to produce the same output.
getId({
  get id() {
    return Math.random();
  }
});

/**
 *
 *
 *
 *
 *
 */
console.log("...extracting impurity!!!");

// This is an impure function because it changes the DOM:
function addComment(userID, comment) {
  var record = {
    id: "randomID",
    userID,
    text: comment
  };

  // var elements = buildCommentElement(record);
  // commentsList.appendChild(elements)
}

addComment(42, "This is comment No. 1");

// the above function can be changed as following:
function newComment(userID, commentID, comment) {
  var record = {
    id: commentID,
    userID,
    text: comment
  };
  // return buildCommentElement(record)
}
// => 'newComment' is now a completly pure function.

// And all the impure stuff that has to happen is now seperated if an error occurs,
// it will most likely be easier to spot, because it is most of the time in the impure
// code snippets

// var commentID = uniqueID();

var elem = newComment(
  42,
  // commentID,
  "This is comment Nr. 2"
);

/**
 *
 *
 *
 *
 */
console.log("...containing impurity!!!");

/**
 *
 *
 *
 *
 *
 */

console.log("...Adapters!!!");

// HIGHER ORDER FUNCTIONS

// higher order function are functions that get other functions passed in as arguments
function unary(fn) {
  return function one(arg) {
    console.log(arg);
    return fn(arg);
  };
}

function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

function f(...args) {
  return args;
}

// is is the returned value of running 'unary'
// (=> the function definition of 'one' and the closure including the 'fn' parameter)
var g = unary(f);
// same as above just with the binary function.
var h = binary(f);

// if 'g' now gets called, it passes its first argument into 'one' and returns the parameter
console.log(g(1, 2, 3, 4));
// same thing here, but this time the function 'two' takes two paramters and is
//therefore capable of returning the first to elements [1, 2]
console.log(h(1, 2, 3, 4));

// FLIP

// sometimes it is necessary to flip the order of some arguents:

function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  };
}

function collector(...args) {
  return args;
}

var fl = flip(f);

console.log(fl(1, 2, 3, 4));

/**
 *
 *
 *
 *
 *
 */
console.log("...point free functions!!!");

// here we define 'isEven' based on 'isOdd' which has an extremly similar shape.
function isOdd(v) {
  return v % 2 === 1;
}
// instead of writing v % 2 === 0 we just negate isOdd which accomplishes the same result
function isEven(v) {
  // Now the real question comes in: is it possible to define 'isEven' point free?
  /* => we actually don't really care about 'isEven', but rather about what it holds.
        So how can we get rid of isEven without losing the functionality of it?
  */
  return !isOdd(v);
}

console.log(isEven(4));

// this way of defining funcitons with a similar shape only once can easily be
// combined with an higher order function:

function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

function isOdd2(v) {
  return v % 2 === 1;
}

var isEven2 = not(isOdd);
// it is really easy to reason about what the above code does. It may be harder to understand
// how it does what it does, since it is more implicit and we focus more on the what and less on the how.
console.log(isEven2(4));

console.log("...normal way!!!");

// making the following code Point free:
function output11(txt) {
  console.log(txt);
}

function printIf11(shouldPrintIt) {
  return function(msg) {
    if (shouldPrintIt(msg)) {
      output11(msg);
    }
  };
}

function isShortEnough1(str) {
  return str.length <= 5;
}

function isLongEnough1(str) {
  return !isShortEnough1(str);
}

var msg11 = "Hello";
var msg21 = msg11 + " World";

printIf11(isShortEnough1)(msg11); // Hello
printIf11(isShortEnough1)(msg21);
printIf11(isLongEnough1)(msg11);
printIf11(isLongEnough1)(msg21); // Hello World

console.log("...point free way!!!");

// Point free way:
// 1. declare a function in global memory
function when1(fn) {
  return function(predicate) {
    return function(...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}

// 2. declare another function in global memory
function not1(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

// 3. declare a variable in global memory and assign its this back to the console.
var output = console.log.bind(console);

// 4. declare a variable in global memory and assign it the returned value of calling 'when' with the output (log statement) as the argument.
// 4.1 it stores a function definition, together with the console statement coming from 'output' (in the closure) under this label. (it is still a function and can be invoked)
var printIf = when1(output);

// 5. we store the variable 'isLongEnough' in global memory and assign it the returned value of calling the negation function 'not' together with the 'isShortenogh' as the argument.
// 5.1 'isLongEnough' now gets assigned the negation of calling 'isShortEnough' (everytime the function returns false) the 'not' function turns it into true and the other way around.
var isLongEnough = not(isShortEnough);

function isShortEnough(str) {
  return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

// 6. now if we call printIf  with 'isShortEnough' as an argument, what we actually do is calling the returned function with the closure containing the var 'output' in its closure. Then we pass isShort in as the argument. The function returns again (another function).
// 7. this inner function now gets called right away with the second pair of parenthisis (in this case containing the string 'Hello').
// 7.1 the most inner function now checks if the predicate (isShortEnough) returns true. If it does, it steps into the if statement and returns a function stored under the label 'fn' (in this case 'output')
// The results get logged to the console.
printIf(isShortEnough)(msg1); // Hello
// if the message is to long, and the if statement doesn't return 'true', the function won't print anything to the console
printIf(isShortEnough)(msg2);
// same here, just that 'isShortEnough' gets negated. Now if the string is not longer than 5 letters, nothing will be printed to the console. ('Hello'.length < 5 => no console.log)
printIf(isLongEnough)(msg1);
// ('Hello World'.length > 5 => log to the console).
printIf(isLongEnough)(msg2); // Hello World

// the order of listing arguments:
// => the shape of a function matters a lot to functional programmers:

// this function takes in 2 parameters and is not very specifif
function mod(y) {
  return function forX(x) {
    // in mod2 y === 2
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

// mod2 'fixes' on of the two parameters of 'mod' and is therefore much more specific. (it sets the y parameter to the argument 2)
var mod2 = mod(2);
var eq1 = eq(1);

function isOdd3(x) {
  // the output of the mod2 call is passed dircetly as an input of the eq1 call.
  // => passing the output of a function directly as an imput of another function is called 'composition'

  // 1. the x is passed as the x into the mod2 function and gets modular checked against 2. if x is odd, the function will return 1 else 0
  // 2. the output gets passed dircetly into eq1 as an argument. It then checks if the argument is equal to what is passed into the eq function
  // (in this case 1) This is the case and eq1 threfore returns 'true'. => isOdd3 returns true and the number passed in is definitely Odd.
  return eq1(mod2(x));
}

console.log(isOdd3(5)); //true
console.log(isOdd3(6)); //false

/**
 *
 *
 *
 *
 *
 *
 */

console.log("...closures!!!");

/**Closure is when a function 'remembers' the variables around it even when that function is executed elsewhere */

function makeCounter() {
  var counter = 0;
  return function increment() {
    return ++counter;
  };
}

var closure = makeCounter();

console.log(closure()); //1
console.log(closure()); //2
console.log(closure()); //3

// is this example of closure an example of a pure function?
// => No, definitely not, because a pure function has to return the same output if it receives the same input. This is not the case here.

// closures and functional programming:

function unary5(fn) {
  return function one(arg) {
    return fn(arg);
  };
}
function addAnother(z) {
  return function addTwo(x, y) {
    return x + y + z;
  };
}

// these two functions don't change the referenced varibles through closure. They just keep it in their closure so they can reuse it, if they
// get called later in the programm, in a completly different scope, after the local memory in which these variables originally have lived in
// is already deleted

// They *use* / *reference* variables outside of their scope withou chaning them. If this statement is true, the use of closure is pure.

/**
 *
 *
 *
 *
 */

console.log("...Eager vs lazy & memoization!!!");

// Lazy vs Eager loading:

// Lazy Loading

// On which line of this programm does the actual construction of the string occur? Line 508 or 511?

function repeaterLazy(count) {
  return function allTheAs() {
    return "".padStart(count, "A");
  };
}

var A10 = repeaterLazy(10);
// right here the returned value of the outer function gets assigned together with its parameter to the variable A10.

console.log(A10()); //"AAAAAAAAAA"
// here is, where the inner function gets called and the actual string gets constructed
console.log(A10()); //"AAAAAAAAAA"
// and the work is done again here and would get done everytime, A10 gets called.

// The work is not done as soon as the outer function gets called, this approach is called 'lazy'; the work gets deferred to a later point in the programm
// the benefits are that if the inner function never gets called, the work never has to be done. The problem is, that the work has
// to be done from the beginning everytime the function gets called.

// eager loading:

// this time the work gets done even if the inner function never gets called. The benefit is, that if the function gets called multiple
// times, the computation doesn't has to happen all over again but the results can just be referenced from the closure

function repeaterEager(count) {
  var str = "".padStart(count, "A");

  return function allTheAs() {
    return str;
  };
}

// here does the work occur and the result get stored in the closure
var A15 = repeaterEager(15);

// we just have to refernce it here, no computation has to be done here
console.log(A15()); //AAAAAAAAAAAAAAA
console.log(A15()); //AAAAAAAAAAAAAAA

// We have to determine which use case would be more suitable for the problem in hand eagerly(now) or lazy(later)

// we have to make compromises, we either do the work once for sure or do it only if needed, but as often as needed...

// this is how it is done:

// this function only does the computation if it is run the first time (checkeck by if(str === undfined)) : return str but is it pure?
// => It changes the variable str from undefined to 'AAAAAAA...' once. So this is not really pure, but what is much more important:
// Does the output change if you call the function multiple times with the same input? NO! Therefore the function is pure but is hard to tell.
function repeaterMemoization(count) {
  var str;
  return function allTheAs() {
    if (str === undefined) {
      str = "".padStart(count, "A");
    }
    return str;
  };
}

var A20 = repeaterMemoization(20);

console.log(A20()); //AAAAAAAAAAAAAAAAAAAA
console.log(A20()); //AAAAAAAAAAAAAAAAAAAA

// How to solve the problem of readability? => use the memoization function provided by a fn programming library:

function repeaterMemoizeLib(count) {
  // memoize coming from a 3rd party library
  return memoize(function allTheAs() {
    return "".padStart(count, "A");
  });
}

// var A25 = repeaterMemoizeLib(25)

// A25();  //AAAAAAAAAAAAAAAAAAAAAAAAA
// A25();  //AAAAAAAAAAAAAAAAAAAAAAAAA

/**
 *
 *
 *
 *
 *
 *
 *
 */

// pure function calls: complete definition:

console.log("Pure function call definition!!!");
console.log(
  "A function call is pure if one could take the returned value of the function call and replace the function call with the returned value."
);

/**f.e: if I call A25() and it returns a string with 25 A's, I have to be able to just put the 25 A's in manually and the programm
 * still has to run just as before. If that is the case, the function call is 100% pure.
 *
 * => A function call is pure if it has referntial transperency
 */

/**
 *
 *
 *
 *
 *
 *
 */

console.log("...generalized to specialized functions!!!");

//  currying

function ajax(url) {
  return function getData(data) {
    return function getCb(cb) {
      //  something in here
    };
  };
}

//  strict currying (providing only one input at a time even though two are already available)
ajax(1234)({ id: 43 })(() => console.log("hello"));
//  lose currying (providing all inputs that are currently available at the time and then later the other ones)
ajax(1234, { id: 43 })(() => console.log("hello"));

// by calling the functions this way, we can save all the different functions and pass the inputs one by one. We now have a set
// of function that range from very generalized to quite specialized; And the more specialized functions still have access to
// the arguments of the general function due to closure.
var getCustomer = ajax(1234);
var getCurrentCustomer = getCustomer({ id: 42 });
var greetCustomer = getCurrentCustomer(() => console.log("hello"));

/**
 *
 *
 *
 *
 *
 */

console.log("...composition!!!");
function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}

var basePrice = 10;

function shippingRate4(x) {
  // here we pass the output of one function as the input of another one => composition:
  return minus2(triple(increment(x)));
}

// instead of doing all the function calls here, we abstracted out the real computation into a seperate function 'shippingRate4'
var totalCost = basePrice + shippingRate4(5);

console.log(totalCost);

// this works very well if we have only one shipping rate. But what if we have an ovesea one, an international one etc. ?
// we need a function that outputs a function based on some inputted functions;

function compose3(fn3, fn2, fn1) {
  return function composed(v) {
    return fn3(fn2(fn1(v)));
  };
}

var internationalShipping = compose3(minus2, triple, increment);
var intercontinentalShipping = compose3(increment, minus2, triple);

console.log(internationalShipping(4)); //13
console.log(intercontinentalShipping(6)); //17

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

console.log("...immutability!!!");

// Assignment immutability
/* => Assignement immutability is the idea that if you assign something to a variable (or property) that it is not longer 
   allowed to be reassigned to some other value
*/

// value immmutability

function processOrder(order) {
  if (!("status" in order)) {
    // order gets changed => impure due to mutation (side-effect)
    order.status = "complete";
  }
  saveToDatabase(order);
}

// the best thing for you to do when getting a mutable data structure to work with is: to assume that you are NOT allowed to mutate it
// in any way. This is superior because you never know in which other part of the programm the same object is used => leads to bugs.
// => no error !== no bug or problem later in the programm.

// to solve this problem of having to mutate something is to make a copy: In the copy you can mutate the object as much as you want since
// this doesn't create any kind of side-effects in the rest of the programm.

function processOrder2(order) {
  var processOrder = { ...order };
  if (!("status" in order)) {
    processOrder.status = "complete";
  }
  savetoDatabase(processOrder);
}

// but what if a data structure has to be mutated ? copies can take up a lot of memory and cpu power, especially if we have to make a
// lot of them very frequently. The solution is very counterintuitive: immutable data-structures with the new change inside of them.
// => these immutable data-structures don't copy the whole original one every time a new copy is made. They rather point at what has changed
// and reference the rest of the data - structure.

console.log("...recursion!!!");

// this is a completly valid solution, but it is very imperative and it is hard to understand what is happening here without reading the code

function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char);
}

function countVowels(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("The quick brown fox jumps over the lazy dog")); //11

// recursive way:

function countVowelsRecursive(str) {
  // base condition
  if (str.length === 0) return 0;
  // if the character === vowel than it return one else 0
  var first = isVowel(str[0]) ? 1 : 0;
  // 0 or 1 gets added to total number and the character gets removed (always the first one)
  return first + countVowelsRecursive(str.slice(1));
}

console.log(
  countVowelsRecursive("The quick brown fox jumps over the lazy dog")
); //11

/**
 *
 *
 *
 *
 */

console.log("...list operations!!!");

//mapping:

// map is a transformation operation => we take an element and do a transformation on it.
// => a map always resolves with transformed values but with the same data structure

function uniqId() {
  return Math.round(Math.random() * 100);
}

function makeRecord(name) {
  return { id: uniqId(), name };
}

function map(mapper, arr) {
  var newList = [];
  for (let elem of arr) {
    newList.push(mapper(elem));
  }
  return newList;
}

console.log(map(makeRecord, ["kyle", "susan"]));

// the standart api has the map method included by default:

function makeRecord2(name) {
  return { id: uniqId(), name };
}

console.log(["David", "Lucy"].map(makeRecord));

// a mapper function should never do much than one thing on the same input types
// map does trandformation

// filter

// filtering is a bit counterintuitive in programming: instead of filtering something out, filter approaches the problem from a different
// angle. You don't specify what you want to throw away, but rather you specify what you want to keep.

// => having an arr [1,2,3,4,5] and after the filter we got back [1,3,5] we haven't filtered out the even numbers but rather filtered in the odd ones

// filter does inclusion (filterIn (defualt)) or exclusion (filterOut)

function filterOutEven(arr) {
  var newArr = [];
  arr.filter(function filter(cur) {
    if (cur % 2 === 1) {
      newArr.push(cur);
    }
    return "";
  });
  return newArr;
}

var testArr = [1, 2, 3, 4, 5, 6, 7];
var onlyOdd = filterOutEven(testArr);
console.log(onlyOdd, testArr);

// the original arr doesn't get mutated

// Reduce (combining)

// Reduce combines values. It takes multiple values and combines them in some way

function addToRecord(record, [key, value]) {
  return { ...record, [key]: value };
}

var result122 = [["name", "kyle"], ["age", 39], ["isTeacher", true]].reduce(
  addToRecord,
  {}
);

console.log(result122);

// every function that takes two inputs and returns one one output can be thought of as an reducer.

console.log();

/**
 *
 *
 *
 *
 *
 *
 */

function add1(v) {
  return v + 1;
}
function mul2(v) {
  return v * 2;
}
function div3(v) {
  return v / 3;
}

var list = [2, 3, 43, 45, 6, 4, 3, 23, 34, 4];

// we chain three maps together to produce a specific output. But this is very imperative and we have to read whole code to understand
// what is happening here.

var modified = list
  .map(add1)
  .map(mul2)
  .map(div3);

console.log(modified);

// since add1, mul2 and div3 have the same shape, we can compose them:
function compose() {
  return function placeholder() {
    "this is a placeholder function for a method called compose";
  };
}

// now we can do the same thing as above in a much more declarative way:

list.map(
  compose(
    div3,
    mul2,
    add1
  )
);

// TRANSDUCING

console.log("...Transducing");

// what if we have a chain of maps, filters and reducers? How could we put those together?
// => Transducing

function sum() {}

list
  .map(add1)
  .filter(isOdd)
  .reduce(sum);

// it is not possible to compose these methods together. To still do it, we have to make .filter and .map into a reducer as well:

list.reduce(function doItAll(total, v) {
  v = add1(v);
  if (isOdd(v)) {
    total = sum(total, v);
  }
  return total;
}, 0);

// this approach works, but it is very imperative which is something we don't want to have.

function mapReducer() {}
function filterReducer() {}
function transduce() {}
function into() {}

var transducer = compose(
  mapReducer(add1),
  filterReducer(isOdd)
);

// this is the function that actually reduces the transducer to a value: It needs the transucer, the reducer function that does the reducing,
// the starting value and the data structure it should do the operation on
transduce(transducer, sum, 0, list);

// into selects the correct reducer for you automatically
into(transducer, 0, list);

// this is to complicated at the moment => come back to it !!
