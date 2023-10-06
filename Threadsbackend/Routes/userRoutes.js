const express =require("express")
const app=express();
const PostRouter=require("../Routes/postRoutes")
const router=express.Router();
const {signupuser,loginuser,logoutuser,followuser,updatecontroller}=require("../controllers/UserController")
const {protectRoute}=require('../middlewares/protectRoute')




router.post('/signup',signupuser);
router.post('/login',loginuser);
router.post('/logout',logoutuser);
router.post('/follow/:id',protectRoute,followuser)


router.post('/update/:id',protectRoute,updatecontroller)
router.get('/',(req,res)=>{
  res.send("Hello")
})




module.exports=router;