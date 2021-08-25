//During the test the env variable is set to test
process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import app from "../../app";
import db from "../../src/db/index";

const expect = chai.expect;
chai.use(chaiHttp);

let token: string;

before((done) => {
  db.connect()
    .then(() => done())
    .catch((err) => done(err));
});

describe("=== Payments Integration Tests ===", () => {
  describe("Register and login user", () => {
    it("should register user on POST /signup", async () => {
      let res = await chai.request(app).post("/v1/signup").send({
        username: "tester@gmail.com",
        password: "tester",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("message");
    });

    it("should login user on POST /authenticate", async () => {
      let res = await chai.request(app).post("/v1/authenticate").send({
        username: "tester@gmail.com",
        password: "tester",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("authToken");
      token = res.body.authToken;
    });
  });

  let id: string;
  describe("POST /payments", () => {
    it("should create a payment", async () => {
      let res = await chai
        .request(app)
        .post("/v1/payments")
        .set("Authorization", token)
        .send({
          payeeId: "1234",
          payerId: "5678",
          paymentSystem: "test system",
          paymentMethod: "test method",
          amount: 1234,
          currency: "EUR",
          comment: "test comment",
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("payeeId");
      id = res.body.id;
    });
  });

  describe("GET /payment/:id", () => {
    it("should get a payment with a specific id", async () => {
      let res = await chai
        .request(app)
        .get("/v1/payment/" + id)
        .set("Authorization", token);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("payeeId");
    });
  });

  describe("GET /payments", () => {
    it("should get all the payments", async () => {
      let res = await chai
        .request(app)
        .get("/v1/payments")
        .set("Authorization", token);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("payeeId");
      expect(res.body.length).to.be.above(0);
    });
  });

  describe("PUT /payments/:id/approve", () => {
    it('should update the status of a Payment to "Approved"', async () => {
      let res = await chai
        .request(app)
        .put("/v1/payments/" + id + "/approve")
        .set("Authorization", token);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("payeeId");
      expect(res.body.status).to.be.equal("approved");
    });
  });

  describe("PUT /payments/:id/cancel", () => {
    it("should return error that approved payment cannot be cancelled", async () => {
      let res = await chai
        .request(app)
        .put("/v1/payments/" + id + "/cancel")
        .set("Authorization", token);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.have.property("code");
      expect(res.body.error).to.have.property("message");
      expect(res.body.error.code).to.be.equal("ERR_CANNOT_CANCEL");
    });
  });
});
