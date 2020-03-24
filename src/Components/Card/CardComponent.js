import React, { useEffect } from 'react';
import './CardComponent.css';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';

export default function CardComponent() {
	useEffect(() => {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);
	}, []);

	function handleClick(e) {
		e.preventDefault();
		axios.get('/signin').then(res => console.log(res.data.message));
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
