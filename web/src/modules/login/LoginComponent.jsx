import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as loginActions from './LoginAction'
import {Router, Route, Link, hashHistory, browserHistory} from 'react-router';


class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    loginHandler() {
        this.props.login(this.refs.username.value, this.refs.password.value)
    }
    render() {
        console.log('success',this);
        return (
             <div className="login app">
                <ul>
                    <li className="logo">LOGO</li>
                    <li><input type="text" className = 'loginInput' ref="username" placeholder="输入账号"/></li>
                    <li><input type="password" className = 'loginInput' ref="password" placeholder="输入密码"/></li>
                    <li><Link to='/'><button type="info" onClick={this.loginHandler.bind(this)}>登录</button></Link></li>
                </ul>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

const {mapStateToProps} = state => ({
    data:state.login
})
export default connect(mapStateToProps, loginActions)(LoginComponent)