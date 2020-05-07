import express from "express";
import { register, index, generateUrl, signin } from "./controller";

const userRouter = express.Router({ mergeParams: true });

userRouter.route("/generate_url").post(generateUrl);
userRouter.route("/register").get(register);
userRouter.route("/login").get(signin);
userRouter.route("/").get(index);

export default userRouter;
