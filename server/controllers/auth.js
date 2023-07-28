import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../errors.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT);

    const { password, ...userData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userData);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(errorHandler(404, "User not found!"));

    const isUser = await bcrypt.compare(req.body.password, user.password);
    if (!isUser) return next(errorHandler(404, "Wrong Password!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...userData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userData);
  } catch (err) {
    next(err);
  }
};
