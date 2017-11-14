import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './popBox.scss'

class popComponent extends Component {
	constructor(props) {
        super(props);
    }
	componentDidMount(){

	}

	render(){
		return (
			<div className="pop-box">
				{this.props.text}进入Together chat
			</div>
		)
	}
}
export default popComponent;   