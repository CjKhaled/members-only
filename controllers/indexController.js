const validation = require("../auth/validation");
const db = require("../db/queries");
const hash = require("../auth/hash");

function getSignUp(req, res) {
  res.render("sign-up", { values: {} });
}

const postSignUp = [
  validation.validateFormInput,
  async (req, res, next) => {
    const errors = validation.validationResult(req);

    // form submission invalid
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("sign-up", { errors: errors.array(), values: req.body });
    }

    // inserting new user
    try {
      const hashedPassword = await hash.hashPassword(req.body.password);
      await db.insertUser(
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        hashedPassword
      );
      res.send("User added.");
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  getSignUp,
  postSignUp,
};
