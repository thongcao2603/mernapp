import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
import initWebRoute from "./routes";
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();
initWebRoute(app);
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
