const mongoose = require("mongoose");



ProductSchema = mongoose.Schema({
		name: {
			type:String,
			minlength: 1,
			trim: true,
			required: true,
			unique: true,
		},
		date:{
			type: String,
			required: true,
		},
		_adminId: {
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			trim:true
		},
});


var Product = mongoose.model("products", ProductSchema);
module.exports = Product;