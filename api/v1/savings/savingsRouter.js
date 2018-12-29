const express = require("express");
var router = express.Router();
var controller = require("./savingsController.js");
const auth = require("../admin/adminController.js");



router.route("/deposit/:id")
	.post(auth.adminAuthenticate, controller.addSavings)

router.route("/:id")
	.get(auth.adminAuthenticate, controller.getUsersSavings)


module.exports = router;