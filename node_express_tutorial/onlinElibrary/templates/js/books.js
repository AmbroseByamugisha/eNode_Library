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
            var author = item["author"];
            //create get Item button
            var getItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            getItembutton.appendChild(t);
            //document.getElementById("book-btn").appendChild(getItembutton);
            getItembutton.innerHTML = "Book details";
            //create Edit button
            var editItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            editItembutton.appendChild(t);
            //document.getElementById("book-btn").appendChild(editItembutton);
            editItembutton.innerHTML = "Edit Book";

            //create Delete Item button
            var deleteItembutton = document.createElement("button");
            var t = document.createTextNode(book_id);
            deleteItembutton.appendChild(t);
            //document.getElementById("book-btn").appendChild(deleteItembutton);
            deleteItembutton.innerHTML = "Delete Book";
            //try
            var mybook = document.createElement("a");
            var q = document.createTextNode(title);
            mybook.appendChild(q);
            document.getElementById("books-list").appendChild(mybook);
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
            deleteItembutton.addEventListener('click', () => {
                fetch(`http://127.0.0.1:9000/api/v1/books/${book_id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`}, 
                    })
                    .then(window.location.reload())
                })
            //end delete button logic
            
            //start
            editItembutton.addEventListener('click', () => {
                data1 = {}; 
                var editheader = document.createElement("h3");
                editheader.innerText = "Edit Book"
                var i = document.createElement("input"); //input element, text
                i.setAttribute('type',"text");
                i.setAttribute('placeholder', 'Enter new title here');
                i.setAttribute('name',"title");
                i.addEventListener("input", () => {
                    //console.log(i.value);
                    let e = i.value;
                    data1.title = e;
                    
                })
                var j = document.createElement("input"); //input element, text
                j.setAttribute('type',"text");
                j.setAttribute('placeholder', 'Enter new author here');
                j.setAttribute('name',"author");
                j.addEventListener("input", () => {
                    //console.log(j.value);
                    let h = j.value;
                    data1.author = h;
                })
                var s = document.createElement("button");
                document.getElementById('edit-header').appendChild(editheader);
                document.getElementById('edit-title').appendChild(i);
                document.getElementById('edit-author').appendChild(j);
                document.getElementById('edit-btn').appendChild(s);
                s.innerText = 'Edit Book'
                s.addEventListener('click', () => {
                    fetch(`http://127.0.0.1:9000/api/v1/books/${book_id}`, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`},
                        body: JSON.stringify(data1) 
                    })
                    //.then(res.json())
                    .then(response => {
                        console.log("updated");
                        window.location.reload();
                    })
                })

            })
            //end
            
            mybook.addEventListener('click', ()=> {
                document.getElementById("book-btn").appendChild(getItembutton);
                document.getElementById("book-btn").appendChild(editItembutton);
                document.getElementById("book-btn").appendChild(deleteItembutton);
            })
            });
        });
        
    }
    fetchAllBooks()

// create book script
function createBook() {
    data1 = {}; 
    var createheader = document.createElement("h3");
    createheader.innerText = "Create Book"
    var i = document.createElement("input"); //input element, text
    i.setAttribute('type',"text");
    i.setAttribute('placeholder', 'Enter title here');
    i.setAttribute('name',"title");
    i.addEventListener("input", () => {
        //console.log(i.value);
        let e = i.value;
        data1.title = e;
        
    })
    var j = document.createElement("input"); //input element, text
    j.setAttribute('type',"text");
    j.setAttribute('placeholder', 'Enter author here');
    j.setAttribute('name',"author");
    j.addEventListener("input", () => {
        //console.log(j.value);
        let h = j.value;
        data1.author = h;
    })
    var s = document.createElement("button");
    document.getElementById('create-header').appendChild(createheader);
    document.getElementById('create-title').appendChild(i);
    document.getElementById('create-author').appendChild(j);
    document.getElementById('create-btn').appendChild(s);
    s.innerText = 'Create Book'
    s.addEventListener('click', () => {
        fetch(`http://127.0.0.1:9000/api/v1/books`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json', 'x-access-token':`${token}`},
            body: JSON.stringify(data1) 
            })
            .then(response => {
                        console.log("updated");
                        window.location.reload();
            })
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
