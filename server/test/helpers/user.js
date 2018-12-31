const app = require('../../app');
const request = require("supertest");
const db = require("../../models/");
const bcrypt = require('bcrypt');
const { User } = db;

const createUserAndLogin = () => {
  let user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@mail.com',
    password: bcrypt.hashSync('password', 10)
  }

  return User.create(user).then(savedUser => {
    return request(app)
      .post("/login")
      .send({
        email: user.email,
        password: 'password'
      })
      .then(response => {
        return {
          token: response.body.token
        }
      })
  })
}


module.exports = {
  getJwt: createUserAndLogin
}