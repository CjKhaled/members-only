const bycrpt = require("bcryptjs");

async function hashPassword(password) {
  try {
    const hashedPassword = await bycrpt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
}

async function compareHashes(givenPassword, storedPassword) {
  try {
    return bycrpt.compare(givenPassword, storedPassword);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  hashPassword,
  compareHashes,
};
