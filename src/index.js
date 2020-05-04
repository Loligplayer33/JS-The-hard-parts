/*eslint no-unused-vars: "off"*/
/********************************************************* */

// normal function calls

console.log(".........normal function calls!!!");

// 1. declaring a constant called 'num'
const num = 3;

// 2. defining a function called 'multiplyByTwo'
// 4. assigning the argument of the value '3' into the parameter placeholder 'inputNumber'
function multiplyByTwo(inputNumber) {
  /* 
5. stepping into the new local execution context and declaring a new constant
5.1 assigning the result of multiplying the inputNumber (3) to the local constant 'result'*/
  const result = inputNumber * 2;

  /** 6. search the label 'result in the local memory, and if it gets found
     return it out of the function and assign its value to 'multiplyByTwo' */
  return result;
}

// 3.declaring a constant called 'Output'
/*3.1 calling multiply by Two with an argument 'num'
     representing the value 3 
  3.2 creating a new execution context for the fn 'multiplyByTwo'
      (this new local execution context has a local memory and a local
      thread of execution)*/
// 7. assign the returned value (6) to the constant 'output'
const output = multiplyByTwo(num);

// 8. log the value that got assigned to the constant 'output' (6) to the console
console.log(output);

/********************************************************* */

// call Stack
console.log(".........the call stack!!!");

/**
 * the call stack manages the sequence in which the code should get executed.
 * on 'the bottom' of the call stack sits the global execution context and runs
   there code there as long as it doesn't hit anything like a function call which
   is put on top of the call stack.
   => as soon as the call stack isn't empty anymore, the 'thread of execution'
      goes into that newly created execution context. (always the one on top first)
 * It follows a 'last in, first out' approach. So the latest call is always the one
   that gets exeecuted first. As soon as this execution context returns, it gets
   popped of the call stack and the thread of execution goes to the next highest
   execution context
 */

function function1() {
  function2();
  //  gets logged last
  console.log("function 1");
}

function function2() {
  function3();
  // gets logged second
  console.log("function 2");
}

function function3() {
  // gets logged first
  console.log("function 3");
}

function1();

/********************************************************* */

console.log(".........generalized functions!!!");

/**
 * There is a core Principal in programming called DRY (Don't repeat yourself)
 * generalized function are the main way to achieve this:
 */

// compare the following two function:

function tenByTen() {
  return 10 * 10;
}

console.log(tenByTen());
// This function can only do one operation. There is no need for a function here.
const tenByTen2 = 10 * 10; // would also do the job

function numTimesNum(num, multiplier) {
  return num * multiplier;
}

console.log(numTimesNum(10, 5));

// This function on the other hand can multiply every number due to the parameters
// It is REUSABLE because it is GENERALIZED!

/********************************************************* */
console.log(".........higher order functions!!!");
/**
 * higher oder function are similar to generalized function
 * but they don't just reuse a number but get a lot more general because
  you pass other, smaller function inside of them.
 */

//1. declare a constant arr and assign it the value [1,2,3], store it in global memory
const arr = [1, 2, 3];

// 2. define a function 'manipulateArray' and store it in global memory
// 5. create new local execution context and put 'manipulateArray' on call stack
function manipulateArray(array, operation) {
  // 5. declare a constant 'output' in local memory and assign it '[]'
  const output = [];
  // 6. loop over the given array, as many times as the array is long
  for (let i = 0; i < array.length; i++) {
    /*6.1 for every element call the operation argument which represents a function
    and push the result of this function call to the 'output' array */
    //6.3 push the returned result into the constant 'output'
    output.push(operation(array[i]));
  }
  return output;
}

// 3.define a function 'multiplyNumber' and store it in global memory
function multiplyByFive(number) {
  /*6.2 multiply the number arg with the multiplier arg and return the
        result into 'operation'*/
  return number * 5;
}

// 4.declare a constant result and assign it the returned value of 'manipulateArray'
// 4.1 assign the arguments arr and multiplyByTwo to the parameters
/* 7. assign the returned value from calling 'manipulateArray' and assign it 
      to the constant 'newArray'*/
const multipliedByFive = manipulateArray(arr, multiplyByFive);
// 8. log the value of newArray to the console
console.log(multipliedByFive);

// Note that you can now add another fn as callback to do a different operation:
const addedThree = manipulateArray(arr, addThree);

function addThree(number) {
  return number + 3;
}

console.log(addedThree);

/********************************************************* */
console.log(".........closures!!!!");
// to make a closure, you have to return a function from a function like so:

// 1. declare a function called 'create function' and store its code on global memory
// 3. create new local execution context for 'createFunction'
function createFunction() {
  //4. declare a new function 'multiplyByTwo' (don't execute it)
  function multiplyBy2(num) {
    return num * 2;
  }
  //5. return the code of 'multiplyByTwo' and assign it to 'createFunction'
  return multiplyBy2; // (no parenthisis, because we want to return the function itself, not the result of running it)
}

// 2. declare a costant do which the returned value of calling create func gets assigned to
/* 6. assign the returned value of executing 'createFunction' to the constant 'generatedFunc'
      (generatedFunc === multiplyByTwo)*/
const generatedFunc = createFunction(); //(generatedFunc has NOTHING to do with createFunction AT ALL!)

//7. run generatedFunc (multiplyByTwo) with the argument 3 and assign the returned value to the constant 'result'
const result = generatedFunc(3);
// 8. log the value of the constant 'result' to the console
console.log(result);

/*********** */

/**
 *
 *
 *
 *
 *
 *
 */

// calling a function inside of another function: (nested function scope)

// 1. declaring outer in global memory
function outer() {
  // 3. define a LOCAL variable inside the lovcal memory of 'outer' and assigning it the value 0
  let counter = 0;

  //4. declaring a function called 'incrementCounter' and storing it in the ! LOCAL ! memory of !'outer'!
  function incrementCounter() {
    /** 5.The function tries to increment 'counter'.
     * 5.1 it looks in the local memory of 'incrementCounter, but doesn't find anything there.
     * That's why it stepps out one layer and looks in the local memory of 'outer'.
     * It finds counter and increments it. OR DOES IT??? !!! NO, IT DOESN'T !!!
     * look at the next function example to find out more!
     */
    counter++;
  }

  // 5. execute incrementCounter (create new  local execution context INSIDE 'outer')
  incrementCounter();

  return counter;
}

// 2. declaring a global constant 'counter' and assigning it the returned value of 'outer'
const counter = outer();
console.log(counter);

/**
 *
 *
 *
 *
 *
 *
 */
console.log(".......");
// Calling a function outside of the function all in which it was defined

// 1. declaring the function 'outer' in global memory
function outer2() {
  //3. declaring a varibale 'counter' in local memory of 'outer2' and assigning it the value 0
  let counter = 0;

  // 4. delaring the function 'incrementCounter' in the local memory of 'outer2' (storing all of its code under the label 'incrementCounter')
  function incrementCounter() {
    counter++; //the function DOESN'T GET INVOKED YET!!!
    console.log(`counter: ${counter}`);
  }

  /* 5. Instead of invoking the function, we return it and assign the CODE 
        stored under the label 'increment counter' to 'outer2' */
  // the call stack is empty now. The only thing that got returned out and is not in global memory, is incrementCounter
  return incrementCounter;
}

//2. declaring the const 'incrementCounterClone' and assigning it the value returned by running 'outer2'
// 6. assigning the result of outer ( ! LITERUALLY THE CODE OF 'incrementCounter' ! to the constant 'incrementCounterClone')
const incrementCounterClone = outer2();
// 7. invoking incrementCounterClone (incrementCounter), creating new execution context and trying to increment the counter
/**But where does the incrementCounterClone got his link to 'counter' from?
 * 
 * AS SOON AS 'outer2' RETURNED THE FUNCTION DEFINITION (the whole code of incrementCounter)
   THE RETURNED FUNCTION (incrementCounter) TOOK ! ALL ! THE OTHER THINGS THAT ARE IN
   THE LOCAL MEMORY WITH IT (and are used inside the returned function) (like on a small backpack). 
   THAT'S WHY IT IS POSSIBLE TO INCREMENT THE 'counter' EVEN THOUGH IT SEEMS LIKE IT WAS
   DELETED SINCE IT WASN'T RETURNED OUT OF THE FUNCTION WHEN 'outer2' POPPED OF THE CALL STACK.

  So incrementCounterClone looks in its local memory and doesn't find 'counter' there.
  BUT before it look in global memory, it looks into its 'backpack' and if it finds 'counter',
  which it does, the 'counter' gets updated to one
*/
incrementCounterClone();

/**
 * now, if we call incrementCounterClone again, the same procedure happens. But now,
 * the counter is not zero, but one because it got updated by preceding function call.
 * The counter now gets updated to two
 * => The data stored in the closure of the incrementCounter function is persistent.
 *    It doesn't reset. If the value is changed, it will stay like that, until it gets updated again.
 *    That's why it is possible to call increment the counter like so : 1 2 3 4 and not like so: 1 1 1 1
 */
incrementCounterClone();
incrementCounterClone();
incrementCounterClone();

// JavaScrip is lexically / static scoped: THE SCOPE IN WHICH THE FUNCTION GETS DEFINED IS WHAT DETERMINES
// DATA THE FUNCTION HAS ACCES. IT DOESN'T MATTER WHERE THE FUNCTION GETS CALLED !
// => this is why the returned function has to take the rest of its Local memory with it, since
// this is the only way to save it's scope / access to the variables it depends on

// THATS WHY YOU CAN A BETTER WORD FOR CLOSURE WOULD BE:

//    !!!!!!!      PERSISTANT LEXICAL SCOPED REFERENCE DATA (P.L.S.R.D)    !!!!!!!!!

/* if you run 'outer2' again and store it in a different variable, a completly new 
  execution context would get created, with a completly new closure / backpack / P.L.S.R.D */

const incrementCounterClone2 = outer2();

incrementCounterClone2();
incrementCounterClone2();
incrementCounterClone2();
incrementCounterClone2();

// if you look in the console, the values start a 1 again like so: 1 2 3 4 and don't add up
// to the other counter like so: ... 5 6 7 8.

/**
 *
 *
 *
 *
 *
 *
 */
console.log(".........Asynchronous Code!!!");

/*************************************************************/
/**Javascript is a single threaded language. But what if a line takes really
 * long to complete because it gets data from an api of has to do something else
 * that takes a lot of time?
 * 
 * THERE NEEDS TO BE A WAY THAT SOME CODE CAN RUN IN THE BACKGROUND WHILE
 * THE THREAD OF EXECUTION CONTINUES
 * 
 * => all of the 'slow' tasks like setting a timer, fetching data and so on
      don't happen in Javascript, but rather in the web browser.
      So Javascript's thread of execution can keep on running, while the 
      browser takes care of all the slow taks. 
 */

function printHello() {
  // commented this console.log() out, because it would always be run at the end, after
  //all other global code in this file would have been executed, which is distracting.
  // console.log("hello");
}

function blockFor1Sec() {
  var arr = [];

  for (let i = 0; i < 10000; i++) {
    arr.push(i);
  }
}

setTimeout(printHello, 0);
blockFor1Sec();
console.log("me first");

/**all the code that takes some time to complete and is completed with the help of
 * the browser and not just JS gets put on the call stack, only if ALL OTHER CODE
 * HAS EXECUTED AND RETURNED. INCLUDING THE GLOBAL CODE.
 * => it runs after everything else is done!!!
 * The place where it waits, to get into the call stack is called the 'callback queue'
 * and the method that checks if all other code has executed is called the 'event loop'
 */

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */

console.log(".........promises!!!");

// MOCK example

// 1. the function 'display' gets stored in global memory
function display(data) {
  // 7. the data gets logged to the console
  console.log(data);
}

// 2. declare a constant 'futureData'
/**
 * 4. fetch return the promise object (normal object with two properties:
 * {
   value: ...... (stores the returned result from the request)
   onFullfilled: []  (stores the code that shoul be run after the data
                       has come back (.then())) (hidden propterty)
  }
* 4.1 it sets up an 'xml http request' (xhr / network request)
* 4.2 sends the name like (twitter.com) and the path (/will/tweets/1) with it
  so it can get the results
* 4.3 puts the response data into the 'value' property of the promise object
*/
// 5. the response then gets stored into futureData
const futureData = fetch("https://twitter.con/will/tweets/1");
//6. the display function gets called after the value property gets filled
futureData.then(display);
// 3. 'me first gets logged to the console'
console.log("me first");

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
 */

console.log(".........Classes & Prototypes!!!");

// If you have a big file, you want to make sure that you structure your data and functionality
//together, close to each other so it is not hard to find the corresponding pieces in the codebase.
// => Objects are a great way to achieve this:

const user1 = {
  name: "Will",
  score: 3,
  increment: function() {
    user1.score++;
  }
};

console.log(user1.score);
user1.increment();
console.log(user1.score);

// the problem with this approach is, that all the functions, like 'increment' have to
// be stored manuallly which makes the code less DRY and very time consuming to type.

// => to solve this issue, we have function constructors / classes:

// This function constructor creates a new Object based on the inputed arguments and
// returns out the newly created object.
function userCreator(name, score) {
  // it gets linked to 'userFunctionStore' thorugh the 'hidden propery (__proto__)';
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;

  return newUser;
}
// here are all the functions stored that do the loginc based on the instances of
// the object returned by 'userCreator'
const userFunctionStore = {
  increment: function() {
    // 'score' is still available due to closures which took effect since the object,
    //this function gets called on has to be returned out of the function. And trough that
    //process, it takes all the needed variables from local memory and keeps them in global memory as persistent data.
    this.score++;
    // the 'this' always points to the thing that the method the 'this' sits in is called from
  },
  login: function() {
    console.log("Logged in");
  }
};

// calling the userCreator function and creating a new Instance of the class based on the parameters.
const user10 = userCreator("Will", 3);
const user11 = userCreator("Tim", 3);

// Since 'userCreator' is linked to 'userFunctionStore' through its __proto__ property,
// it now has access to its functions.
user10.increment();

// => this is the STANDARD way of creating a function constructor

// But there are much shorter forms, but this is what is happening under the hood.

/****************************************************** */
// THE 'new' KEYWORD

/* 1. the new keyword creates the object needed automatically 
*  2. it returns the object autoatically
*  3. it will make the link through the __proto__ object automatically

  => but how can we add new properties to the automatically created object, if we
     don't have a name to do something like newUser.name = 'Todd' ? 
      => we give it the name 'this' (this.name = 'Todd')

  => and how does the 'new' keyword know, which Object it should link to in the
     __proto__ property?
     (
      every function brings a second part with it. An Object, attached to every function;
     )
*/
function iAmAlsoAnObject() {
  return "hi";
}

iAmAlsoAnObject.prototype.score = 0;

console.log(iAmAlsoAnObject.prototype);

// => this is where the new keyword makes the __proto__ property reference to.
// that's why this works:

// 1. we declare a function (constructor)and store it in global memory (the function has an object with the 'prototype' property on it)
function UserCreatorConstructor(name, score) {
  this.name = name;
  this.score = score;
}

// 2. we add a method to the userCreatorConstructor's prototype object
UserCreatorConstructor.prototype.increment = function() {
  this.score++;
};

// 3. we add another method to the userCreatorConstructor's prototype object
UserCreatorConstructor.prototype.login = function() {
  console.log("login");
};

// we declare a constant 'user12' and assign it the returned value of the code on the right side:
/**
 * 1. the 'new' keyword automatically creates a new empty object whichs __proto__ property
 *    points to the Object part of the 'userCreatorConstructor' function and there
 *    to the 'prototype' property
 * 2. It automatically returns the now filled object through 'this.name' and 'this.score' (l. 498f.)
 *    => the returned object has all the data it references to from its local memory in its closure (backpack)
 * 3. The returned object gets assigned to the global constant 'user12'
 */
const user12 = new UserCreatorConstructor("Eva", 10);
// now we can call the 'increment' method on 'user12' since it is linked to it via the __proto__ property
user12.increment();
// that's why the score is now incremented by one an
console.log(user12);



/************************************************** */
// The 'class' syntactic sugar:
console.log('class way:');


class UserCreatorClass {
  // this is where we define the isntance - individual data, the methods can then work with
  // or they can just be safed and stored (same as the whole 'UserCreatorConstructor' function (l.487ff.))
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  // the methods are still stored in the protoype property of the function object through the __proto__ property (implicitly)
  increment() { //no 'function' keyword needed to decalre methods in classes
    this.score++
  }

  login() {
    console.log('login');
  }
}

const user113 = new UserCreatorClass('David', 15 )

user113.increment();
console.log(user113);

// this is just another approach, but it works the exact same way
