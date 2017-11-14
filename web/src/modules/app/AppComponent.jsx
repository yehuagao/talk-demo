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
            this.setState({nameText:data.user.userName});
            this.setState({onlineCount:data.onlineCount});
        }.bind(this))
        socket.on('message', function(data){
            // console.log(this.refs.showMsg)
            // console.log(data)
            var createspan = document.createElement('span');
            var createH6 = document.createElement('h6');
            var createLi = document.createElement('li');
            createH6.innerText = this.state.nameText + ':';
            createspan.className = 'spanSty';
            createspan.innerText = data.content;
            createLi.appendChild(createH6);
            createLi.appendChild(createspan);
            this.refs.showMsg.appendChild(createLi);
            this.refs.showMsg.appendChild('<br/>')
            if(data.userName == this.state.nameText){
                createLi.style.float= 'right';
            }else{
                createLi.style.float= 'left';
            }
        }.bind(this))
        // console.log('当前登录',this.state.nameText)
    }

    sendName(){
        socket.emit('login',{userName:this.refs.name.value})
        socket.on('connect',function(){
            // console.log('socket连接成功')
        })
        //socket.emit('message',{content:this.refs.name.value})
    }
    quit(){
        socket.emit('disconnect', function () {
            // console.log('you have been disconnected');
        });
    }
    sendMsg(){
        socket.emit('message',{userName:this.refs.name.value, content:this.refs.msg.value})
    }
    render() {
        return (
        	   <div className="appmain">
                    {this.state.nameText ? <Popbox text={this.state.nameText}/> : ''}
                    <div style={{overflow:'hidden'}}><h1>Together chat</h1> <span>在线人数：{this.state.onlineCount}</span>
                        <span style={{float:'right'}}>当前登录为：{this.state.nameText}</span>
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