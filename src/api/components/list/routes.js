import express from "express";
import { create } from "./controller";

const listRouter = express.Router({ mergeParams: true });

listRouter.route("/").post(create);

export default listRouter;
