const express = require('express');
const app = express();
const CategoryRoute = express.Router();

// Require Post model in our routes module
let Category = require('../models/Category');

// Defined store route
CategoryRoute.route('/add').post(function (req, res) {
	let category = new Category(req.body);
	category.save()
		.then(category => {
			res.status(200).json(category);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

// Defined get data(index or listing) route
CategoryRoute.route('/').get(function (req, res) {
	Category.find(function (err, categories) {
		if (err) {
			console.log(err);
		} else {
			res.json(categories);
		}
	});
});

// Defined delete | remove | destroy route
CategoryRoute.route('/delete/:id').get(function (req, res) {
	Category.findByIdAndRemove({
		_id: req.params.id
	}, function (err, category) {
		if (err) res.json(err);
		else res.json(req.params.id);
	});
});

module.exports = CategoryRoute;
