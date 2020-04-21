import React from 'react';
import './App.css';
import SignIn from './Components/SignIn/SiginIn';
import ChatComponent from './Components/Chat/ChatComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL =
	'https://asia-east2-native-chat-app-43424.cloudfunctions.net/api';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={SignIn} />
					<Route exact path='/chat' component={ChatComponent} />
					<Route exact path='/profile' />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
