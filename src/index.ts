import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let AllUsers: User[] = [];

wss.on("connection", function (socket) {
  socket.on("message", (message) => {
    //@ts-ignore
    let parsedMessage = JSON.parse(message.toString());
    if (parsedMessage.type == "join") {
      AllUsers.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
      console.log(
        `User joined room "${parsedMessage.payload.roomId}". Total users: ${AllUsers.length}`,
      );
    }
    if (parsedMessage.type == "chat") {
      //roomTypeofInCoReqSocket
      let currRoomType = AllUsers.find((x) => socket == x.socket)?.room;

      for (let i = 0; i < AllUsers.length; i++) {
        if (AllUsers[i]?.room == currRoomType) {
          AllUsers[i]?.socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
