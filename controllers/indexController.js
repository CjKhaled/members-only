const validation = require("../auth/validation");
const db = require("../db/queries");
const hash = require("../auth/hash");
const passport = require("../auth/passport");

function getSignUp(req, res) {
  res.render("sign-up", { values: {} });
}

function getHomePage(req, res) {
  res.render("homepage", { user: req.user });
}

function getLogin(req, res) {
  res.render("log-in", { values: {} });
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

      // login user after signing up
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res
            .status(400)
            .render("log-in", { errors: [{ msg: info.message }] });
        }

        req.login(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.redirect("/messages");
        });
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  },
];

const postLogin = [
  validation.validateLoginFormInput,
  async (req, res, next) => {
    const errors = validation.validationResult(req);

    // form submission invalid
    if (!errors.isEmpty()) {
      return res.status(400).render("log-in", { errors: errors.array() });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      // authentication failed
      if (!user) {
        return res
          .status(400)
          .render("log-in", { errors: [{ msg: info.message }] });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        // successful login
        return res.redirect("/messages");
      });
    })(req, res, next); // needed for custom authenticate
  },
];

module.exports = {
  getSignUp,
  getLogin,
  getHomePage,
  postSignUp,
  postLogin,
};
