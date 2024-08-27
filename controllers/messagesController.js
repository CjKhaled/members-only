const authorize = require("../auth/authorization");
const validation = require("../auth/validation");
const db = require("../db/queries");

// show a different homepage based on authorization level
const getHomePage = [
  authorize.isLoggedIn,
  async (req, res) => {
    const messages = await db.getMessages();
    res.render("messages", {
      user: req.user,
      permission: req.user.memberstatus,
      messages: messages,
    });
  },
];

function getJoinClub(req, res) {
  res.render("join-club");
}

const postJoinClub = [
  validation.validateJoinFormInput,
  async (req, res, next) => {
    const errors = validation.validationResult(req);

    // form submission invalid
    if (!errors.isEmpty()) {
      return res.status(400).render("join-club", { errors: errors.array() });
    }
  },
];

module.exports = {
  getHomePage,
  getJoinClub,
  postJoinClub,
};
