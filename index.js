const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const chats = require("./data/data.js");
const connectDB = require("./config/db.js");
dotenv.config();
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler}=require('./middleware/errorMiddlware');



//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO CHAT APP");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   // console.log(req.params.id);
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
