const sqlite = require('sqlite3').verbose();



function getDatabase(command, vars, cb)
{
	const db = new sqlite.Database('./data/cs160osd.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});

	if (vars === "")
	{
		db.all(command,[], (error, row) => {
			if (error) {
				throw error;
			}
			db.close();
			return cb(row);
		});
	}
	else {
		db.get(command, vars, (error, row) => {
			if (error) {
				throw error;
			}
			db.close();
			return cb(row);
		});
	}
}

function setDatabase(command, vars, cb)
{
	const db = new sqlite.Database('./data/cs160osd.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});

	db.run(command, vars, (error, row) => {
		if (error) {
			throw error;
		}
		db.close();
		return cb(row);
	});
}

const registerUser = (request, response) => {
	const {firstname, lastname, email, password} = request.body;
	getDatabase('SELECT email FROM users WHERE email = $1', [email],
		(result)=>{
			if (result === undefined)
			{
				setDatabase('INSERT INTO users (email, password) VALUES (?, ?)', [email, password],(t)=>{
					getDatabase('SELECT rowid FROM users WHERE email = $1', [email],
						(result1)=> {
							if (result1 === undefined)
							{
								response.status(404).json("Cannot get value");
							}
							else{
								var userId = result1.rowid;
								setDatabase('INSERT INTO customers (userid, firstname, lastname) VALUES (?, ?, ?)', [userId,firstname,lastname],(tt)=>{
									response.status(200).json("User added successfully");
								});
							}

						});
				});

			}
			else
			{
				response.status(404).json("User already exists");
			}
	});


}



const loginUser = (request, response) => {
	const {email, password} = request.body;
	getDatabase('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password],
		(result)=>{
		if (result === undefined)
		{
			response.status(404).json(`Invalid email/password combination.`);
		}
		else
		{
			getDatabase('SELECT rowid FROM users WHERE email = $1', [email], (t)=>{
				var userId = t.rowid;
				getDatabase('SELECT firstname FROM customers WHERE userid = $1', [userId], (result1)=>
				{
					response.status(200).json({"userid": userId, "firstname" : result1.firstname});
				})

			});
		}
	});
}

const getAll = (request, response) => {
	getDatabase('SELECT * FROM items WHERE quantity > 0', "",
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`There is no item to get.`);
			}
			else
			{
				response.status(200).json(result);

			}
		});
}

const getItem = (request, response) =>{
	const itemId = request.body.itemId;
	getDatabase('SELECT rowid,* FROM items WHERE rowid = $1', [itemId],
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`There is no item to get.`);
			}
			else
			{
				response.status(200).json(result);
				console.log(result);

			}
		});
}


// const addItem = (request, response) =>{
// 	// const {warehouseid, quantity, price, name, weight, description, category, imagename} = request.body;
// 	var warehouseid = 1;
// 	var quantity = 6;
// 	var price = 15;
// 	var name = "chair";
// 	var weight = 10;
// 	var description = "a chair";
// 	var category = "home";
// 	var imagename = "2.jpg";
//
//
// 	setDatabase('INSERT INTO items (warehouseid, quantity, price, name, weight, description, category,imagename) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
// 		[warehouseid, quantity, price, name, weight, description, category, imagename],(result)=>
// 		{
// 			response.status(200).json("Item added successfully");
// 		});
//
// }



module.exports = {
	registerUser,
	loginUser,
	getAll,
	getItem
}
