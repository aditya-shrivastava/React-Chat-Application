import React, { Component } from 'react';
import {
	Typography,
	CircularProgress,
	Button,
	Icon,
	TextField
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './ChatComponent.css';
import Message from '../Message/Message';

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
					body: '',
					senderId: ''
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
						body: element.body,
						senderId: element.uid
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

	handleClick = e => {
		e.preventDefault();
		localStorage.removeItem('ID');
		localStorage.removeItem('DISPLAY_NAME');
		localStorage.removeItem('PHOTO_URL');
		localStorage.removeItem('TOKEN');
		this.props.history.push('/');
	};

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
					<div className='title'>
						<Icon style={{ fontSize: 40 }}>whatshot</Icon>
						<Typography variant='h3'>Chat Room</Typography>
					</div>
					<div className='chatboard'>
						<div className='userList'>
							<Typography
								style={{ textAlign: 'center' }}
								variant='h4'
							>
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
								<Message
									senderId={value.senderId}
									userName={value.userName}
									uid={this.state.uid}
									body={value.body}
									key={index}
								/>
							))}
							<div className='input'>
								<TextField
									className='textInput'
									variant='outlined'
								></TextField>
								<Button
									className='btn'
									variant='contained'
									color='primary'
								>
									Image
								</Button>
								<Button
									variant='contained'
									color='secondary'
									startIcon={
										<Icon style={{ fontSize: 30 }}>
											send
										</Icon>
									}
									className='btn'
								>
									Send
								</Button>
							</div>
						</div>
						<div className='profile'>
							<img src={this.state.photoURL} alt='user' />
							<Typography className='username' variant='h6'>
								{this.state.displayName}
							</Typography>
							<Button
								variant='contained'
								color='secondary'
								onClick={this.handleClick}
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default withRouter(ChatComponent);
