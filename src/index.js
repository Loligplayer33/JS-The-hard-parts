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
console.log(".........higher order functions");
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
