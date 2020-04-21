import React, { Component } from 'react';
import './Message.css';
import { Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';

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
				) : type === 'image' ? (
					<img className='body' src={body} alt='media' />
				) : (
					<div className='body'>
						<ReactPlayer
							url={body}
							width='500px'
							height='500px'
							controls={true}
						/>
					</div>
				)}

				<Typography value='subtitle2'>{userName}</Typography>
			</div>
		);
	}
}

export default Message;
