const Saving = require("./savingsModel.js");
const {ObjectID} = require("mongodb");




exports.addSavings = (req, res) =>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("Object Id is not valid");
	}
	var Savings = new Saving({
			amount: req.body.amount,
			date:  new Date,
			_adminId: req.admin._id,
			_userId: id
	});

	Savings.save().then((Savings)=>{
		res.status(200).send(Savings);
	}).catch((e)=>{
		res.status(404).send("could not add");
	})
}

exports.getUsersSavings = (req, res) =>{
		var _userId = req.params.id;
		if (!ObjectID.isValid(_userId)) {
			return res.status(404).send("ObjectID not vaid");
		}

		Saving.findOne({_userId}).then((Savings)=>{
			if (!Savings) {
				return res.status(404).send(Savings);
			}
			res.status(200).send(Savings);

		}).catch((e)=>{
			res.status(404).send("Unable to find user");
		});
}


exports.getUsersSavingsByMonth = (req, res) =>{
	var _userId = req.params.id;
	if (!ObjectID.idValid(id)) {
		return res.status(404).send("ObjectID not vaid");
	}
			var date = req.body.date
			Saving.findOne({_userId, date}).then((Savings)=>{
			if (!Savings) {
				return res.status(404).send("Unable to Find savings for this month");
			}
			res.status(200).send(Savings);
		}).catch((e)=>{
				res.status(404).send("Unable to find Saving for this month");
	});
}