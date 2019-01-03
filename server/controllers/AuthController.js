const db = require("../models/");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const boom = require("boom");

const { User }  = db;

async function login (req, res) {

  let { email, password } = req.body

  let user = await User.findOne({
    where: {
      email
    }
  })
  
  if (!user) throw boom.unauthorized("Wrong email");

  let passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) throw boom.unauthorized("Wrong password");

  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res
    .status(200)
    .json({
    token,
    message: 'User logged in'
  })
    
}

async function register(req, res) {

  let { email, password, firstName, lastName } = req.body

  let hasUser = await User.findOne({
    where: {
      email
    }
  })

  if (hasUser) return res.status(422).send({message: 'User with that email already exists'})

  let result = await User.create({
    email,
    password: bcrypt.hashSync(password, 10),
    firstName,
    lastName
  })

  if (!result) return res.status(422).send({message:'Creation failed'})

  return res
  .status(200)
  .json({
    message: 'User registered'
  })

}

async function me(req, res) {

  const {id} = req.user

  const user = await User.findOne({where: {id}})

  if (!user) throw boom.notFound('User is not found')

  return  res
  .status(200)
  .json(user)
}

async function users(req, res) {

    const users = await User.findAll()
    
    if (!users) throw boom.notFound('Users is not found')
    
    return res
    .status(200)
    .json(users)
}



module.exports = {
  login,
  register,
  users,
  me
}