import statusCode from "http-status-codes";
import jwt from "jwt-decode";
import { performYouTubeSearch } from "../../../services/googleServices";
import { createList } from "./services";
import { findUserByGoogleId } from "../users/services";
import { findTokenByUserId } from "../auth/services";

export const create = async (req, res) => {
  try {
    const googleAuth = req.headers.authorization;
    const googleObj = jwt(googleAuth);
    const user = await findUserByGoogleId(googleObj.sub);
    if (!user) {
      res
        .send(statusCode.NOT_FOUND)
        .json({ success: false, data: "user doesn't exist" });
    }
    const { _id } = user;
    const token = await findTokenByUserId(_id);
    const entry = { ...req.body, userId: _id };
    const list = await createList(entry);
    if (!list) {
      res
        .status(statusCode.BAD_REQUEST)
        .json({ success: false, data: "failed to create list" });
    }
    const searchResult = await performYouTubeSearch(token, req.body.title);
    res.status(200).json({ data: searchResult });
  } catch (error) {
    console.log(error);
  }
};
