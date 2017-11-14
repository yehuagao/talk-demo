import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, browserHistory} from 'react-router';
import Popbox from '../comComponent/popBox.jsx'
import './App.scss'

var socket = io.connect('ws://192.168.1.21:3000/');
    
class AppComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameText:'',
            currenName:'',
            onlineCount:0
        }
    }
    componentDidMount(){
        // console.log('props', this.props)
        // console.log('state', this.state)
        // console.log(this.setState)
        var box = '';
        //接受退出信息
        socket.on('logout', function(data){
            console.log(data)
            
        }.bind(this))
        //接受登录信息
        socket.on('login', function(data){
            console.log('登录信息',data)
            this.setState({nameText: data.currenData.userName});
            this.setState({onlineCount: data.onlineCount});
        }.bind(this))

        socket.on('message', function(data){
            
            var createspan = document.createElement('span');
            var createH6 = document.createElement('h6');
            var createDiv = document.createElement('div');
            var createLi = document.createElement('li');

            createH6.innerText = data.userName + ':';
            createspan.className = 'spanSty';
            createspan.innerText = data.content;

            if(data.userName == this.state.currenName){
                createDiv.style.float = 'right';
            }else{
                createDiv.style.float= 'left';
            }

            createDiv.appendChild(createH6);
            createDiv.appendChild(createspan);
            createLi.appendChild(createDiv);
            this.refs.showMsg.appendChild(createLi);
        }.bind(this))
        
    }
    setCookie(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    }
    sendName(){
        socket.emit('login',{userName:this.refs.name.value})
        socket.on('connect',function(){
            // console.log('socket连接成功')
        })
        //socket.emit('message',{content:this.refs.name.value})
        this.setCookie('currentUser', this.refs.name.value);
        this.setState({currenName:this.getCookie('currentUser')})
        console.log(this.state.currenName)
    }
    quit(){
        socket.emit('disconnect', function () {
            // console.log('you have been disconnected');
        });
    }
    sendMsg(){
        socket.emit('message',{userName:this.state.currenName, content:this.refs.msg.value})
    }
    render() {
        return (
        	   <div className="appmain">
                    {this.state.nameText ? <Popbox text={this.state.nameText}/> : ''}
                    <div style={{overflow:'hidden'}}><h1>Together chat</h1> <span>在线人数：{this.state.onlineCount}</span>
                        <span style={{float:'right'}}>当前登录为：{this.state.currenName}</span>
                    </div>
                    <ul className="showMsg" ref="showMsg"></ul>
                    
                    <div className="inputBox">
                        <input type="text" className="form-control input-name"  placeholder="请输入你的昵称！" ref="name"/>
                        <button type="submit" className="btn btn-default" onClick={this.sendName.bind(this)}>登录</button>
                        <button type="submit" className="btn btn-default" onClick={this.quit.bind(this)}>退出</button>
                    </div>
                    <textarea className="form-control" rows="3" ref="msg"></textarea>
                    <button type="submit" className="btn btn-default" onClick={this.sendMsg.bind(this)}>send</button>
                    {this.props.children}
               </div>  		
        )
    }
}

export default AppComponent