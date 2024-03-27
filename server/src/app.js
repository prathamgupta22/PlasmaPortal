import express from "express";
import morgan from "morgan";
import cors from "cors";

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//ROUTES IMPORT
import testRouter from "./routes/test.routes.js";
import authRouter from "./routes/auth.routes.js";

//ROUTES DECLARE
app.get("/", (req, res) => {
  res.status(200).json({
    message: `welcome to plasma portal app`,
  });
});
app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRouter);

export { app };
