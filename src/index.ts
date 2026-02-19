import {WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port: 8080});

interface User{
    socket: WebSocket,
    room: string
}

let AllUsers: User[] = [];

wss.on("connection",function(socket){
    socket.on("message", (message)=>{
        //@ts-ignore
        console.log("user has joined the chat",AllUsers.length+1);
        let parsedMessage = JSON.parse(message);
        if(parsedMessage.type == "join"){
            AllUsers.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type == "chat"){
            //roomTypeofInCoReqSocket
            let currRoomType = AllUsers.find(x => socket == x.socket)?.room;

            for(let i = 0; i < AllUsers.length; i++){
                if(AllUsers[i]?.room == currRoomType){
                    AllUsers[i]?.socket.send(parsedMessage.payload.message);
                }
            }
        }
    })
})