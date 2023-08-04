import messageModel from "./dao/models/messages.model.js";

export default (io) => {
  io.on("connection", (socket) => {
    const getMessages = async () => {
      const messages = await messageModel.find();

     socket.emit("server:messages", messages);
     
     socket.on("authenticated", (user) => {
          socket.broadcast.emit("newUser", user);
        });   
    };

    getMessages();

    // recibo el nuevo mensaje y lo guardo en la base de datos
    socket.on("client:newMessage", async (data) => {
      const newMessage = new messageModel(data);

      const result = await newMessage.save();

      io.emit("server:newMessage", result);
    });
  });
};
