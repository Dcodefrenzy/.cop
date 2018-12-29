const express = require("express");
const controller = require("./usersController.js");
const auth = require("../admin/adminController.js");
const router = express.Router();


router.route("/register")
	.post(auth.adminAuthenticate, controller.adduser)

router.route("/")
	.get(auth.adminAuthenticate, controller.viewusers)

router.route("/user/:1d")
	.get(auth.adminAuthenticate, controller.getuser)

router.route("/login")
	.post(controller.userLogin)

router.route("/:id")
	.patch(controller.userAuthenticate, controller.updateuser)
	.delete(auth.masterAdminAuthenticate, controller.deleteuser)

router.route("/status/:id")
	.patch(auth.adminAuthenticate, controller.retireUsers)


/*router.route("/forgetpassword")
	 .post(controller.retrivePassword)*/

/*router.route("/forgetpassword/:token")
	.patch(controller.forgetpassword)
*/


module.exports = router;