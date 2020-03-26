import React from 'react';
import CardComponent from '../Card/CardComponent';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import bg from '../../images/bg.jpg';
import './SignIn.css';
import { withRouter } from 'react-router-dom';

function SignIn() {
	return (
		<div className='container'>
			<img src={bg} alt='bg' />
			<div className='logo'>
				<Icon style={{ fontSize: 40 }}>whatshot</Icon>
				<Typography variant='h4'>Chat App</Typography>
			</div>
			<div className='App'>
				<CardComponent />
			</div>
		</div>
	);
}

export default withRouter(SignIn);
