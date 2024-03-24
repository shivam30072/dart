const User = require("../../model/userModel");

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    return res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = user.createJwt();

    return res.status(200).json({
      success: true,
      message: "User logged in",
      data: { user, token },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
