import express from "express";
import userRoutes from "./src/routes/userRoutes";
import paymentRoutes from "./src/routes/paymentRoutes";
import errorHandler from "./src/errors/errorHandler";
const app = express();
app.use(express.json());

// Register the routes
app.use("/v1", userRoutes);
app.use("/v1", paymentRoutes);
app.use(errorHandler);

export default app;
