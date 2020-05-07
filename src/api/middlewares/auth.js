import statusCode from "http-status-codes";
import { verifyToken } from "../../services/googleServices";
const authWhiteList = ["/user"];

module.exports = async (req, res, next) => {
  try {
    const { baseUrl, path } = req;
    const route = `${baseUrl}${path}`;
    const isWhiteListed = authWhiteList.includes(route);
    if (isWhiteListed) {
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(statusCode.UNAUTHORIZED).json({
          success: false,
          data: "you are not authorized to view this page",
        });
      }
      const userData = await verifyToken(token);
      if (userData) return next();
      return res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        data: "you are not authorized to view this page",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
