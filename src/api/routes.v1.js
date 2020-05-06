import userRouter from "./components/users/routes";

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      version: "1.0.0",
      name: "Youtube interest list core service",
    });
  });

  app.use("/user", userRouter);
};
