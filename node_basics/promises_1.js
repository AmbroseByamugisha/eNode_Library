// const myPromise = new Promise((resolve, reject) => {
//   resolve(4); // resolves the promise
//   reject('oops sorry'); //rejects the promise
// });
//
// myPromise.then((x) => console.log('after success', x));
// myPromise.catch((err) => console.log('after failure', err));
//
// //then method accepting both success and failure callbacks.
// myPromise.then((x) => console.log('after success', x),
//                 (err) => console.log('after failure', err));
// new Promise((resolve, reject) => {
//   resolve(1); //resolves the promise
// }).then ((x) => console.log('after success', x));

// var promise1 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 100, 'foo');
// });
// promise1.then((x) => {
//   return x; //x is foo here
// }).then((x) => {
//   var y = x; // x is foo here, and no return statement
// }).then((x) => {
//   return x; // x is undefined here
// });

// let promise1 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 1000,'first');
// });
//
// promise1.then((x) => {
//   return promise2; // value of x is 'first' here
// }).then((x) => {
//   return promise3; // value of x is 10 here.
// }).then((x) => {
//   //value of the x is 'three' here
// });
//
// let promise2 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 2000, 'second');
// }).then ((x) => {
//   return x; // value of x is 'second' here
// }).then((x) => {
//   return 10; // value of x is 'second' and 10 will be result of this block.
// });
//
// let promise3 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 3000, 'third');
// });
// NESTED PROMISES
// let promise1 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 1000, 'foo');
// });
// promise1.then(promise1SuccessMessage => {
//   return promise2.then(x => {
//     console.log(x); // value is 'two'
//     console.log(promise1SuccessMessage); // value is 'foo'
//     return 'three';
//   });
// })
// .then(x => console.log(x)) // value is 'three'
// .catch(err => console.log(err)); // catches any rejected value
//
// let promise2 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 2000, 'two');
// });
// //another
// let promise1 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 3000, 'foo');
// });
// promise1.then(promise1SuccessMessage => {
//   // at this instant promise2 is already resolved.
//   // and promise3 is still pending.
//   debugger;
//   return promise2;
// })
// .then(x => console.log(x))
// .catch(err => console.log(err));
//
// let promise2 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 2000, 'two');
// });
//
// let promise3 = new Promise(function(resolve, reject){
//   setTimeout(resolve, 5000, 'three');
// });

//synchronous
new Promise(function(resolve, reject){
  setTimeout(resolve, 100, 'foo');
})
.then(x => { return x; }) // 'foo' is passed on to following then
.then(y => console.log(y)) // nothing returned from here
.then(z => console.log(z)); // z is undefined
