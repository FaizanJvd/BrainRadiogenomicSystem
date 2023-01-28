const io = require('socket.io')(8800, {
    cors:{
        origin:"http://localhost:3000"
    }
})
let activeUsers = []
io.on("connection", (socket) => {

    socket.on("new-user-add", (newUserId) => {

      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      else{
          console.log("User already connected");
      }

    });
    socket.on("remove-user", (userId) => {
      activeUsers = activeUsers.filter((user) => user.userId !== userId);
      console.log("User Disconnected", activeUsers);
    });
    // socket.on("user-to-call",(data)=>{
    //   const { receiverId,callerSocket } = data;
    //   const user = activeUsers.find((user) => user.userId === receiverId);
    //   if (user) {
    //     io.to(callerSocket).emit("call", user.socketId);
    //   }
    //   else{
    //     io.to(callerSocket).emit("call", "User is not online");
    //   }
    // })
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      // socket.broadcast.emit("callEnded");
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });

    socket.on("callUser", ({ userToCall, signalData}) => {
      console.log(activeUsers);
        const user = activeUsers.find((user) => user.userId === userToCall);
        console.log("callUser", user);
        if (user) {
          io.to(user.socketId).emit("someOne-calling", { signal: signalData});
        }
    });
  
    socket.on("answerCall", (data) => {
      const { signal, to } = data;
      const user = activeUsers.find((user) => user.userId === to);
      if (user) {
        io.to(user.socketId).emit("callAccepted", signal);
      }
    });
    socket.on("endCall", (data) => {
      const { to } = data;
      console.log(to);
      const user = activeUsers.find((user) => user.userId === to);
      if (user) {
        io.to(user.socketId).emit("callEnded");
      }
    });
  });
 