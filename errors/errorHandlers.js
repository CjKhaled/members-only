function duplicateUser(err, req, res, next) {
  if (err.code === "23505") {
    res.status(400).render("sign-up", {
      errors: [{ msg: "Email already exists" }],
      values: req.body,
    });
  } else {
    next(err);
  }
}

module.exports = {
  duplicateUser,
};
