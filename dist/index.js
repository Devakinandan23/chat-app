import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
let UserCount = 0;
let AllUsers = [];
wss.on("connection", function (socket) {
    AllUsers.push(socket);
    console.log("Conneted User #", ++UserCount);
    socket.on("message", (message) => {
        for (let i = 0; i < AllUsers.length; i++) {
            const s = AllUsers[i];
            if (!s) {
                continue;
            }
            if (message.toString() == "hi") {
                s.send("how are you?");
                continue;
            }
            s.send(message.toString());
        }
    });
});
//# sourceMappingURL=index.js.map