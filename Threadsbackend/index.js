const express=require("express")
const app=express();
const cookieParser=require("cookie-parser")
const connectDb=require('./connectDb')
const postRoutes=require("./Routes/postRoutes.js")
const userRoutes=require("./Routes/userRoutes.js")
app.use(cookieParser());
app.use(express.json());

connectDb();




app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);


app.get('/',(req,res)=>{
    console.log("o");
    res.send("hellohjm");
})




app.listen(3000,()=>{
    console.log("running")
})