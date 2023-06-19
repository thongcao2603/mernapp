import authRoute from "./authRoute";

const initWebRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
};

export default initWebRoute;
