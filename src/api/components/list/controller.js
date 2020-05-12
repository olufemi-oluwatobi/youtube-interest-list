import statusCode from "http-status-codes";
import jwt from "jwt-decode";
import { performYouTubeSearch } from "../../../services/googleServices";
import { createList } from "./services";
import { findUserByGoogleId } from "../users/services";

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
    const videos = await performYouTubeSearch(req.body.title);
    console.log(typeof videos);
    const entry = { ...req.body, userId: _id, videos };
    const list = await createList(entry);
    if (!list) {
      res
        .status(statusCode.BAD_REQUEST)
        .json({ success: false, data: "failed to create list" });
    }
    res.status(statusCode.CREATED).json({ success: true, data: list });
  } catch (error) {
    console.log(error);
  }
};
