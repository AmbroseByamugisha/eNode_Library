// console.log(this);
// var myName = 'Salah';

// var person = {
//   first: 'ambrose',
//   last: 'byamu',
//   full: function(){
//     console.log(this.first + ' ' + this.last);
//   }
// };
//
// person.full();
//
// var person = {
//   first: 'Mohamed',
//   last: 'Salah',
//   full: function(){
//     console.log(this);
//   }
// };
//
// person.full();
//
// var person = {
//   first: 'Masiko',
//   last: 'Innocent',
//   full: function(){
//     console.log(this.first + ' ' + this.last);
//   },
//   personTwo: {
//     first: 'Alisson',
//     last: 'Becker',
//     full: function(){
//       console.log(this.first + ' ' + this.last);
//     }
//   }
// }
// person.full()
// person.personTwo.full();

// function Car(make, model) {
//   this.make = make;
//   this.model = model;
// };
//
// var myCar = new Car('Ford', 'Escape');
// console.log(myCar);
//
// function add(c, d) {
//   console.log(this.a + this.b + c + d);
// }
// var ten = {a: 1, b: 2};
// add.call(ten, 3, 4);
// add.apply(ten, [3,4]);

var small = {
  a: 1,
  go: function(b,c,d){
    console.log(this.a+b+c+d);
  }
}

var large = {
  a:100
}
small.go(2,3,4);
small.go.call(large,2,3,4);
var bindTest = small.go.bind(large,2);
console.log(bindTest);
bindTest(3,4);
