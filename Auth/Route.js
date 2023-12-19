const { Router } = require("express");
const router = Router();
const { register, login, update, deleteUser } = require("./Auth.js");
const { adminAuth } = require("../middleware/auht.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/delete-user").delete(adminAuth, deleteUser);

module.exports = router;