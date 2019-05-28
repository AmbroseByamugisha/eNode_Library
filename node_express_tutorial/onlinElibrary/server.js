import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors');
import dotenv from 'dotenv';
import 'babel-polyfill';
import BookWithDB from './src/usingDB/controllers/Book';
import UserWithDb from './src/usingDB/controllers/User';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();
const Book = BookWithDB;
const app = express()

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static files middleware
app.use(express.static('templates'));

//CORS middleware
app.use(cors())

app.get('/', (req, res) => {
	return res.status(200).send({
		'message': 'Welcome to Elibrary'
	});
});

//Routes
app.post('/api/v1/books', Auth.verifyToken, Book.create);
app.get('/api/v1/books/allbooks', Auth.verifyToken, Book.getAllBooks);
app.get('/api/v1/books', Auth.verifyToken, Book.getMyBooks);
app.get('/api/v1/books/:id', Auth.verifyToken, Book.getOne);
app.put('/api/v1/books/:id', Auth.verifyToken, Book.update);
app.delete('/api/v1/books/:id', Auth.verifyToken, Book.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.get('/api/v1/users', Auth.verifyToken, UserWithDb.getAllUsers);
app.delete('/api/v1/users/:id', Auth.verifyToken, UserWithDb.delete);

const PORT = 9000
app.listen(PORT)
console.log('app running on port ', PORT)