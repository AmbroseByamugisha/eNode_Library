// var ages = [3, 10, 20, 39];
//
// function checkAdult(age){
//   return age >= 18;
// }
//
// console.log(ages.find(checkAdult))

var goods = [
  {
    id: 1,
    name: 'ambu'
  },
  {
    id: 2,
    name: 'byamu'
  },
  {
    id: 3,
    name: 'masiko'
  }
];

 function findOne(id) {
    return goods.find(good => good.id === id);
  }

var goodie = findOne(3);
var index = goods.indexOf(goodie);
var remained_goods = goods.splice(index, 1)
console.log(goodie);
console.log(index);
console.log(remained_goods);
