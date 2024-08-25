const bycrpt = require("bcryptjs");

async function hashPassword(password) {
  try {
    const hashedPassword = await bycrpt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  hashPassword,
};
