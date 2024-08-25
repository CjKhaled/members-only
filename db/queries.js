const pool = require("./pool");

async function insertUser(username, firstname, lastname, password) {
  try {
    await pool.query(
      "INSERT INTO users (username, firstname, lastname, password, memberstatus) VALUES ($1, $2, $3, $4, $5)",
      [username, firstname, lastname, password, "guest"]
    );
  } catch (err) {
    // disallow duplicate usernames
    if (err.code === "23505") {
      throw new Error("Username already exists");
    } else {
      throw err;
    }
  }
}

module.exports = {
  insertUser,
};
