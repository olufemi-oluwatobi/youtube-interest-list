import express from "express";
import auth from "../../middlewares/auth";
import { create } from "./controller";

const listRouter = express.Router({ mergeParams: true });

listRouter.route("/").post(auth, create);

export default listRouter;
