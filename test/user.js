const mongoose = require("mongoose");
const User = require("../app/db/models/user");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const request = require("supertest");
const expect = require("chai").expect;
const sinon = require("sinon");

const chaiJsonEqual = require("chai-json-equal");

chai.use(chaiJsonEqual);

chai.use(chaiHttp);

const admin = {
  email: "admin@admin.com",
  username: "admin",
  password: "admin",
  firstName: "Admin",
  lastName: "Adminowski",
  address: "Adminstr. 93, 45548 Horovod",
  birthday: "12.03.1996",
  status: "admin"
};

const member = {
  email: "1@member.com",
  username: "member",
  password: "member",
  "profile.firstName": "Member",
  "profile.lastName": "Memberowski",
  "profile.address": "Memberstr. 93, 45548 Horovod",
  "profile.birthday": "12.03.1996",
  status: "member"
};

const member2 = {
  email: "2@member.com",
  username: "member2",
  password: "member2",
  "profile.firstName": "Member",
  "profile.lastName": "Memberowski-Memberski",
  "profile.address": "Memberstr. 94, 45548 Horovod",
  "profile.birthday": "12.03.1996",
  status: "member"
};

const guest = {
  email: "1@guest.com",
  username: "guest",
  password: "guest",
  "profile.firstName": "Guest",
  "profile.lastName": "Guestowski",
  "profile.address": "Gueststr. 93, 45548 Horovod",
  "profile.birthday": "12.03.1996",
  status: "guest"
};

var adminToken = "";
var member1Token = "";
var member2Token = "";
var guestToken = "";

const new_user = {
  email: "1@guest.com",
  username: "new",
  password: "new",
  "profile.firstName": "New",
  "profile.lastName": "New",
  "profile.address": "Gueststr. 93, 45548 Horovod",
  "profile.birthday": "12.03.1996",
  status: "member"
};

const new_user2 = {
  email: "1@guest.com",
  username: "new2",
  password: "new2",
  "profile.firstName": "New",
  "profile.lastName": "New",
  "profile.address": "Gueststr. 93, 45548 Horovod",
  "profile.birthday": "12.03.1996",
  status: "member"
};

const new_users = [new_user, new_user2];

describe("Users", () => {
  before(done => {
    // delete users
    User.deleteMany({}, () => {
      // recreate all users
      User.insertMany([member, member2, guest], () => {});
    });

    request(server)
      .post("/api/auth/signup")
      .send(admin)
      .then(res => {
        done();
      });
  });

  beforeEach(done => {
    request(server)
      .post("/api/auth/login")
      .send({
        username: admin.username,
        password: admin.password
      })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property("token");
        adminToken = `Bearer ${res.body.token}`;
        done();
      });
  });

  describe("/GET users", () => {
    it("should GET all users. Admin only", done => {
      chai
        .request(server)
        .get("/api/users")
        .set("authorization", adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          User.find({}, (err, users) => {
            res.body["users"].length.should.be.eql(users.length);
            done();
          });
        });
    });
  });

  describe("/GET user", () => {
    it("should GET user details", done => {
      User.findOne({
        username: member.username
      }).then(user => {
        chai
          .request(server)
          .get("/api/users/" + user._id)
          .set("authorization", adminToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            expect(res.body).to.have.property("profile");
            done();
          });
      });
    });
  });

  describe("/GET user without authorized token", () => {
    it("should return 401", done => {
      User.findOne({
        username: member.username
      }).then(user => {
        chai
          .request(server)
          .get("/api/users/" + user._id)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  });

  describe("/POST users", () => {
    it("should POST new users", done => {
      chai
        .request(server)
        .post("/api/users")
        .send(new_users)
        .set("authorization", adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
