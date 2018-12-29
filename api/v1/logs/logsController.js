var Logs = require("./logsModel.js");
var {ObjectID} = require("mongodb");


exports.addLogs = (req, res)=>{
	//details of the loan. 
/*	console.log("where is my data");
	console.log(req.data.loanType);
	console.log(req.data);*/
var body ="loan amount "+req.data.amount+" on "+req.data.date+" loanstatus "+req.data.loanStatus+" Money paid "+req.data.paid+" balance "+req.data.balance+" due date "+req.data.dueDate;
	log = new Logs({
			title: req.data.title,
			body:body,
			month: req.data.dueDate,
			loanType: req.data.loanType,
			_loanId: req.data._id,
			_userId: req.data._userId,
			_adminId: req.data._adminId
	});
	
	log.save().then((log)=>{
		if (!log) {
			return res.status(404).send("Unable to add to logs");
		}
		res.status(200).send(log);
		/*console.log("logs "+log);*/
	}).catch((e)=>{
		res.status(404).send("error Unable to add to logs");
	});
	/*console.log(data);*/
}


exports.getAllLogs = (req, res)=>{
	Logs.find().then((logs)=>{
		if (!logs) {
			return res.status(404).send("No logs found");
		}
		res.status(200).send(logs);
	}).catch((e)=>{
		res.status(404).send("Unable to find log");
	});
}

exports.getUserLogs = (req, res)=>{
	var _userId = req.params.id;
	Logs.find({_userId}).then((logs)=>{
		if (!logs) {
			return res.status(404).send("No logs for this user found");
		}
		res.status(200).send(logs);
	}).catch((e)=>{
		res.status(404).send("No logs")
	});
}


exports.getEachLoanLogsForUsers = (req, res)=>{
	var _userId = req.params.id;
	var _loanId = req.params.loan;
/*	console.log(_userId, _loanId);*/
	Logs.find({_userId, _loanId}).then((logs)=>{
		if (!logs) {
			return res.status(404).send("No logs for this loan found"); 
		}
		res.status(200).send(logs);
	}).catch((e)=>{
		res.status(404).send("");
	});
}