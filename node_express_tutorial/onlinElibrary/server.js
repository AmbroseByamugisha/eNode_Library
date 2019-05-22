import express from 'express';
import bodyParser from 'body-parser';

const app = express()

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
	return res.status(200).send({
		'message': 'Welcome to Elibrary'
	});
})
const PORT = 3000
app.listen(PORT)
console.log('app running on port ', PORT)