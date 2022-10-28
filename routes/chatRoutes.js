const express=require("express");
const { accessChat,fetchChats,createGroupChat,renameGroup,addTOGroup,removeFromGroup } = require("../controllers/chatControllers");
const router=express.Router();
const {protect} =require('../middleware/authMiddleware');


router.route('/').post(protect,accessChat);

router.route('/').get(protect,fetchChats);

router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addTOGroup);



module.exports= router;
