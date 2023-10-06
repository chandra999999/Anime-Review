const mongoose=require("mongoose")

const  connectDb=async()=>{
  try{
  const conn=await mongoose.connect("mongodb+srv://sai:sai@cluster0.bprkuqj.mongodb.net/")
  console.log("connected");   

  }catch(err){
     console.log("mongoerror" +{err});
  }


}
module.exports=connectDb;