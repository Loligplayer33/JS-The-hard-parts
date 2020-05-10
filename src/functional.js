/*eslint no-unused-vars: "off"*/
console.log(".....................................");
console.log("FUNCTIONAL PROGRAMMING");

// what is actually a function ?
/* => the definition of a function will evolve during this file, so don't take the
      first one that gets presented to you as granted. All definitions will be correct
      but only the last one will be complete*/

function addNumbers(x = 0, y = 0, z = 0, w = 0) {
  var total = x + y + z + w;
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
      'extraNumbers' is calling a procedure and through that validates one of the 
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

/**This function's outcome is in direct semantic relation to it's input values
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
  => To understand why, we have to add another pice to our definition of what a function
    actually is: A function not only has to take some input, do something with it,
    returns some output and has to have a semantic relationship between the input and
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
   as a 'function call'. The actual definition of a function isn't the most inportant
   par. The most Important part is that the function gets called, gives direct input
   and got direct output at that specific call (cf. l.103, 104)

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
 * (CPU Heat, CPU Time Delary)
  => we notice that it is literually impossible to avoid all kind of side-effects
    Thats why it is not our goal to abandon them, but rather to be aware of them
    and try to minimize the amount. (We should do that, because side-effects take
    away the benefits of function programming as a whole)

    => Make side-effect obvious and try to use them as little as possible

    Seperate your side effect code from the core, functional code.
 */
