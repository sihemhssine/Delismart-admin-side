const express = require('express');
const app = express();
const UserRoute = express.Router(); 
// Require Post model in our routes module
let User = require('../models/User');
 
// Defined store route
UserRoute.route('/add').post(function (req, res) {
	let user = new User(req.body);
	user.save()
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

// Defined get data(index or listing) route
UserRoute.route('/').get(function (req, res) {
	User.find(function (err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	});
});

// Defined delete | remove | destroy route
UserRoute.route('/delete/:id').get(function (req, res) {
	User.findByIdAndRemove({
		_id: req.params.id
	}, function (err, user) {
		if (err) res.json(err);
		else res.json(req.params.id);
	});
});

UserRoute.route('/update/').get(function (req, res) {
	var user = JSON.parse(req.query.user)
	User.findByIdAndUpdate({
		_id: user._id
	}, {
		$set: {
           status : true 
		}
	}, {
		new: true
	}, function (err, user) {
		if (err) res.json(err);
		else res.json( user._id);
	});
});


module.exports = UserRoute;
