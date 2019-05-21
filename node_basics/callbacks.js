// function doHomework(subject){
//   alert(`Starting my ${subject} homework`);
// }
//
// doHomework('english');

function doHomework(subject, callback){
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function(){
  alert('Finished my homework');
});
//these are the functions i should have been running
// in the flaskchat api templates coz
// the functions were running after others.
