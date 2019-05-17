// function addTwo(a){
//   return a + 2;
// }
// var t = addTwo(3);
// console.log(t)

// // shorter code
// var addTwo = (a) => a + 2
// console.log(addTwo(3))
//
// function Counter(){
//   this.num = 0;
//
//   this.timer = setInterval(function add(){
//     this.num++;
//     console.log(this.num);
//   }, 1000);
// }
// var b = new Counter();
//
// function Counter(){
//   this.num = 0;
//
// this.timer = setInterval(function add(){
//   console.log(this);
// }, 1000);
// }
//
// var b = new Counter();
//
// function Counter(){
//   this.num = 0;
//
//   this.timer = setInterval(() => {
//     this.num++;
//     console.log(this.num);
//   }, 1000);
// }
//
// var b = new Counter();

function Counter(){
  var that = this;
  this.timer = setInterval(() => {
    console.log(this === that);
  }, 1000);
}

var b = new Counter();
