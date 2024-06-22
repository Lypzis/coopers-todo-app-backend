const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      const errorMsg =
        user.email === email
          ? "Email already exists!"
          : "Username already exists!";
      return res.status(400).json({ msg: errorMsg });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create a token for the registered user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Try to retrieve the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare the incoming password with the password of the user retrieved
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create a token for the logged-in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};
