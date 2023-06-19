import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/connectDB";
import initWebRoute from "./routes";
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
connectDB();
initWebRoute(app);
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
