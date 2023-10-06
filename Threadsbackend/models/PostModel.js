const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  text: {
    type: String,
    maxLength: 500,
  },
  img: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User', // Reference to the User model
    default: [],
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      userProfilePic: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  ],
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
