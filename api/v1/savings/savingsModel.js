const mongoose = require("mongoose");


SavingSchema = new mongoose.Schema({
		amount: {
			type: Number,
			required: true,
			minlength: 1,
		},
		date: {
			type: String,
			required: true,
		},
		_userId: {
			type: mongoose.Schema.Types.ObjectId, 
			required: true,
		},
		_adminId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
});



var Saving = mongoose.model("Saving", SavingSchema);
module.exports = Saving;