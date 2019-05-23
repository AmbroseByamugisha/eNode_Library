import express from 'express';
import bodyParser from 'body-parser';
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

app.get('/', (req, res) => {
	return res.status(200).send({
		'message': 'Welcome to Elibrary'
	});
});

//Routes
app.post('/api/v1/books', Auth.verifyToken, Book.create);
app.get('/api/v1/books', Auth.verifyToken, Book.getMyBooks);
app.get('/api/v1/books/:id', Auth.verifyToken, Book.getOne);
app.put('/api/v1/books/:id', Auth.verifyToken, Book.update);
app.delete('/api/v1/books/:id', Auth.verifyToken, Book.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.delete('/api/v1/users/:id', Auth.verifyToken, UserWithDb.delete);

const PORT = 3000
app.listen(PORT)
console.log('app running on port ', PORT)