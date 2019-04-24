const sqlite = require('sqlite3').verbose();
const jwtauth = require('./auth/jwtauth');




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

function getpair2(orderid, itemids, warehousenums, quantities, priorities)
{
	var str = "";
	for (var i = 0; i < itemids.length; i++)
	{
		var status = "'processing'";
		if (priorities[i] < 2)
		{
			status = "'delivered'";
		}
		str = str + "(" + orderid + "," + itemids[i] + "," + warehousenums[i] + "," + quantities[i] + "," + priorities[i] + "," + status + "),";
	}
	return str.slice(0,-1);
}

const registerUser = (request, response) => {
	const {firstname, lastname, email, password} = request.body;
	var userId = 1;


	getDatabase('SELECT email FROM users WHERE email = $1', [email],
		(result)=>{
			if (result === undefined)
			{
				setDatabase('INSERT INTO users (email, password) VALUES (?, ?)', [email, password],(t)=>{
					getDatabase('SELECT userid FROM users WHERE email = $1', [email],
						(result1)=> {
							if (result1 === undefined)
							{
								response.status(404).json("Cannot get value");
							}
							else{
								var userId = result1.userid;
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
				let token = jwtauth.generate({email: email});
				getDatabase('SELECT userid FROM users WHERE email = $1', [email], (t)=>{
					var userId = t.userid;
					getDatabase('SELECT firstname FROM customers WHERE userid = $1', [userId], (result1)=>
					{
						response.status(200).json({"userid": userId, "firstname" : result1.firstname, "level": result.level, "token": token});
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
	const itemId = request.body.itemid;
	getDatabase('SELECT * FROM items WHERE itemid = $1', [itemId],
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


function helperAvailable(itemids)
{
	var str = "";
	for (var i = 0; i < itemids.length; i++)
	{
		str = str + "(" + itemids[i]  + ")" + ",";
	}
	return str.slice(0,-1);
}

function sortTwoList(itemids, quantities)
{

	var list = [];
	for (var j = 0; j < itemids.length; j++)
		list.push({'itemid': itemids[j], 'quantity': quantities[j]});

	list.sort(function(a, b) {
		return ((a.itemid < b.itemid) ? -1 : ((a.itemid == b.itemid) ? 0 : 1));

	});

	return list;

}


const checkAvailable = (request, response) =>{
	const {itemids, quantities} = request.body;
	var listsorted = sortTwoList(itemids, quantities);
	for (var k = 0; k < listsorted.length; k++) {
		itemids[k] = listsorted[k].itemid;
		quantities[k] = listsorted[k].quantity;
	}
	var qr = "WITH Tmp(id) AS (VALUES" + helperAvailable(itemids) + ")";
	qr = qr + "SELECT itemid, quantity FROM items WHERE itemid IN (SELECT id FROM Tmp)";
	getDatabase(qr, "",
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`The item ids is incorrect`);
			}
			else
			{
				var ids = [];
				for (var i = 0; i < result.length; i++)
				{
					if (result[i].quantity < quantities[i])
					{
						ids.push(result[i].itemid);
					}
				}
				if (ids.length > 0)
					response.status(404).json(ids);
				else
					response.status(200).json("All Available");
			}
		});
}



const submitOrder = (request, response) => {
	const {userid, firstname, lastname, address, city, state, zip, phone, totalprice, itemids, quantities, priorities, warehousenums, timestamp} = request.body;
	var shipaddress = address + ", " + city + ", " + state + " " + zip;
	var pair = getpair(itemids, quantities);
	var qr = "WITH Tmp(id,quantity) AS (VALUES" + pair + ") UPDATE items SET quantity = quantity - ";
	qr = qr + "(SELECT quantity FROM Tmp WHERE items.rowid = Tmp.id) WHERE rowid IN (SELECT id FROM Tmp)";


	setDatabase(qr, [],
		(result) => {
			setDatabase("INSERT INTO orders (userid, shipadd, phone, totalprice, orderdate, status) VALUES (?,?,?,?,?,?)",
				[userid,shipaddress, phone, totalprice, timestamp, "processing"], (t)=>{
					getDatabase("SELECT orderid FROM orders WHERE userid = " + userid, "",(t1)=>{
						if (t1 === undefined)
						{
							response.status(200).json("Cannot get orders");
						}
						else {
							var orderid = t1[t1.length-1].orderid;
							var values = getpair2(orderid,itemids,warehousenums,quantities,priorities);
							setDatabase("INSERT INTO itemsinorder (orderid, itemid, warehousenum, quantity, priority,status) VALUES " + values,
								[],(t)=>{
									getDatabase("SELECT itemid FROM itemsinorder WHERE status = 'processing' AND orderid = " + orderid,[],(t5)=>{
										if (t5 === undefined)
										{
											setDatabase("UPDATE orders SET status = 'delivered' WHERE orderid = ?",[orderid],(t6)=>{

											});
										}
									});
									getDatabase("SELECT userid FROM useraddress WHERE userid = $1", [userid], (t3)=>{
										if (t3 === undefined)
										{
											setDatabase("INSERT INTO useraddress (userid, address, city, state,zip) VALUES (?,?,?,?,?)",
												[userid,address,city,state,zip],(t4)=> {
													var result = {"orderid": orderid}
													response.status(200).json(result);
												});
										}
										else
										{
											setDatabase("UPDATE useraddress SET address = ?, city = ?, state = ?, zip = ? WHERE userid = ?",
												[address,city,state,zip,userid],(t4)=> {
													response.status(200).json({"orderid": orderid});
												});
										}
									});
								});
						}
					});
				});
		});
}


const getOrderHistory = (request, response) =>{
	const userid = request.body.userid;
	getDatabase('SELECT * FROM orders WHERE userid = ' + userid, "",
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`Cannot get order history`);
			}
			else
			{
				response.status(200).json(result);
			}
		});
}

const getOrderHistoryDetail = (request, response) =>
{
	const {orderid} = request.body;
	var qr = "WITH history AS(";
	qr = qr + "SELECT * FROM itemsinorder WHERE itemsinorder.orderid = " + orderid + ")";
	qr = qr + "SELECT orderid, items.itemid, name, items.quantity, priority, status, price, url FROM items, history WHERE items.itemid = history.itemid"
	getDatabase(qr, "",
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`Cannot get order history`);
			}
			else
			{
				response.status(200).json(result);

			}
		});
}

function helperShipAddress(arr, orderid)
{
	for (var i = 0; i < arr.length; i++)
	{
		if (arr[i].orderid === orderid)
			return arr[i].shipadd;
	}
}
const getShipAddress = (request, response) =>
{
	getDatabase("SELECT orderid, shipadd FROM orders WHERE status= " + "'processing'", "",
		(result)=>{
			if (result === undefined)
			{
				response.status(404).json(`Cannot get order history`);
			}
			else
			{
				getDatabase("SELECT itemid, orderid FROM itemsinorder WHERE status=" + "'processing'" , "",(t)=>{
					for (var i = 0; i < t.length; i++)
					{
						t[i]["shipaddress"] = helperShipAddress(result, t[i].orderid);
					}
					response.status(200).json(t);
				});
			}
		});
}

const markDelivered = (request, response) =>
{
	const {orderid, itemid} = request.body;
	// console.log(orderid);
	setDatabase("UPDATE itemsinorder SET status = 'delivered' WHERE orderid = " + orderid + " AND itemid = " + itemid,[],(t)=>{
		getDatabase("SELECT itemid FROM itemsinorder WHERE status = 'processing' AND orderid = " + orderid,[],(t5)=>{
			if (t5 === undefined)
			{
				setDatabase("UPDATE orders SET status = 'delivered' WHERE orderid = ?",[orderid],(t6)=>{
					response.status(200).json("Update status sucessfully for item " + itemid + " in  order " + orderid);
				});
			}
		});
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
	getOrderHistoryDetail,
	getShipAddress,
	markDelivered
}
