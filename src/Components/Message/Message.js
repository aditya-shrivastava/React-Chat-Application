import React, { Component } from 'react';
import './Message.css';
import { Typography } from '@material-ui/core';

class Message extends Component {
	render() {
		let userName = this.props.userName;
		let type = this.props.type;
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
				{type === 'text' ? (
					<Typography className='body' variant='h6'>
						{body}
					</Typography>
				) : (
					<img className='body' src={body} alt='media' />
				)}

				<Typography value='subtitle2'>{userName}</Typography>
			</div>
		);
	}
}

export default Message;
