const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jewelry', {
	useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
	dest: '../front-end/public/images/',
	limits: {
		fileSize: 10000000
	}
});

const itemSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	path: String,
});

const shoppingCartSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	path: String,
});

const Item = mongoose.model('Item', itemSchema);
const CartItem = mongoose.model('Cart', shoppingCartSchema);

// Add a photo to the database
app.post('/api/photos', upload.single('photo'), async (req, res) => {
	if (!req.file) {
		return res.sendStatus(400);
	}
	res.send({
		path: "/images/" + req.file.filename
	});
});

// Add an item to the cart
app.post('/api/cart', async (req, res) => {
	try {
		let item = await Item.findOne({
			_id: req.body.id
		});
		let cartItem = new CartItem({
			title: item.title,
	    description: item.description,
	    price: item.price,
	    path: item.path,
		});
		await cartItem.save();
		res.send(cartItem);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Add an item to the database
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get all items
app.get('/api/items', async (req, res) => {
	try {
		let items = await Item.find();
		res.send(items);
	} catch (error) {
		res.sendStatus(500);
	}
});

// Get items in the cart
app.get('/api/cart', async (req, res) => {
	try {
		let cartItems = await CartItem.find();
		res.send(cartItems);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Remove an item
app.delete('/api/items/:id', async (req, res) => {
	try {
		await Item.deleteOne({
			_id: req.params.id
		});
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

// Remove an item from the cart
app.delete('/api/cart/:id', async (req, res) => {
	try {
		await CartItem.deleteOne({
			_id: req.params.id
		});
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

// Update an item's details
app.put('/api/items/:id', async (req, res) => {
	try {
		let item = await Item.findOne({
			_id: req.params.id
		});
		item.title = req.body.title,
		item.description = req.body.description,
		item.price = req.body.price,
		await item.save();
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.listen(3000, () => console.log('Server listening on port 3000!'));