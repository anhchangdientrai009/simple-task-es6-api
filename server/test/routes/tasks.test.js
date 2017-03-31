import suppertest from "supertest";
import httpStatus from "http-status";
import chai, { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import config from "../../../config/env"
import app from "../../../index";
import clearDbHelper from "../../helpers/clearDb";
import User from "../../models/user";
import Task from "../../models/task";
require("sinon-mongoose");
require("sinon-as-promised");

describe("## Tasks API Tests", () => {

  let sandbox, user, token;
  let request = suppertest(app);

  before((done) => {
      User.create({
        username: "testuser",
        password: "testuser"
      }).then((u) => {
        user = u;
        token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtDuration });
        done();
      })
  });

  beforeEach((done) => {
      clearDbHelper.clearDatabase(() => {
        sandbox = sinon.sandbox.create();
        done();
      });
  });

  afterEach((done) => {
      sandbox.restore();
      done();
  });

  describe("### GET /tasks", () => {

  });

  describe("### GET /tasks/:taskId", () => {

  });

  describe("### POST /tasks", () => {
      it("should return the created task successfully", (done) => {
        
        request
          .post("/api/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({
            user: user._id,
            description: "this is a test task"
          })
          .expect(httpStatus.OK)
          .end((error, res) => {
            expect(res.body.user).to.equal(user._id.toString());
            expect(res.body.description).to.equal("this is a test task");
            expect(res.body._id).to.exist;
            done();
          });
      });

      it("should return Internal Server Error when mongoose fails to save task", (done) => {
        const createStub = sandbox.stub(Task, "create");
        createStub.rejects({});
        request
          .post("/api/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({
            user: user._id,
            description: "this is a test task"
          })
          .expect(httpStatus.INTERNAL_SERVER_ERROR)
          .end(() => done());
      });

      it("should return Bad Request when missing user", (done) => {
        request
          .post("/api/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({
            description: "this is a test task"
          })
          .expect(httpStatus.BAD_REQUEST)
          .end(() => done());
      });
  });

  describe("### PUT /tasks/:taskId", () => {

  });

  describe("### DELETE /tasks/:taskId", () => {

  });

});