import errorHandler from "../errors.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(403, "You can only update your own account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({ userId: req.params.id });
      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(403, "You can only update your own account!"));
  }
};

export const followUser = async (req, res, next) => {
  try {
    // get user that logged in user follows
    const user = await User.findById(req.params.id);
    // get logged in user
    const loggedUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: {
          followers: req.body.id,
        },
      });

      await loggedUser.updateOne({
        $push: {
          following: req.params.id,
        },
      });
    } else {
      res.status(403).json("You are already following this user!");
    }
    res.status(200).json("You are now following user!");
  } catch (err) {
    next(err);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    // get user that logged in user follows
    const user = await User.findById(req.params.id);
    // get logged in user
    const loggedUser = await User.findById(req.body.id);

    if (loggedUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pullAll: {
          followers: req.body.id,
        },
      });

      await loggedUser.updateOne({
        $pull: {
          following: req.params.id,
        },
      });
    } else {
      res.status(403).json("You are not following this user!");
    }
    res.status(200).json("You are not following user anymore!");
  } catch (err) {
    next(err);
  }
};
