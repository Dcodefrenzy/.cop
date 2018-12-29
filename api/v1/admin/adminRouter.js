const express = require("express");
const controller = require("./adminController.js");
const auth = require("./adminAuth.js");
const router = express.Router();


router.route("/register")
	.post(controller.masterAdminAuthenticate, controller.addAdmin)

router.route("/login")
	.post(controller.adminLogin)

router.route("/")
	.get(controller.masterAdminAuthenticate, controller.viewAdmins)

router.route("/:id")
	.patch(controller.adminAuthenticate, controller.updateAdmin)
	.delete(controller.masterAdminAuthenticate, controller.deleteAdmin)

/*router.route("/forgetpassword")
	 .post(controller.retrivePassword)*/
	 
/*router.route("/forgetpassword/:token")
	.patch(controller.forgetpassword)*/



module.exports = router;