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

async function getUser(username, password) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

async function getUserFromID(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
}

async function getMessages() {
    try {
        const { rows } = await pool.query("SELECT firstname, lastname, title, text, added FROM messages INNER JOIN users ON messages.user_id = users.id")
        return rows
    } catch (err) {
        throw err;
    }
}

async function upgradeGuest(id) {
  try {
    await pool.query("UPDATE users SET memberstatus = 'member' WHERE id = $1", [id])
  } catch (err) {
    throw err;
  }
}



module.exports = {
  insertUser,
  getUser,
  getUserFromID,
  getMessages,
  upgradeGuest
};
