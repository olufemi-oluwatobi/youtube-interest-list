import statusCode from "http-status-codes";
import {
  urlGoogle,
  getGoogleAccountFromCode,
} from "../../../services/googleServices";
import { findUserByGoogleId, findUsers, createUser } from "./services";
import { updateToken, createAccessToken } from "../auth/services";

export const generateUrl = async (req, res) => {
  try {
    const { type } = req.query;
    const authUrl = urlGoogle(type);
    if (authUrl) {
      res.status(statusCode.OK).json({ success: true, data: authUrl });
    } else {
      res
        .status(statusCode.NOT_IMPLEMENTED)
        .json({ success: false, data: "failed to get auth url" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const signin = async (req, res) => {
  try {
    const { code } = req.query;
    const user = await getGoogleAccountFromCode(code);
    if (!user) {
      res
        .status(statusCode.BAD_REQUEST)
        .json({ success: true, data: "failed to get user" });
    }
    const { tokens } = user;
    delete user.tokens;
    const existingUser = await findUserByGoogleId(user.googleId);
    if (existingUser) {
      const accessToken = await updateToken({
        ...tokens,
        user_id: existingUser._id,
      });
      if (accessToken) {
        res
          .status(statusCode.OK)
          .json({ success: true, data: { ...user, accessToken: tokens } });
      } else {
        res
          .status(statusCode.FORBIDDEN)
          .json({ success: true, data: "failed to to signin" });
      }
    } else {
      res
        .status(statusCode.FORBIDDEN)
        .json({ success: true, data: "user doesnt exist" });
    }
  } catch (error) {
    const err = JSON.stringify(error, ["message", "arguments", "type", "name"]);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: JSON.parse(err) });
  }
};
export const register = async (req, res) => {
  try {
    const { code } = req.query;
    const user = await getGoogleAccountFromCode(code, "register");
    if (!user) {
      res
        .status(statusCode.BAD_REQUEST)
        .json({ success: true, data: "failed to register user" });
    }
    const { tokens } = user;
    delete user.tokens;
    const existingUser = await findUserByGoogleId(user.googleId);
    if (!existingUser) {
      const newUser = await createUser(user);
      if (newUser) {
        const accessToken = await createAccessToken({
          ...tokens,
          user_id: newUser._id,
        });
        if (accessToken) {
          res
            .status(statusCode.CREATED)
            .json({ success: true, data: { ...user, accessToken } });
        } else {
          res
            .status(statusCode.BAD_REQUEST)
            .json({ success: true, data: "failed to create token" });
        }
      }
      res
        .status(statusCode.BAD_REQUEST)
        .json({ success: true, data: "failed to create user" });
    }
    res
      .status(statusCode.BAD_REQUEST)
      .json({ success: true, data: "user already exists" });
  } catch (error) {
    const err = JSON.stringify(error, ["message", "arguments", "type", "name"]);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: JSON.parse(err) });
  }
};

export const index = async (req, res) => {
  try {
    const users = await findUsers({});
    res.status(statusCode.OK).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};
