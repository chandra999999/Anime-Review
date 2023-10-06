const express=require("express")
const router=express.Router();
 const {createPost,getPosts, deletePost,likeunlikeposts}=require('../controllers/PostControllers');
const { protectRoute } = require("../middlewares/protectRoute");
router.post('/create',protectRoute,createPost);
router.get('/:id',protectRoute,getPosts);

router.delete('/:id',protectRoute,deletePost);
router.post('/likeunlike/:id',protectRoute,likeunlikeposts);
 module.exports=router;