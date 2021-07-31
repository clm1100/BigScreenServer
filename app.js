const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');

app.use(express.static(path.join(__dirname,'static')))


app.get("/accept",(req,res)=>{

    let { name, number, result, playername} = req.query;
    let obj = { name, number, result ,playername}
    io.emit('broadcast', JSON.stringify(obj))
    res.send({
        success:true,
        code:200,
        data: obj
    });
})

io.on("connection", socket => {  // 客户端链接成功

    socket.on("link", msg => {  // 监听的频道必须和客户端监听的频道相同，等待消息
        console.log("客户端连接成功",msg);
        io.emit("link1", "链接成功");  // 向所有客户端发送信息
    });

    socket.on("link1", msg => {  // 监听的频道必须和客户端监听的频道相同，等待消息
       console.log("客户端向link1发送了信息")  // 向所有客户端发送信息
    });

    io.on("disconnect", _ => {  // 客户端断开链接
        console.log("断开")
    });

});

http.listen(8000, _ => {
    console.log("server running on 8000");
});