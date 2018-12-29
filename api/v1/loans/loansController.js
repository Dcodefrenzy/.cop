const Loan = require("./loansModel.js");
var {ObjectID} = require("mongodb");



exports.addLoan = (req, res, next) =>{
	var _userId = req.params.id;

	if (!ObjectID.isValid(_userId)) {
		return res.status(404).send("ObjectID not found");
	}
	var loan = new Loan({
			title: req.body.title,
			amount: req.body.amount,
			date: new Date,
			loanStatus: "oweing",
			balance: req.body.amount,
			paid: 0,
			dueDate: req.body.dueDate,
			_adminId: req.admin._id,
			_userId: _userId,
	});

	loan.save().then((data)=>{
		if (!data) {
			return res.status(404).send("unable to add load");
		}
		/*res.status(200).send(data);*/
		req.data = data;
		req.data.loanType = "Loan";
		next();

	}).catch((e)=>{
		res.status(404).send("unable to add loan");
	});
}


exports.getLoans = (req, res) =>{
	var _userId = req.params.id;
	if (!ObjectID.isValid(_userId)) {
		return res.status(404).send("ObjectID not found");
	}

	Loan.find({_userId}).then((loans)=>{
		if (!loans) {
			return res.status(404).send("unable to find load");	
		}
		res.status(200).send(loans);
	}).catch((e)=>{
		res.status(404).send("Loans not found");
	});
}


exports.getMyLoans = (req, res) =>{
	var _userId = req.user._id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("ObjectID not found");
	}

	Loan.findOne({_userId}).then((loans)=>{
		if (!loans) {
			return res.status(404).send("unable to find load");	
		}
		res.status(200).send(loans);
	}).catch((e)=>{
		res.status(404).send("Loans not found");
	});
}



exports.updateLoan = (req, res, next)=>{
		var id = req.params.id;
		var loanStatus; 
		var paid = req.body.paid;
	
		if (!ObjectID.isValid(id)) {
		return res.status(404).send("ObjectID not found");
		}

		/*fetching loans with the same user, if the loan amount is equal to the paid amount and the 
		loan status is equal to paid(paid means the user has paid all the amount 
		for this particulaar loan) then deduct the borrowed amount with the paid amount.*/
		Loan.findById(id).then((loan)=>{
			if (!loan) {
				return res.status(404).send("Id do not exist");
			}
			//get the total loan paid back.
			var newPayment = loan.paid + paid;
			if (loan.amount === loan.paid && loan.loanStatus === "paid" || newPayment > loan.amount ) {
				return res.status(404).send("Either this user already Paid for this loan or you are entering an amount greated than the loan balance");
			}

			//remove the newPayment from the loan to get the balance. 
			var balance = loan.amount - newPayment;
			//if the amount the user is new Payment is equal to the borrowed amount, update the loan status to paid else update to owing.

			if (loan.amount === newPayment) {
				loanStatus ="paid";	
			}else{
				 loanStatus = "owing";
			}
						
		// save the new paid amount, owing  amount and status.
			Loan.findByIdAndUpdate(id, {$set:{balance: balance, loanStatus:loanStatus, paid:newPayment}}, {new:true}).then((data)=>{
				if (!data) {
					return res.status(404).send("unable to update loan");
				}
				/*res.status(200).send(data);*/
				req.data = data;
				req.data.loanType = "Loan";
				next();
		});

		}).catch((e)=>{
			res.status(404).send("unable to update");
		}); 
}		




