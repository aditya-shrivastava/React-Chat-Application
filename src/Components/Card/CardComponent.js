import React, { useEffect } from 'react';
import './CardComponent.css';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

export default function CardComponent() {
	useEffect(() => {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);
	}, []);

	firebase.initializeApp(firebaseConfig);

	function handleClick(e) {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(async result => {
				var token = result.credential.accessToken;
				var user = result.user;

				console.log(
					user.uid,
					user.email,
					user.displayName,
					user.photoURL
				);
				axios.get('/signin').then(res => console.log(res.data.message));
			})
			.catch(err => {
				console.log(err.code, err.message, err.email, err.credential);
			});
	}

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
				onClick={handleClick}
			>
				SignIn With Google
			</Button>
		</div>
	);
}
