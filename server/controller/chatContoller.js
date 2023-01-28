const Chat =   require('../model/ChatSchema');
const Message =   require('../model/MessagesSchema');
 module.exports = {
    createChat:async (req, res) => {
        const newChat = new Chat({
          members: [req.body.senderId, req.body.receiverId],
        });
        try {
          await newChat.save();
          res.status(201).json({message:"Chat Created"});
        } catch (error) {
          res.status(422).json({message:"Chat Not Created"});
        }
    },
    findChat:async (req, res) => {
        try {
          const chat = await Chat.findOne({
            members: { $all: [req.body.firstId, req.body.secondId] },
          });
          res.status(201).send(chat)
        } catch (error) {
          res.status(422).json(error)
        }
      },
    sendMessage:async (req, res) => {
        const newMessage = new Message({
          chatId: req.body.chatId,
          senderId: req.body.senderId,
          text: req.body.text,
        });
        try {
          await newMessage.save();
          res.status(201).json({message:"Message Sent"});
        } catch (error) {
          res.status(422).json({message:"Message Not Sent"});
        }
    },
    getMessages:async (req, res) => {
        try {
          const messages = await Message.find({ chatId: req.body.chatId },{__v:0,chatId:0});
          res.status(201).json(messages);
        } catch (error) {
          res.status(422).json(error);
        }
      }
 };