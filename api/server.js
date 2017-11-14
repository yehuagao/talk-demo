var express = require('express');
var router = require('./router/main.js')
console.log('服务器开启成功')
router.main(express);


var http = require('http').Server(express)
var io = require('socket.io')(http);
var userArray = [];
var currentId = 0;
io.on('connection', function(socket){
    var onlineCount = 1;
    var onlineUsers = {};
    console.log('新用户连接');
    //监听新用户加入
    socket.on('login', function(obj){
        //保存用户标识
        socket.name = obj.userName;
        
        if(userArray.length == 0) {
            onlineUsers.userId = 1;
            onlineUsers.userName = obj.userName;
            userArray.push(onlineUsers);
        }else{
            userArray.forEach(function(item, idx){
                if(item.userName != obj.userName){
                    if(idx+1 == userArray.length){
                        onlineUsers.userId = userArray.length + 1;
                        onlineUsers.userName = obj.userName;
                        onlineCount = userArray.length;
                        userArray.push(onlineUsers);
                        currentId = idx + 1;
                        console.log(7777777777)
                    }
                }
            })
        }
        console.log(currentId)
        //向所有用户客户端广播
        io.emit('login', {onlineCount: onlineCount, currenData: userArray[currentId]})
        console.log(userArray)
        console.log('current',userArray[currentId])
    })

    socket.on('disconnect', function(){
        if(onlineUsers.hasOwnProperty(socket.name)){
            //退出用户的信息
            var obj = {userid:socket.name, userName:onlineUsers[socket.name]};

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount});
            console.log(obj.userName+'退出了');
        }
    })


    //监听用户发布信息
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.userName + '信息：' + obj.content);
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});