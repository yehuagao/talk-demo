var express = require('express');
var router = require('./router/main.js')
console.log('服务器开启成功')
router.main(express);


var http = require('http').Server(express)
var io = require('socket.io')(http);
var userArray = [];
var currentId = 0;
io.on('connection', function(socket){
    socket.name = 'admin'
    var onlineUsers = {};
    console.log('新用户连接');
    //监听新用户加入
    socket.on('login', function(obj){
        //保存用户标识
        socket.name = obj.userName;
        
        if(userArray.length == 0) {
            currentId = 0;
            onlineUsers.userId = 1;
            onlineUsers.userName = obj.userName;
            userArray.push(onlineUsers);
        }else{
            userArray.forEach(function(item, idx){
                if(item.userName != obj.userName){
                    if(idx+1 == userArray.length){
                        onlineUsers.userId = userArray.length + 1;
                        onlineUsers.userName = obj.userName;
                        userArray.push(onlineUsers);
                        currentId = userArray.length - 1;
                        console.log(7777777777)
                    }
                }
            })
        }
        console.log('id',currentId)
        //向所有用户客户端广播
        io.emit('login', {onlineCount: userArray.length, currenData: userArray[currentId]})
        console.log(userArray)
        console.log('current',userArray[currentId])
    })

    //监听客户端退出事件
    socket.on('logout', function(obj){
        deal(obj.userName)
    })

    socket.on('disconnect', function(){
        deal(socket.name)
    })

    function deal(matchName){
    //遍历数组，进行处理
        userArray.forEach(function(item, index){
            if(item.userName == matchName){
                userArray.splice(index, 1);
            }
        })
        io.emit('logout', {onlineCount: userArray.length, userName: socket.name});
        
        console.log(matchName,'退出')
    }

    //监听用户发布信息
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.userName + '信息：' + obj.content);
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});