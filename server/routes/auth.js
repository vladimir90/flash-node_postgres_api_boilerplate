"use strict";

const express = require("express")
const router = express.Router()

const loginValidation = require("../middlewares/validators/authLogin.js");
const registerValidation = require("../middlewares/validators/authRegister.js");
const isAuthenticated = require("../middlewares/auth.js");

const {
  auth
} = require('../controllers')


/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

 /**
 * @swagger
 * responses:
 *   Login:
 *     properties:
 *       token:
 *         type: string
 *       user: 
 *         type: object
 */

 /**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: 
 *      - auth
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         description: User that should be autheticated
 *         in: body
 *         required: true
 *         schema: 
 *            type: object
 *            $ref: '#/definitions/Login'
  *     responses:
 *       200:
 *         description: Success
 *         schema: 
 *           type: object
 *           $ref: '#/responses/Login'
 */
router.post('/login',loginValidation, auth.login)
router.post('/register',registerValidation, auth.register)
router.get('/users', isAuthenticated, auth.users)
router.get('/me', isAuthenticated, auth.me)

module.exports = router