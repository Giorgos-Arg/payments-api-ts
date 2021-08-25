import CustomError from "./CustomError";

class UserError extends CustomError {
  static invalidCredentials() {
    return new CustomError(
      404,
      "ERR_INVALID_CREDENTIALS",
      "Invalid Credentials"
    );
  }
}

export default UserError;
