const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { genToken } = require('../utils/helpers/genToken');

const signupuser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hash
    });

    // Save the user to the database
    await newUser.save();

    if (newUser) {
    
       res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username
      });
    } else {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  } catch (err) {
    // Handle the error
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const loginuser= async(req,res)=>{
  const {username,password}=req.body;
  const user=await User.findOne({username})
   const ispassword= await bcrypt.compare(password,user?.password||"")
    if(ispassword){
       genToken(user._id,res);
       res.status(200).json({
         _id:user._id,
           name:user._id,
           email:user.email
       })
    }

}
const logoutuser= async(req,res)=>{
   res.cookie("jwt","",{maxAge:1});
   res.status(200).json({message:"succefsulyy logged out"});
}
const updatecontroller = async (req, res) => {
  const { name, email, username, password, profilepic, bio } = req.body;

userId=req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      user.password = hashpassword;
    }

    user.name = name || user.name;
    user.email = email || user.email; // Fix: Update email field correctly
    user.username = username || user.username;
    user.profilepic = profilepic || user.profilepic;
    user.bio = bio || user.bio;

    user = await user.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    // Handle any potential errors, e.g., database errors or validation errors.
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const followuser = async ( req , res)  => {
   console.log(req.body);
   const { id } = req.params;
   console.log(id);
   const userToModify = await User.findById(id);
   const currentUser = await User.findById(req.user._id);
 
   // Check if the user is trying to follow themselves
   if (id === req.user._id.toString()) {
     return res.status(400).json({ message: "You cannot follow yourself idiot" });
   }
 
   if (!userToModify) {
     return res.status(400).json({ message: "User not found" });
   }
 
   const isFollowing = currentUser.following.includes(id);
 
   if (isFollowing) {
     await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
     await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
     res.status(201).json({ message: "Unfollowed successfully" });
   } else {
     await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
     await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
     res.status(201).json({ message: "Followed successfully" });
   }
 };
 

 

























// const followuser=async (req,res)=>{
//    console.log(req.body);
//          const{id}=req.params;
//          const userTomodify=await User.findById(id);
//          const currentUser=await User.findById(req.user._id);
//          if(id===req.user._id)return res.status(400).json({message:"You cannot follow yourself idiot"})
//          if(!userTomodify)return res.status(400).json({message:"User not found"})
// const isFollowing=currentUser.following.includes(id);
// //current id is following some other id
// //if is following is true then we are gonna unfollow them
// // so delete the other id from current id following 
// //and delete the id from followers for other id
// //so current's following add that other id
// //for other id's followers array the current id will be added
//  if(isFollowing){
//       await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
//       await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
//       res.status(201).json({message:"followed succesfully"})
//  }else{
//    await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});
//       await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
//       res.status(201).json({message:"unfollowed succesfully"})
//  }

// }


module.exports = {followuser, signupuser,loginuser,logoutuser,followuser,updatecontroller };
