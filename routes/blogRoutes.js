const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogsByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

//router
const router = express.Router();

//routes

//GET || ALL BLOGS
router.get("/all-blog", getAllBlogController);

//POST || CREATE BLOG
router.post("/create-blog", createBlogController);

//PUT || UPDATE BLOG
router.put("/update-blog/:id", updateBlogController);

//GET || SINGLE BLOG DETAILS
router.get("/get-blog/:id", getBlogsByIdController);

//DELETE || DELETE BLOG
router.delete("/delete-blog/:id", deleteBlogController);


//GET || USER BLOG
router.get("/user-blog/:id", userBlogController);

module.exports = router;
