const request = require("supertest");
const app = require('../../app');
const expect = require('chai').expect
const userHelpers = require("../helpers/user");
const db = require("../../models/");
const { User } = db;


describe("GET/ users", () => {
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

    let users = [];

    beforeEach(done => {
      request(app)
        .get("/users")
        .set("Authorization", `Bearer: ${token}`)
        .then(data => {
          users = data;
          done();
        });
    });

    it("Should return all users", () => {
        expect(users.status).eq(200)
    })

  })

  describe("As quest", () => {
    it("Returns unauthorized", done => {
      request(app)
        .get("/users")
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).eq('Token not provided')
          done();
        });
    });
  })

  describe("With wrong token", () => {
    it("Returns forbidden", done => {
      request(app)
        .get("/users")
        .set("Authorization", `Bearer: 12345`)
        .expect(403)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).eq('Invalid token')
          expect(res.body.error.name).eq('JsonWebTokenError')
          done();
        });
    });
  })

})