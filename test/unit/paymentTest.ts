//During the test the env variable is set to test
process.env.NODE_ENV = "test";
import chai, { expect, assert } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import paymentService from "../../src/services/paymentService";
import chaiAsPromised from "chai-as-promised";
import Payment, { IPayment } from "../../src/db/models/payment";
chai.use(chaiAsPromised);

describe("=== Payments Unit Tests ===", () => {
  let paymentId: string;

  afterEach(function () {
    sinon.restore();
  });

  describe("Test the createPayment method", () => {
    it("should spy the createPayment method", async () => {
      let spy = sinon.spy(paymentService, "createPayment");
      await paymentService.createPayment({
        payeeId: "fc1941f3-7912-4b3d-8fdb-dcb9733aa992",
        payerId: "0499274e-9325-43b1-9cff-57c957e9a337",
        paymentSystem: "Stripe",
        paymentMethod: "Visa",
        amount: 12.34,
        currency: "EUR",
        comment: "Stripe payment with visa",
      });
      expect(spy.calledOnce).to.be.true;
    });
    it("should test the createPayment method results", async () => {
      let payment: IPayment = await paymentService.createPayment({
        payeeId: "fc1941f3-7912-4b3d-8fdb-dcb9733aa992",
        payerId: "0499274e-9325-43b1-9cff-57c957e9a337",
        paymentSystem: "Stripe",
        paymentMethod: "Visa",
        amount: 12.34,
        currency: "EUR",
        comment: "Stripe payment with visa",
      });
      expect(payment).to.be.an("object");
      expect(payment).to.have.property("id");
      paymentId = payment.id;
    });
  });

  describe("Test the listPayments method", () => {
    it("should spy the listPayments method", async () => {
      let spy = sinon.spy(paymentService, "listPayments");
      await paymentService.listPayments();
      expect(spy.calledOnce).to.be.true;
    });
    it("should test the listPayments method results", async () => {
      let payments: IPayment[] = await paymentService.listPayments();
      expect(payments).to.be.an("array");
      expect(payments.length).to.be.above(0);
      expect(payments[0]).to.have.property("id");
    });
  });

  describe("Test the getPayment method", () => {
    it("should spy the getPayment method", async () => {
      let spy = sinon.spy(paymentService, "getPayment");
      await paymentService.getPayment(paymentId);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly(paymentId)).to.be.true;
    });
    it("should test the getPayment method results", async () => {
      let payment: IPayment = await paymentService.getPayment(paymentId);
      expect(payment).to.be.an("object");
      expect(payment).to.have.property("id");
    });
  });

  describe("Test the updateStatus method", () => {
    it("should spy the updateStatus method", async () => {
      let spy = sinon.spy(paymentService, "updateStatus");
      let payment: IPayment | null = await paymentService.updateStatus(
        paymentId,
        "approved"
      );
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly(paymentId, "approved")).to.be.true;
      expect(payment!.status).to.be.equal("approved");
    });
    it("should test the updateStatus method results (error)", () => {
      var mock = sinon.mock(paymentService);
      var expectation = mock.expects("getPayment");
      expectation.exactly(1);
      expectation.withArgs(paymentId);
      expect(paymentService.updateStatus(paymentId, "approved")).to.eventually
        .be.rejected;
      mock.verify;
    });
  });
});
