import React, { Component } from 'react';
import './CardComponent.css';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import { withRouter } from 'react-router-dom';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		firebase.initializeApp(firebaseConfig);
	}

	componentDidMount() {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);
	}

	handleClick = e => {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(async result => {
				var user = result.user;

				// console.log(
				// 	user.uid,
				// 	user.email,
				// 	user.displayName,
				// 	user.photoURL
				// );

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
						Welcome to your happy place
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
