module.exports = function(err, req, res, next) {
  if (err.isJoi) {
    const d = err.details.map(({ message, context }) => ({
      message: message.replace(/['"]zzz/g, ""),
      field: context.label
    }));
    return res
      .status(422)
      .json({ statusCode: 422, error: "Unprocessable Entity", message: d });
  }
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  return res.status(500).json({ message: "Something went wrong" });
}