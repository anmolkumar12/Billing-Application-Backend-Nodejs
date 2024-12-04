const db = require("../config/db");

const getUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const updateUserPassword = async (email, hashedPassword) => {
  await db.execute("UPDATE users SET password = ? WHERE email = ?", [
    hashedPassword,
    email,
  ]);
};

const createUser = async (email, username, password) => {
  // Check if any of the parameters are undefined or null
  if (!email || !username || !password) {
    throw new Error("Email, username, and password are required");
  }

  // Execute the SQL query
  const [result] = await db.execute(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password]
  );
  
  return result;
};

const findUserByUsernameOrEmail = async (identifier) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [identifier, identifier]
  );
  return rows[0];
};

module.exports = {
  createUser,
  findUserByUsernameOrEmail,
  getUserByEmail,
  updateUserPassword,
};
