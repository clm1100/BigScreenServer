var ws = require('nodejs-websocket');
var server = ws.createServer(function (socket) {
    // 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
    socket.on('text', function (str) {
        // 在控制台输出前端传来的消息　　
        console.log(str);
        //向前端回复消息
        // socket.sendText(str);

        server.connections.forEach((conn) => {
            conn.sendText(str)  //sendText 服务端发送给客户端方法
        })
    });

    socket.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    socket.on("error", function (code, reason) {
        console.log("Connection error")
    })
})

server.listen(8000);