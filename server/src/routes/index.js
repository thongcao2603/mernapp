import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";
import productRoute from "./productRoute";
const initWebRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/category", categoryRoute);
  app.use("/api/v1/product", productRoute);
};

export default initWebRoute;
