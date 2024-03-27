import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

//port
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    //listen
    app.listen(PORT, () => {
      console.log(`server is running on port ` + process.env.PORT + " 🚀");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export default app;
