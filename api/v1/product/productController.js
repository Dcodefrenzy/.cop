const Product = require("./productModel.js");
const {ObjectID} = require("mongodb");




exports.addProduct = (req, res)=>{
	product = new Product({
			name: req.body.name,
			date: new Date,
			_adminId: req.admin._id,
	});
	product.save().then((product)=>{
		if (!product) {
			return res.status(404).send("Unable to add product");
		}

		res.status(200).send(product);
	}).catch((e)=>{
		res.status(404).send("Unable to add");
	});
}


exports.getProducts = (req, res)=>{
	Product.find().then((products)=>{
		if (!product) {
			return res.status(404).send("No products found");
		}
		res.status(200).send(products);
	}).catch((e)=>{
		res.status(404).send("Products not found");
	});
}


exports.updateProduct = (req, res)=>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("ObjectID is not valid");
	}
	var product = req.body.name;

	Product.findByIdAndUpdate(id, {$set: {name:product}}, {new: true}).then((product)=>{
		if (!product) {
			return res.status(404).send("Unable to update product");
		}
		res.status(200).send(product);
	}).catch((e)=>{
		res.status(404).send("Unable to update product");
	});
}