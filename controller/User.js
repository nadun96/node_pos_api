const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// functions

const signup = async (req, res) => {
  const { name, email, password, fullname, role } = req.body;
  const userExist = await User.findOne({ name });
  if (userExist) {
    return res.status(400).json({ message: "User already exists", data: null });
  }
  try {
    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      fullname,
      role,
    });
    const savedUser = await user.save();

    res.status(201).json({ message: "User created", data: savedUser });
  } catch {
    res.status(500).json({ message: "Internal server error", data: null });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const userExist = await User.findOne({ name });

  if (!userExist) {
    return res.status(400).json({ message: "User does not exist", data: null });
  }

  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials", data: null });
  }

  const token = jwt.sign({ name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    message: "logged in",
    data: {
      token,
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        fullname: userExist.fullname,
        role: userExist.roles,
        isActive: userExist.isActive,
      },
    },
  });
};

module.exports = {
  signup,
  login,
};
