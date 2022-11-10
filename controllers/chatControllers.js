const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const accessChat = async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  //In MongoDB, Population is the process of replacing
  //the specified path in the document of one collection with the actual document from the other collection
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.body.userId } } },
      // { users: { $elemMatch: { $eq: req.body.userId } } },



      // { users: { $elemMatch: { $eq: req.user._id } } },
      // { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  console.log(req.body);
  // console.log(req.params);

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      // users: [req.user._id, userId],
      users: [userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
//@description
const fetchChats = asyncHandler(async (req, res) => {
  try {
    // Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    Chat.find({ users: { $elemMatch: { $eq: req.body._id } } })
      .populate("users", "-password")
      // .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);
  console.log(users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  //{
  // "name":"groupChat",
  //

  // users.push(req.user);
  console.log(users);
  // res.send(users);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      // groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      // .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  ).populate("users", "-password");
  // .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const addTOGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  ).populate("users", "-password");
  // .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addTOGroup,
  removeFromGroup,
};