token = localStorage.getItem("accesstoken");

//get all books script
function fetchAllBooks(){

    const getAllBooksUrl = 'http://127.0.0.1:9000/api/v1/books/allbooks';
    fetch(getAllBooksUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', 'x-access-token': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        data = response.books;
        console.log(data)
        data.forEach(function(item, index, array) {
            console.log(item["title"]);
            var title = item["title"];
            var book_id = item["id"];
            //create get Item button
            var getItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            getItembutton.appendChild(t);
            document.body.appendChild(getItembutton);
            getItembutton.innerHTML = "Get Item";
            //create Edit button
            var editItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            editItembutton.appendChild(t);
            document.body.appendChild(editItembutton);
            editItembutton.innerHTML = "Edit Item";
            //create Delete Item button
            var deleteItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            deleteItembutton.appendChild(t);
            document.body.appendChild(deleteItembutton);
            deleteItembutton.innerHTML = "Delete Item";
            document.getElementById("books-list").innerHTML += (title
                    +"<br>");
            //document.getElementById("books-list").appendChild(newbutton);
            getItembutton.addEventListener('click', () => {
                fetch(`http://127.0.0.1:9000/api/v1/books/${book_id}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json', 'x-access-token': `${token}`
                    }
                })
                .then(res => res.json())
                .then(response => {
                    data = response;
                    console.log(data);
                    document.getElementById("book-details").innerHTML += (data.title
                        +"<br>" + data.author);
                            })
            })
            //delete button logic
            deleteItembutton.addEventListener('click', (res) => {
                fetch(`http://127.0.0.1:9000/api/v1/books/${book_id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`}, 
                    })
                    .then(window.location.reload())
            })
            //end delete button
            editItembutton.addEventListener('click', (book_id) => {
                //dynamic form
                var h = document.createElement("h3");
                h.innerHTML = "Edit Item"
                var f = document.createElement("form");
                f.setAttribute('method',"put");
                //f.setAttribute('action',"submit.php");

                var i = document.createElement("input"); //input element title, text
                i.setAttribute('type',"text");
                i.setAttribute('name',"title");
                i.setAttribute('id', "title");
                i.setAttribute('placeholder', 'Enter new title');

                var g = document.createElement("input"); //input element author, text
                g.setAttribute('type',"text");
                g.setAttribute('name',"author");
                g.setAttribute('id', "author");
                g.setAttribute('placeholder', 'Enter new author');

                let newTitle = document.getElementById("title");
                let newAuthor = document.getElementById("author");

                var s = document.createElement("input"); //input element, Submit button
                s.setAttribute('type',"submit");
                s.setAttribute('value',"Submit");
                s.appendChild(t);
                data = {
                    title: newTitle,
                    author: newAuthor
                }
                
                f.appendChild(h);
                f.appendChild(i);
                f.appendChild(g);
                f.appendChild(s);

                //and some more input elements here
                //and dont forget to add a submit button

                document.getElementsByTagName('body')[0].appendChild(f);
                //end try
                //window.location.replace('signup.html')
                s.addEventListener('click', () => {
                    fetch(`http://127.0.0.1:9000/api/v1/books/${book_id}`, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`},
                        body: JSON.stringify(data) 
                    })
                    .then(res.json())
                    .then(response => {
                        if(response === "book updated successfully"){
                            console.log("updated");
                        }
                        else {
                            window.location.replace('signup.html');
                            console.log(response.message);
                            }
                        })
                    })
                })
            });
        });
        
    }
    fetchAllBooks()

// create book script
function createBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    
    const createBookUrl = 'http://127.0.0.1:9000/api/v1/books';

    let data = {
        title: title,
        author: author
    }
    fetch(createBookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', 'x-access-token': `${token}`},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message);
        if (response.message=="book created successfully"){
        window.location.reload();
        }
    })
}

// get my books script
function getMyBooks(){

    const getAllBooksUrl = 'http://127.0.0.1:9000/api/v1/books';
    fetch(getAllBooksUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', 'x-access-token': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        data = response.books;
        console.log(data)
        data.forEach(function(item, index, array) {
            console.log(item["title"]);
            var title = item["title"];
            document.getElementById("my-books").innerHTML += (title
                    +"<br>");
            });
        });
        
    }
