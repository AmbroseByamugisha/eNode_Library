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
        window.location.replace('base.html');
        }
    })
}
// produce token at create user route so to access the home page
// login script
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    const loginUrl = 'http://127.0.0.1:9000/api/v1/users/login';

    let data = {
        email: email,
        password: password
    }
    fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        localStorage.setItem("accesstoken",response.token);
        if (response.message=='user logged in successfully'){    
            window.location.replace('home.html');;
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

