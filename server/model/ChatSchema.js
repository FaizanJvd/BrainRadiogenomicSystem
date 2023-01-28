const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema(
    {
      members: {
        type: Array,
      },
    },
    {
      timestamps: true,
    }
  );
const chat_model = mongoose.model("chat",ChatSchema,"chats");
console.log('Chat schema Model build');
module.exports = chat_model;