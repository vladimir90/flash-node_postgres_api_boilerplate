const express = require("express")
const router = express.Router()

const loginValidation = require("../middlewares/validators/authLogin.js");
const registerValidation = require("../middlewares/validators/authRegister.js");
const isAuthenticated = require("../middlewares/auth.js");

const {
  auth
} = require('../controllers')

router.post('/login',loginValidation, auth.login)
router.post('/register',registerValidation, auth.register)
router.get('/users', isAuthenticated, auth.users)
router.get('/me', isAuthenticated, auth.me)

module.exports = router