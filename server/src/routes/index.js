import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";
const initWebRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/category", categoryRoute);
};

export default initWebRoute;
