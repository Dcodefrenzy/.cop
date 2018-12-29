const mongoose = require("mongoose");



loanSchema = mongoose.Schema({

	title: {
		type: String,
		required: true,
		trim: true,
		minlenght: 1,
	},
	amount: {
		type: Number,
		required: true,
		trim: true,
		minlenght: 1,
	},
	date: {
		type: String,
		required: true,
	},
	loanStatus: {
		type: String,
		required:true,
	},
	paid: {
		type:Number,
		required:true,
		trim:true,
		minlenght:1,
	},
	balance: {
		type:Number,
		required:true,
		minlenght:1,
		trim:true,
	},
	dueDate: {
		type: String,
		required: true,
		trim: true,
	},
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		trim: true
	},
	_adminId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		trim: true
	},
})

var Loan = mongoose.model('loans', loanSchema);
module.exports = Loan; 