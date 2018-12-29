const mongoose = require("mongoose");


logSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim:true,
		minlength:1,
	},
	body:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
	},
	month:{
		type:String,
		required:true,
		trim:true,
	},
	loanType: {
		type:String,
		required:true,
	},
	_loanId:{
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		trim:true,
	},
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		trim:true,
	},
	_adminId: {
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		trim:true,
	},
});

var Logs = mongoose.model('logs', logSchema);
module.exports = Logs