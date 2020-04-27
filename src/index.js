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
    console.log(counter);
  }

  /* 5. Instead of invoking the function, we return it and assign the CODE 
        stored under the label 'increment counter' to 'outer2' */
  // the call stack is empty now. the only thing that got saved is incrementCounter
  return incrementCounter;
}

//2. declaring the const 'incrementCounterClone' and assigning it the value returned by runing 'outer2'
// 6. assigning the result of outer ( ! LITERUALLY THE CODE OF 'incrementCounter' ! to the constand 'incrementCounterClone')
const incrementCounterClone = outer2();
// 7. invoking incrementCounterClone (incrementCounter), creating new execution context and trying to increment the counter
/**But where does the incrementCounterClone got his link to 'counter'?
 * 
 * AS SOON AS 'outer2' RETURNED THE FUNCTION DEFINITION (the whole code of incrementCounter)
   THE RETURNED FUNCTION (incrementCounter) TOOK ! ALL ! THE OTHER THINGS THAT ARE IN
   THE LOCAL MEMORY WITH IT (and are used inside the returned function) (like on a small backpack). 
   THAT'S WHY IT IS POSSIBLE TO INCREMENT THE 'counter' EVEN THOUGH IT SEEMS LIKE IT WAS
   DELETED SINCE IT WASN'T RETURNED OUT OF THE FUNCTION WHEN 'outer2' POPPED OF THE CALL STACK.

  So incrementCounterClone looks in its local memory and doesn't find 'counter' ther.
  BUT before it look in global memory, it looks into its 'backpack' and if it find 'counter',
  which it does, the 'counter' is updatet to one
*/
incrementCounterClone();

/**
 * now, if we call incrementCounterClone again, the same procedure happens. But now,
 * the counter is not zero, but one because it got updated by preceding function call.
 * The counter now gets updated to two
 */
incrementCounterClone();
incrementCounterClone();
incrementCounterClone();
