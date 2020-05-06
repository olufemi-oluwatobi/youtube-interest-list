import express from "express";
import { register, index, generateUrl } from "./controller";

const userRouter = express.Router({ mergeParams: true });

userRouter.route("/generate_url").post(generateUrl);
userRouter.route("/register").get(register);
userRouter.route("/").get(index);

export default userRouter;
