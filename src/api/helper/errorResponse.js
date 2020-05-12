const errorResponse = (error, res) => {
  const err = JSON.stringify(error, ["message", "arguments", "type", "name"]);
  return res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .json({ success: false, data: JSON.parse(err) });
};
export default errorResponse;
