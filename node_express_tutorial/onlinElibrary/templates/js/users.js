token = localStorage.getItem("accesstoken");


//get all users script
function fetchAllUsers(){

    const getAllUsersUrl = 'http://127.0.0.1:9000/api/v1/users';
    fetch(getAllUsersUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', 'x-access-token': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        data = response.users;
        console.log(data)
        data.forEach(function(item, index, array) {
            console.log(item["email"]);
            var email = item["email"];
            var user_id = item["id"];
            //create Delete User button
            var deleteUserbutton = document.createElement("button");
            var t = document.createTextNode(user_id);
            deleteUserbutton.appendChild(t);
            document.getElementById("usr-btn").appendChild(deleteUserbutton);
            deleteUserbutton.innerHTML = "Delete User";
            document.getElementById("users-list").innerHTML += (email
                    +"<br>");
            //delete button logic
            deleteUserbutton.addEventListener('click', () => {
                fetch(`http://127.0.0.1:9000/api/v1/users/${user_id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`}, 
                    })
                    .then(window.location.reload())
                })
            //end delete button
            });
        });
        
    }