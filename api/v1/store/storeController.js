const Stores = require("./storeModel.js");
var {ObjectID} = require("mongodb");



exports.addStoreLoan = (req, res, next) =>{
	var _userId = req.params.id;

	if (!ObjectID.isValid(_userId)) {
		return res.status(404).send("ObjectID not found");
	}
	var store = new Stores({
			title: req.body.title,
			amount: req.body.amount,
			date: new Date,
			loanStatus: "oweing",
			balance: req.body.amount,
			paid: 0,
			_productId: req.body.productId,
			dueDate: req.body.dueDate,
			_adminId: req.admin._id,
			_userId: _userId,
	});

	store.save().then((data)=>{
		if (!store) {
			return res.status(404).send("unable to add to store loan");
		}
		/*res.status(200).send(data);*/
		req.data = data;
		req.data.loanType = "storeLoan";
		next();

	}).catch((e)=>{
		res.status(404).send("unable to add Store loan");
	});
}


exports.getStoreLoans = (req, res) =>{
	var _userId = req.params.id;
	if (!ObjectID.isValid(_userId)) {
		return res.status(404).send("ObjectID not found");
	}

	Stores.find({_userId}).then((stores)=>{
		if (!Stores) {
			return res.status(404).send("unable to find load");	
		}
		res.status(200).send(stores);
	}).catch((e)=>{
		res.status(404).send("Stores not found");
	});
}


exports.getMyStoreLoans = (req, res) =>{
	var _userId = req.user._id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("ObjectID not found");
	}

	Stores.findOne({_userId}).then((stores)=>{
		if (!stores) {
			return res.status(404).send("unable to find  stores");	
		}
		res.status(200).send(stores);
	}).catch((e)=>{
		res.status(404).send("Stores not found");
	});
}


exports.updateStoreLoans = (req, res, next)=>{
		var id = req.params.id;
		var loanStatus; 
		var paid = req.body.paid;
		

		/*fetching Stores with the same user, if the Store amount is equal to the paid amount and the 
		Store status is equal to paid(paid means the user has paid all the amount 
		for this particulaar Store) then deduct the borrowed amount with the paid amount.*/

		Stores.findById(id).then((store)=>{

			//get the total Store paid back.
			var newPayment = store.paid + paid;

			if (store.amount === store.paid && store.loanStatus === "paid" || newPayment > store.amount  ) {
				return res.status(404).send("Either this user already Paid for this Store or you are entering an amount greated than the Store balance");
			}

			//remove the newPayment from the Store to get the balance. 

			var balance = store.amount - newPayment;
			//if the amount the user is new Payment is equal to the borrowed amount, update the Store status to paid else update to owing.

			if (store.amount === newPayment) {
				loanStatus ="paid";	
			}else{
				 loanStatus = "owing";
			}
						
		// save the new paid amount, owing  amount and status.

			Stores.findByIdAndUpdate(id, {$set:{balance: balance, loanStatus:loanStatus, paid:newPayment}}, {new:true}).then((data)=>{
				if (!data) {
					return res.status(404).send("unable to update Store");
				}
				/*res.status(200).send(data);*/
				req.data = data
				req.data.loanType = "storeLoan";
				next();
		});

		}).catch((e)=>{
			res.status(404).send("unable to update");
		}); 
	}		




