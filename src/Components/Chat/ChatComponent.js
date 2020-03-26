import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export class ChatComponent extends Component {
	constructor() {
		super();

		this.state = {
			displayName: localStorage.getItem('DISPLAY_NAME'),
			photoURL: localStorage.getItem('PHOTO_URL'),
			uid: localStorage.getItem('ID'),
			message: '',
			messages: [
				{
					userName: '',
					body: ''
				}
			]
		};
	}

	componentDidMount() {
		axios.get('/messages').then(res => {
			res.data.forEach(element => {
				console.log(element);
				const message = {
					userName: element.userName,
					body: element.body
				};
				this.setState({
					messages: [...this.state.messages, message]
				});
			});
		});
	}

	render() {
		const messages = this.state.messages;
		return (
			<div>
				<Typography variant='h5'>{this.state.displayName}</Typography>
				<img src={this.state.photoURL} alt='user' />

				{messages.map((value, index) => (
					<div key={index}>
						<Typography variant='h4'>{value.body}</Typography>
						<Typography value='subtitle'>
							{value.userName}
						</Typography>
					</div>
				))}
			</div>
		);
	}
}

export default withRouter(ChatComponent);
