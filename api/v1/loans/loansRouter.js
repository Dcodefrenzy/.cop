const express = require("express");
var router = express.Router();

var controller = require("./loansController");
const adminAuth = require("../admin/adminController.js");
const userAuth = require("../users/usersController.js");
const logs = require("../logs/logsController.js");


router.route("/borrow/:id")
	.post(adminAuth.adminAuthenticate, controller.addLoan, logs.addLogs);


router.route("/:id")
	.get(adminAuth.adminAuthenticate, controller.getLoans)

router.route("/user")
	.get(userAuth.userAuthenticate, controller.getMyLoans)

router.route("/pay/:id")
	.patch(adminAuth.adminAuthenticate, controller.updateLoan, logs.addLogs)



	module.exports = router;