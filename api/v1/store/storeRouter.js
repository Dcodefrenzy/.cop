const express = require("express");
var router = express.Router();
var controller = require("./storeController.js");
const adminAuth = require("../admin/adminController.js");
const userAuth = require("../users/usersController.js");
const logs = require("../logs/logsController.js");



router.route("/borrow/:id")
	.post(adminAuth.adminAuthenticate, controller.addStoreLoan, logs.addLogs)

router.route("/:id")
	.get(adminAuth.adminAuthenticate, controller.getStoreLoans)


router.route("/user")
	.get(userAuth.userAuthenticate, controller.getMyStoreLoans)


router.route("/pay/:id")
	.patch(adminAuth.adminAuthenticate, controller.updateStoreLoans, logs.addLogs)

module.exports = router;