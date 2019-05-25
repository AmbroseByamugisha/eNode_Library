token = localStorage.getItem("accesstoken")
loginUrl = 'http://127.0.0.1:3000/api/v1/users/login';

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    

    let data = {
        email: email,
        password: password
    }
    fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', 'x-access-token': `${token}`},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        localStorage.setItem("accesstoken", response.token);
        if (response.message=='user logged in successfully'){    
            //redirectUser(response.role);
            window.location.replace('home.html');
        }    
        else{
            alert(response.message);
            if (response.message=='user does not exist, do you want to signup'){
                window.location.replace('signup.html');
            }
            else{
                window.location.reload()
            }
        }
    })
}

// signup script
function signup() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    const url = 'http://127.0.0.1:5000/api/v1/users';

    let data = {
        email: email,
        password: password
    }
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
