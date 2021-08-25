//During the test the env variable is set to test
process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import app from "../../app";

const expect = chai.expect;
chai.use(chaiHttp);

let token: string;

describe("=== Users Integration Tests ===", () => {
  describe("POST /signup", () => {
    it("should register user on POST /signup", async () => {
      let res = await chai.request(app).post("/v1/signup").send({
        username: "tester@gmail.com",
        password: "tester",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("message");
    });
  });

  describe("POST /authenticate", () => {
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
});
