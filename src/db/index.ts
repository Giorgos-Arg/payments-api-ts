import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  if (mongoose.connection.readyState === 0) {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose.connect(process.env.DB_CONNECTION ?? "", mongooseOpts);
    mongoose.connection.on("error", (err: any) => {
      console.error(err);
    });
    mongoose.connection.on("connected", () => {
      console.log("DB started successfully");
    });
  }
}

function close() {
  return mongoose.disconnect();
}

export default { connect, close };
