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

function getpair(id,quantity)
{
	var str = "";
	for (var i = 0; i < id.length; i++)
	{
		str = str + "(" + id[i] + "," + quantity[i] + ")" + ",";
	}
	str = str.slice(0,-1);
	return str;
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

			}
		});
}


const addItem = (request, response) =>{
	const {warehouseid, quantity, price, name, weight, description, category, url} = request.body;

	setDatabase('INSERT INTO items (warehouseid, quantity, price, name, weight, description, category,imagename) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
		[warehouseid, quantity, price, name, weight, description, category, url],(result)=>
		{
			response.status(200).json("Item added successfully");
		});

}

const checkAvailable = (request, response) =>{
	const {itemId, quantity} = request.body;

	getDatabase('SELECT rowid,* FROM items WHERE rowid = $1', [itemId],
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`The item id is incorrect`);
			}
			else
			{
				if (result.quantity >= quantity)
				{
					response.status(200).json(`Available`);
				}
				else
				{
					response.status(200).json(`Out of stock`);
				}

			}
	});
}



const submitOrder = (request, response) => {
	const {userid, firstname, lastname, address, city, state, zip, phone, totalprice, itemids, quantities, priorities, timestamp} = request.body;
	var shipaddress = firstname + " " + lastname + " \n" + address + ", " + city + ", " + state + " " + zip;
	var pair = getpair(itemids, quantities);
	var qr = "WITH Tmp(id,quantity) AS (VALUES" + pair + ") UPDATE items SET quantity = quantity - ";
	qr = qr + "(SELECT quantity FROM Tmp WHERE items.rowid = Tmp.id) WHERE rowid IN (SELECT id FROM Tmp)";
	setDatabase(qr, [],
		(result) => {


			setDatabase("INSERT INTO orders (userid, status,orderdate) VALUES (?,?,?)",
				[userid,"processing","2019-05-09"], (t)=>{
					getDatabase("SELECT rowid FROM orders WHERE userid = $1", [userid],(t1)=>{
						if (t1 === undefined)
						{
							response.status(404).json("Cannot get orders");
						}
						else {
							var orderid = t1.rowid;
							setDatabase("INSERT INTO ordersplaced (userid, orderid, shipadd, phone, totalprice, itemids, quantities, priorities, orderdate) VALUES (?,?,?,?,?,?,?,?,?)",
								[userid,orderid,shipaddress,phone,totalprice,itemids.toString(),quantities.toString(),priorities.toString(),timestamp],(t)=>{

									setDatabase("INSERT INTO useraddress (userid, address, city, state,zip) VALUES (?,?,?,?,?)",
													[userid,address,city,state,zip],(t3)=> {
											response.status(200).json("Successfully submitted");
										});
							});


						}
					});
				});
		});
}


const getOrderHistory = (request, response) =>{
	const userid = request.body.userid;
	getDatabase('SELECT * FROM ordersplaced WHERE userid = $1', [userid],
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`Cannot get order history`);
			}
			else
			{
				response.status(200).json(result);
				// console.log(result);

			}
		});
}



module.exports = {
	registerUser,
	loginUser,
	getAll,
	getItem,
	addItem,
	checkAvailable,
	submitOrder,
	getOrderHistory,
}
