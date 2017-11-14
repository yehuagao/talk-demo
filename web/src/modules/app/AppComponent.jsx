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
            onlineCount:0,
            quitName:'',
            popMsg:''
        }
    }

    componentDidMount(){
    
        this.refs.quitBtn.disabled = false;
        var box = '';

        //接受退出信息
        socket.on('logout', function(data){
            this.setState({popMsg:''})
            console.log('退出信息',data)
            if(data.userName != 'admin'){
                this.setState({quitName: data.userName});
                this.setState({onlineCount: data.onlineCount});
                this.setState({popMsg: <Popbox text={data.userName + '退出'}/>})
            }
        }.bind(this))

        //接受登录信息
        socket.on('login', function(data){
            this.setState({popMsg:''})
            if(data){
                this.setState({nameText: data.currenData.userName});
                this.setState({onlineCount: data.onlineCount}); 
                this.setState({popMsg: <Popbox text={data.currenData.userName + '加入'}/>})
            }
            console.log('登录信息',data)
            
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

            this.refs.showMsg.scrollTo(0, this.refs.showMsg.scrollHeight);
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
        
        this.setCookie('currentUser', this.refs.name.value);
        this.setState({currenName:this.getCookie('currentUser')})
        this.refs.logBtn.disabled = true;
        this.refs.quitBtn.disabled = false;
        console.log(this.state.currenName)
    }

    quit(){
        console.log('退出')
        this.refs.logBtn.disabled = false;
        this.refs.quitBtn.disabled = true;

        socket.emit('logout', {userName:this.state.currenName});
    }

    sendMsg(){
        socket.emit('message',{userName:this.state.currenName, content:this.refs.msg.value})
        this.refs.msg.value = '';
        this.refs.msg.focus();
    }

    enterMsg(e){
        var char = e.which || e.keyCode;
        if(char == 13){
            this.sendMsg();
            e.preventDefault()
        }
        
    }

    enterName(e){
        var char = e.which || e.keyCode;
        if(char == 13){
            this.sendName();
            e.preventDefault()
        }
        
    }

    render() {
        return (
        	   <div className="appmain">
                    {this.state.popMsg}
                    <div style={{overflow:'hidden'}}><h1>Together chat</h1> <span>在线人数：{this.state.onlineCount}</span>
                        <span style={{float:'right'}}>当前登录为：{this.state.currenName}</span>
                    </div>
                    <ul className="showMsg" ref="showMsg"></ul>
                    
                    <div className="inputBox">
                        <input type="text" className="form-control input-name"  placeholder="请输入你的昵称！" ref="name" onKeyDown={this.enterName.bind(this)} />
                        <button type="submit" className="btn btn-default log-btn" ref="logBtn" onClick={this.sendName.bind(this)}>登录</button>
                        <button type="submit" className="btn btn-default" ref="quitBtn" onClick={this.quit.bind(this)} >退出</button>
                    </div>

                    <textarea className="form-control" rows="3" ref="msg" onKeyDown={this.enterMsg.bind(this)}></textarea>
                    <button type="submit" className="btn btn-success" onClick={this.sendMsg.bind(this)}>send</button>
                    {this.props.children}
               </div>  		
        )
    }
}

export default AppComponent