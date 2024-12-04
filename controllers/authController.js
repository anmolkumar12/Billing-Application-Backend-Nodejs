const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const {
  createUser,
  findUserByUsernameOrEmail,
  getUserByEmail,
  updateUserPassword,
} = require("../models/userModel");
const { use } = require("../routes/authRoutes");

const signup = async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, username, hashedPassword, role);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await findUserByUsernameOrEmail(identifier);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ token, name: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await updateUserPassword(email, hashedNewPassword);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log("errrrrr", err);
    res.status(500).json({ message: "Server error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await updateUserPassword(email, hashedNewPassword);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  changePassword,
  forgetPassword,
};
