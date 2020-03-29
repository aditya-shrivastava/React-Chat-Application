import React, { Component } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './ChatComponent.css';

export class ChatComponent extends Component {
	constructor() {
		super();

		this.state = {
			uid: localStorage.getItem('ID'),
			token: localStorage.getItem('TOKEN'),
			displayName: localStorage.getItem('DISPLAY_NAME'),
			photoURL: localStorage.getItem('PHOTO_URL'),
			message: '',
			messages: [
				{
					userName: '',
					body: ''
				}
			],
			users: [
				{
					name: '',
					image: ''
				}
			],
			loading: true
		};
	}

	componentDidMount() {
		if (this.state.token === null) {
			this.props.history.push('/');
		} else {
			axios.get('/messages').then(res => {
				res.data.forEach(element => {
					const message = {
						userName: element.userName,
						body: element.body
					};
					this.setState({
						messages: [...this.state.messages, message]
					});
				});
			});
			axios.get('/users').then(res => {
				res.data.forEach(element => {
					const user = {
						name: element.name,
						image: element.photoURL
					};
					this.setState({
						users: [...this.state.users, user],
						loading: false
					});
				});
			});
		}
	}

	render() {
		let messages = this.state.messages;
		let users = this.state.users.filter(item => item.name !== '');
		if (this.state.loading) {
			return (
				<div className='loading'>
					<CircularProgress color='secondary' />
					<Typography variant='h4'>Loading...</Typography>
				</div>
			);
		} else {
			return (
				<div>
					<Typography className='title' variant='h3'>
						Chat Room
					</Typography>
					<div className='chatboard'>
						<div className='userList'>
							<Typography className='title' variant='h4'>
								Users
							</Typography>
							{users.map((value, index) => (
								<div className='user' key={index}>
									<img src={value.image} alt='user' />
									<Typography variant='h6'>
										{value.name}
									</Typography>
								</div>
							))}
						</div>
						<div className='messages'>
							{messages.map((value, index) => (
								<div key={index}>
									<Typography variant='h4'>
										{value.body}
									</Typography>
									<Typography value='subtitle'>
										{value.userName}
									</Typography>
								</div>
							))}
						</div>
						<div className='profile'>
							<img src={this.state.photoURL} alt='user' />
							<Typography className='username' variant='h4'>
								{this.state.displayName}
							</Typography>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default withRouter(ChatComponent);
