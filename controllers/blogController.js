const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

const getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user")
    // console.log(blogs)
    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blogs Founds",
      });
    }

    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All blogs list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error,
    });
  }
};
const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "plase provide all fields",
      });
    }

    const existingUser = await userModel.findById(user);
    // console.log(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false, 
        message: "Unable to fing user",
      });
    }

    const newBlog = new blogModel({ title, description, image,user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(200).send({
      success: true,
      message: "blogs created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Blogs",
      error,
    });
  }
};

const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { titile, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "blogs updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While updating Blogs",
      error,
    });
  }
};
const getBlogsByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blogg = await blogModel.findById(id);
    if (!blogg) {
      return res.status(400).send({
        success: false,
        message: "Blog not find by this id",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Fetched single blogs ",
      blogg,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While geting Blogs",
      error,
    });
  }
};
const deleteBlogController = async (req, res) => {
  try {
  const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
  console.log(blog)
  await blog.user.blogs.pull(blog)
  await blog.user.save()
   
    return res.status(200).send({
      success: true,
      message: "blog deleted ",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While deleting Blogs",
      error,
    });
  }
};


const userBlogController = async(req,res)=>{
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found by this id",
      });
    }

    return res.status(200).send({
      success: true,
      message: "user  blogs ",
      userBlog,
    });

    
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user Blogs",
      error,
    });
  }
}

module.exports = {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogsByIdController,
  deleteBlogController,
  userBlogController,
};
