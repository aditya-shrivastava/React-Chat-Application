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
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

		// setInterval(() => {
		// this.getMessages();
		// 	console.log('fetched');
		// }, 5000);
	}

	getMessages = () => {
		axios.get('/messages').then(res => {
			let messages = [];
			res.data.forEach(element => {
				const message = {
					userName: element.userName,
					body: element.body,
					senderId: element.uid
				};
				messages.push(message);
			});
			this.setState({
				messages
			});
		});
	};

	componentDidMount() {
		if (this.state.token === null) {
			this.props.history.push('/');
		} else {
			this.getMessages();
			axios
				.get('/users')
				.then(res => {
					res.data.forEach(element => {
						const user = {
							name: element.name,
							image: element.photoURL
						};
						this.setState({
							users: [...this.state.users, user]
						});
					});
				})
				.then(this.setState({ loading: false }));
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

	handleChange = e => {
		e.preventDefault();
		let message = e.target.value;
		this.setState({
			message
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const newMessage = {
			userName: this.state.displayName,
			body: this.state.message,
			senderId: this.state.uid
		};

		this.setState({
			messages: [...this.state.messages, newMessage],
			message: ''
		});
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
					<div className='chatboard'>
						<div className='userList'>
							<div className='title'>
								<Icon style={{ fontSize: 40 }}>whatshot</Icon>
								<Typography variant='h4'>Chat App</Typography>
							</div>
							<div className='logout'>
								<Button
									variant='contained'
									color='secondary'
									onClick={this.handleClick}
								>
									LOGOUT
								</Button>
							</div>
							<div className='users'>
								{users.map((value, index) => (
									<div className='user' key={index}>
										<img src={value.image} alt='user' />
										<Typography variant='subtitle1'>
											{value.name}
										</Typography>
									</div>
								))}
							</div>
						</div>
						<div className='chat'>
							<div className='messages'>
								<PerfectScrollbar>
									{messages.map((value, index) => (
										<Message
											senderId={value.senderId}
											userName={value.userName}
											uid={this.state.uid}
											body={value.body}
											key={index}
										/>
									))}
								</PerfectScrollbar>
							</div>
							<div className='input'>
								<TextField
									value={this.state.message}
									className='textInput'
									variant='outlined'
									onChange={this.handleChange}
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
									onClick={this.handleSubmit}
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
					</div>
				</div>
			);
		}
	}
}

export default withRouter(ChatComponent);
