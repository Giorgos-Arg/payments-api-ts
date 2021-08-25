//During the test the env variable is set to test
process.env.NODE_ENV = "test";
import chai, { expect, assert } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import userService from "../../src/services/userService";
import chaiAsPromised from "chai-as-promised";
import chaiDateTime from "chai-datetime";
chai.use(chaiAsPromised);
chai.use(chaiDateTime);

describe("=== Users Unit Tests ===", () => {
  describe("Test the signup method", () => {
    it("should spy the signup method", async () => {
      let spy = sinon.spy(userService, "signUp");
      await userService.signUp("username123", "password123");
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith("username123", "password123")).to.be.true;
    });
  });

  describe("Test the authenticate method", () => {
    it("should spy the authenticate method", async () => {
      let spy = sinon.spy(userService, "authenticate");
      await userService.authenticate("username123", "password123");
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith("username123", "password123")).to.be.true;
    });

    it("should test the authenticate method (success)", async () => {
      let { authToken, expiresIn } = await userService.authenticate(
        "username123",
        "password123"
      );
      expect(authToken).to.be.a.string;
      assert.afterOrEqualTime(expiresIn, new Date());
      let maxExpiryDate = new Date();
      maxExpiryDate.setMinutes(maxExpiryDate.getMinutes() + 20);
      assert.beforeTime(expiresIn, maxExpiryDate);
    });
    it("should test the authenticate method (failure)", async () => {
      expect(userService.authenticate("username123567", "password123")).to
        .eventually.be.rejected;
    });
  });
});
