const request = require("supertest");
const app = require('../../app');
const expect = require('chai').expect
const userHelpers = require("../helpers/user");
const db = require("../../models/");
const { User } = db;


describe("GET/ me", () => {

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

  describe("As authenticated user", () => {
    let user = [];

    beforeEach(done => {
      request(app)
        .get("/me")
        .set("Authorization", `Bearer: ${token}`)
        .then(data => {
          user = data;
          done();
        });
    });

    it("Responds with OK", () => {
      expect(user.status).eq(200)
    })

    it("Should return user info", () => {
      expect(user.body.firstName).eq('John')
      expect(user.body.lastName).eq('Doe')
      expect(user.body.email).eq('johndoe@mail.com')
    })

  })

  describe("As guest", () => {

     let user = [];

     beforeEach(done => {
      request(app)
        .get("/me")
        .then(data => {
          user = data;
          done();
        });
    });
    
    it("Returns unauthorized", () => {
      expect(user.status).eq(401)
    })

  })

})