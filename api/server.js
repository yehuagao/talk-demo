var express = require('express');
var router = require('./router/main.js')
console.log('服务器开启成功')
router.main(express);


var http = require('http').Server(express)
var io = require('socket.io')(http);
var onlineUsers = {};
var onlineCount = 0;
var cout = 1;
var userArray = [];

io.on('connection', function(socket){
    var currentId = 0;
    console.log('用户连接');
    //console.log('socket1',socket)
    //监听新用户加入
    socket.on('login', function(obj){
        //保存用户标识
        socket.name = obj.userName;
        //console.log('socket2',socket)
        //检查在线列表
        if(!onlineUsers.hasOwnProperty(onlineUsers.userId)) {
            onlineUsers[userId] = cout;
            onlineCount++;
            userArray.push(onlineUsers)
        }else{
            userArray.forEach(function(item, idx){
                if(item.userId != obj.userId){
                    if(idx+1 == userArray.length){
                        userArray.push(obj);
                        onlineCount++;
                    }
                }else{
                    currentId = idx;
                }
            })
        }

        //向所有用户客户端广播
        io.emit('login', {onlineUsers: onlineUsers, onlineCount: onlineCount, user:obj, currenData: userArray[currentId]})
        console.log(obj.userName + '加入chat')
        console.log('在线用户',onlineUsers)
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
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
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