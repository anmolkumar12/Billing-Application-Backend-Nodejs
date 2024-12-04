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

const createUser = async (email, username, password, role) => {
  // Check if any of the parameters are undefined or null
  if (!email || !username || !password || !role) {
    throw new Error("Email, username, role and password are required");
  }

  // Execute the SQL query
  const [result] = await db.execute(
    "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)",
    [email, username, password, role]
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
