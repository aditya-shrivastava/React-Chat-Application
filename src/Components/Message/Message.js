import React, { Component } from 'react';
import './Message.css';
import { Typography } from '@material-ui/core';

class Message extends Component {
	constructor() {
		super();

		this.state = {
			flag: false
		};
	}

	render() {
		let userName = this.props.userName;
		let body = this.props.body;
		return (
			<div
				className='message'
				style={
					this.props.senderId === this.props.uid
						? { alignItems: 'flex-end' }
						: { alignItems: 'flex-start' }
				}
			>
				<Typography className='body' variant='h6'>
					{body}
				</Typography>
				<Typography value='subtitle2'>{userName}</Typography>
			</div>
		);
	}
}

export default Message;
