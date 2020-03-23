import React, { useEffect } from 'react';
import './CardComponent.css';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';

export default function CardComponent() {
	useEffect(() => {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);
	}, []);

	return (
		<div className='card'>
			<div className='header'>
				<Typography variant='h3'>Welcome!</Typography>
				<Typography variaint='subtitle'>
					We are happy to have you
				</Typography>
			</div>
			<Button
				startIcon={<Icon className='fab fa-google' />}
				variant='contained'
				color='secondary'
				size='large'
			>
				SignIn With Google
			</Button>
		</div>
	);
}
