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
				{this.props.text}
			</div>
		)
	}
}
export default popComponent;   