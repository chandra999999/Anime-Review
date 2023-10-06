const User = require("../models/userModel");
const Post = require("../models/PostModel");


const getPosts= async (req,res)=>{
       
const post=await Post.findById(req.params.id);
if(!post){
    return res.status(404).json({message:"Post found"}) 
}
res.status(200).json({post});
}

const likeunlikeposts = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const userLikedPost = post.likes.includes(userId);
  
      if (userLikedPost) {
        // User has already liked the post, so remove the like
        await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
        return res.status(200).json({ message: "Post unliked" });
      } else {
        // User hasn't liked the post, so add the like
        await Post.findByIdAndUpdate(id, { $push: { likes: userId } });
        return res.status(200).json({ message: "Post liked" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  















const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the post with 'postId' exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to delete the post (e.g., the user who created it)
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to delete this post" });
    }

    // Delete the post from the database
    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};












const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    // Check if 'postedBy' and 'text' are provided
    if (!postedBy || !text) {
      return res.status(400).json({ message: "Please provide 'postedBy' and 'text'" });
    }

    // Check if the user with 'postedBy' ID exists
    const user = await User.findById(postedBy);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new post
    const newPost = new Post({ postedBy, text, img });

    // Save the new post to the database
    await newPost.save();

    return res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {likeunlikeposts, createPost ,getPosts,deletePost};
