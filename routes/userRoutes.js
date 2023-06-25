const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

//router object

const router = express.Router();

//GET ALL USERS || GET
router.get("/all-users", getAllUsers);

//CRETE USER || pOST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

module.exports = router;
