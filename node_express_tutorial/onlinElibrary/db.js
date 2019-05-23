const { Pool } = require('pg');
const dotenv = require('dotenv');
const uuidv4 = require('uuid/v4');
var moment = require('moment');
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log('connected to the database ' + process.env.DATABASE);
});

// create users table
const createUsersTable = () => {
	const queryText = 
	`CREATE TABLE IF NOT EXISTS
		users(
			id UUID PRIMARY KEY,
			email VARCHAR(128) UNIQUE NOT NULL,
			password VARCHAR(128) NOT NULL,
			created_date TIMESTAMP,
			modified_date TIMESTAMP,
			role VARCHAR(128) DEFAULT 'user')`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
}

// create books table
const createBooksTable = () => {
	const queryText = 
		`CREATE TABLE IF NOT EXISTS
			books(
				id UUID PRIMARY KEY,
				title TEXT NOT NULL,
				author TEXT NOT NULL,
				owner_id UUID NOT NULL,
				created_date TIMESTAMP,
				modified_date TIMESTAMP,
				FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE NO ACTION )`;
				pool.query(queryText)
					.then((res) => {
						console.log(res);
						pool.end();
					})
					.catch((err) => {
						console.log(err);
						pool.end();
					});
				}

// drop users table
const dropUsersTable = () => {
	const queryText = 'DROP TABLE IF EXISTS users returning *';
	pool.query(queryText)
	.then((res) => {
		console.log(res);
		pool.end();
	})
	.catch((err) => {
		console.log(err);
		pool.end();
	});
}

// drop users table
const dropBooksTable = () => {
	const queryText = 'DROP TABLE IF EXISTS books returning *';
	pool.query(queryText)
	.then((res) => {
		console.log(res);
		pool.end();
	})
	.catch((err) => {
		console.log(err);
		pool.end();
	});
}

//create admin user
async function createAdminUsers(){
	const text = 'INSERT INTO users(id, email, password, created_date, modified_date, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
	const values = [uuidv4(),'ambrose@gmail.com', process.env.admin_password, moment(new Date()),
	      moment(new Date()), 'admin']

	// callback
	pool.query(text, values, (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    console.log(res.rows[0])
	  }
	})

	// promise
	pool.query(text, values)
	  .then(res => {
	    console.log(res.rows[0])
	  })
	  .catch(e => console.error(e.stack))

	// async/await
	try {
	  const res = await pool.query(text, values)
	  console.log(res.rows[0])
	} catch(err) {
	  console.log(err.stack)
	}
}

// create all tables
const createAllTables = () => {
	createUsersTable();
	createBooksTable();
}

//create admin user
const createAllAdmins = () => {
	createAdminUsers();
	// createAdminUser();
}

// drop all tables
const dropAllTables = () => {
	dropUsersTable();
	dropBooksTable();
}

pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
});

module.exports = {
	createUsersTable,
	createBooksTable,
	createAllTables,
	createAllAdmins,
	createAdminUsers,
	dropUsersTable,
	dropBooksTable,
	dropAllTables
};

require('make-runnable');