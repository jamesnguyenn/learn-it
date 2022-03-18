const express = require("express");

const router = express.Router();

const Post = require("../models/Posts");
const verifyToken = require("../middelware/auth");

//@route GET api/posts
//@desc get posts
//@access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userID }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

//@route POST api/posts
//@desc create a new post
//@access private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userID,
    });
    await newPost.save();

    res
      .status(200)
      .json({ success: true, message: "Happy Learning!", post: newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

//@route PUT api/posts
//@desc Update posts
//@access private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postUpdateCodition = { _id: req.params.id, user: req.userID };
    updatedPost = await Post.findOneAndUpdate(postUpdateCodition, updatedPost, {
      new: true,
    });
    //User not authorized to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found and user not authorized",
      });
    res.status(200).json({
      success: true,
      message: "Updated Successfully !!!",
      updatedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

//@route DELETE api/posts
//@desc Delete posts
//@access private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {
      _id: req.params.id,
      user: req.userID,
    };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);
    //User not authorized to update post or post not found
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found and user not authorized",
      });
    res.json({ success: true, post: deletePost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = router;
