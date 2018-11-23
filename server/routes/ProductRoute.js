 const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const ProductRoute = express.Router();
var cloudinary = require('cloudinary');
var Photo= require('../models/Photos');

var mongoose = require('mongoose');
const fs = require('fs');
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
	extended: true
}));
let fileStoredName = '';
// Require Post model <in our routes module
let Product = require('../models/Product');
// Defined store route
 

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads')
	} 
})
var upload = multer({
	storage: storage, 
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})

ProductRoute.route('/file')
	.post(upload.single('file'), function (req, res) {
 		cloudinary.config({ 
			cloud_name:"dch7oqmdq"  , 
			api_key: "937788765872274" , 
			api_secret:"0-wht9sQdVmLJ9TvCsr5EJjosag"  
		  });
	
		  cloudinary.uploader.upload(req.file.path, function(result) { 
 		  
			  var photo = new Photo();
				photo.name = req.body.name;
				photo.picture = result.url;
				  
			  photo.save(function(err, photos){
				if(err) 
				  res.send(err);
				res.json({ message: 'photographed place created.'});
				console.log("d",photos.picture);
				fileStoredName= photos.picture; 
			  }); })

	})
ProductRoute.route('/add').post(function (req, res) {
	var fileName = req.body.img.extension;
	req.body.img = fileStoredName;
	let product = new Product(req.body);
    
	product.save()
		.then(product => {
			res.status(200).json(product);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});
// Defined get data(index or listing)  
ProductRoute.route('/').get(function (req, res) {
	Product.find(function (err, products) {
		if (err) {
			console.log(err);
		} else {
			res.json(products);
		}
	});
});
ProductRoute.route('/find').get(function (req, res) {
  console.log('reeq') ;  
});

ProductRoute.put('/:id', function (req, res, next) {
	Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});
// Defined delete | remove | destroy route
ProductRoute.route('/delete/:id').get(function (req, res) {
	//Deleting image from folder when deleting product. 
	Product.findById(req.params.id, function (err, product) {}).then((res) => {
			console.log('ress', res.img);
			var path = res.img;
			fs.unlink(`public/uploads/${path}`, (err) => {
				if (err) throw err;
				console.log(' image  was deleted');
			});
		})
		.catch((err) => {
			console.log('error', err)
		})
	Product.findByIdAndRemove({
		_id: req.params.id
	}, function (err, product) {
		if (err) res.json(err);
		else res.json(req.params.id);
	});
});

ProductRoute.route('/update/').get(function (req, res) {
	var product = JSON.parse(req.query.product)
	Product.findByIdAndUpdate({
		_id: product.product._id
	}, {
		$set: {
			label: product.product.label,
			description: product.product.description, 
			color: product.product.color, 
			TVA: product.product.TVA, 
			quantity: product.product.quantity, 
			reduction:product.product.reduction, 
			pricettc: product.product.pricettc
		}
	}, {
		new: true
	}, function (err, product) {
		if (err) res.json(err);
		else res.json(product.product._id);
	});
});


module.exports = ProductRoute;
