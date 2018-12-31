const request = require("supertest");
const app = require('../../app');
const expect = require('chai').expect
const userHelpers = require("../helpers/user");
const db = require("../../models/");
const { User } = db;

describe("POST /register", () => {

  beforeEach(done => {
    Promise.all([
      User.destroy({
        where: {
          password: 'password'
        },
        truncate: true
      })
    ])
    done();
  });

   describe("With valid credentials", () => {
     it("Should respond with ok", (done) => {
        request(app)
          .post("/register")
          .send({
            email: 'john@mail.com',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe'
          })
          .expect(200)
          .end(done)
     })
   })

   describe("With missing credentials", (done) => {
      it("Should respond with unprocessable entity", (done) => {
        request(app)
          .post("/register")
          .send({
            email: '',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe'
          })
          .expect(422)
          .end(done)
      })
   })
})