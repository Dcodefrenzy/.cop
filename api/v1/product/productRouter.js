const express = require("express");
var router = express.Router();
const controller = require("./productController.js");
const auth =  require("../admin/adminController.js");


router.route("/store")
	.post(auth.adminAuthenticate, controller.addProduct);

router.route("/")
	.get(auth.adminAuthenticate, controller.getProducts);

router.route("/update/:id")
	.patch(auth.adminAuthenticate, controller.updateProduct);


module.exports = router;

