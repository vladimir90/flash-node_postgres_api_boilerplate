const request = require("supertest");
const app = require('../../app');
const expect = require('chai').expect
const userHelpers = require("../helpers/user");
const db = require("../../models/");
const { User } = db;

describe("POST /login", () => {

  let userData = "";
  let token = "";

  beforeEach(done => {
    Promise.all([
      User.destroy({
        where: {},
        truncate: true
      })
    ]).then(() => {
      userHelpers.getJwt().then(response => {
        token = response.token
        done();
      });
    });
  });

  describe("With valid credentials", () => {
  
    beforeEach(done => {
      request(app)
        .post("/login")
        .send({email:'johndoe@mail.com', password:'password'})
        .then(data => {
          userData = data;
          done();
        });
    });

    it("Responds with OK", done => {
      expect(userData.status).eq(200);
      done();
    });

    it("Returns token", done => {
      expect(userData.body.token).eq(token)
      expect(userData.status).eq(200);
      done();
    })

  })

  describe("With wrong credentials", () => {
  
    it("Returns unauthorized status", done => {
      request(app)
        .post("/login")
        .send({
          email: 'wrong@gmail.com',
          password: 'password'
        })
        .expect(401)
        .end(done);
    });

  })

})