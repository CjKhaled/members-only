const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { LOCALCONNECTSTRING } = process.env;

const SQL = `
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(255),
firstname VARCHAR(255),
lastname VARCHAR(255),
password VARCHAR(255),
memberstatus VARCHAR(255),
CONSTRAINT unique_user UNIQUE (username)
);

CREATE TABLE messages (
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(255),
text TEXT,
added TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
  console.log("populating...");
  const client = new Client({
    connectionString: LOCALCONNECTSTRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
