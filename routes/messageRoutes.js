const express=require('express');
const {protect} =require('../middleware/authMiddleware');
const {sendMessage,allMessages}=require('../controllers/MessageControllers')
const router=express.Router();

router.route('/:chatId').get(protect,allMessages);
router.route("/").post(protect, sendMessage);


module.exports=router;