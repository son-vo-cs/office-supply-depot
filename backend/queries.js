const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'root',
	host: 'localhost',
	database: 'cs160osd',
	password: '1',
	port: '5432'
});

const registerUser = (request, response) => {
	const { email, password } = request.body;

	pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
		if (error) {
			throw error;
		}
		if (results.rows === undefined || result.rows.length == 0) {
			pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING userid', [email, password], (error, results) => {
				if (error) {
					throw error;
				}
				response.status(201).send(`User added successfully.  User ID is: ${result.rows[0].userid}`)
			})
		}
		response.status(200).json(results.rows);
	})
}

const loginUser = (request, response) => {
	const email = request.body.email;
	const password = request.body.password;
	//console.log(request);

	pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
		if (error) {
			throw error;
		}
		console.log("Query successful.  Rows affected: " + results.rowCount);
		return response.status(200).json(results.rows);
	})
}

module.exports = {
	registerUser,
	loginUser
}