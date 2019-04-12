const sqlite = require('sqlite3').verbose();


//Template for all queries
const template = (request, response) => {
	const db = new sqlite.Database('./data/cs160osd.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});

	//Queries and function body go here

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
};

const registerUser = (request, response) => {
	const db = new sqlite.Database('./data/cs160osd.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});

	const { email, password } = request.body;


	db.get('SELECT * FROM users WHERE email = ?', [email], (error, row) => {
		if (error) {
			throw error;
		}
		if (row === undefined) {
			db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error, row) => {
				if (error) {
					throw error;
				}
				response.status(201).send(`User added successfully.  User ID is: ${this.lastID}`);
			})
		}
		else {
			response.status(404).send(`User already exists.`);
		}
	});

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}

const loginUser = (request, response) => {
	const email = request.body.email;
	const password = request.body.password;

	const db = new sqlite.Database('./data/cs160osd.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});

	db.get('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, row) => {
		if (error) {
			throw error;
		}
		if (row === undefined) {
			response.status(404).send(`Invalid email/password combination.`);
		}
		else {
			response.status(200).json(row);
		}
		
	});

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log(`Database closed after query.`);
	});
}

module.exports = {
	registerUser,
	loginUser
}