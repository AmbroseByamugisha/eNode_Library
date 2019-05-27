token = localStorage.getItem("accesstoken");
// signup script
function signup() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    const url = 'http://127.0.0.1:9000/api/v1/users';

    let data = {
        email: email,
        password: password
    }
    console.log(data);
    var t = JSON.stringify(data);
    console.log(t);
    console.log(typeof(t));
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message);
        if (response.message=="User created successfully"){
        window.location.replace('home.html');
        }
    })
}

// // get books
// function fetchAll(){

//     const msgUrl = 'http://127.0.0.1:9000/api/v1/books/allbooks';

//     fetch(msgUrl, {
//         method: 'GET',
//         mode: 'no-cors',
//         headers: {
//             'Content-Type': 'application/json', 'Authorization': `x-access-token ${token}`
//         }
//     })
//     .then(res => res.json())
//     .then(response => {
//         data = response.books;
//         data.forEach(function(item, index, array) {
//             console.log(item["title"]);
//             var title = item["title"];
//             document.getElementById("books-list").innerHTML += (title
//                     +"<br>");
//             });
//         });
        
//     }  
//     fetchAll()