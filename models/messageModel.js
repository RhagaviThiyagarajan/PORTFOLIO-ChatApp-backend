const mongoose = require("mongoose");

const messagemodel = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatAppUser",
  },

  content: {
    type: String,
    trim: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatAppChat",
  },
},{
    timestamps:true,
});


const Message=mongoose.model('chatAppMessage',messagemodel);


module.exports=Message;