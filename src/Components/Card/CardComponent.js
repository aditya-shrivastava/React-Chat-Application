import React, { Component } from 'react';
import './CardComponent.css';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import { Firebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';

class CardComponent extends Component {
	componentDidMount() {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);
	}

	handleClick = e => {
		e.preventDefault();
		var provider = new Firebase.auth.GoogleAuthProvider();

		Firebase.auth()
			.signInWithPopup(provider)
			.then(async result => {
				var user = result.user;
				var token = result.credential.accessToken;

				localStorage.setItem('TOKEN', token);
				localStorage.setItem('ID', user.uid);
				localStorage.setItem('DISPLAY_NAME', user.displayName);
				localStorage.setItem('PHOTO_URL', user.photoURL);
				axios.post('/signin', user).then(res => {
					console.log(res.data.message);
					this.props.history.push('/chat');
				});
			})
			.catch(err => {
				console.log(err.code, err.message, err.email, err.credential);
			});
	};

	render() {
		return (
			<div className='card'>
				<div className='header'>
					<Typography variant='h3'>Welcome!</Typography>
					<Typography variaint='subtitle'>
						We are happy to have you with us
					</Typography>
				</div>
				<Button
					startIcon={<Icon className='fab fa-google' />}
					variant='contained'
					color='secondary'
					size='large'
					onClick={this.handleClick}
				>
					SignIn With Google
				</Button>
			</div>
		);
	}
}

export default withRouter(CardComponent);
