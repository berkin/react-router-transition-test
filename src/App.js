import React, {
	Component
} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import { RouteTransition, presets } from 'react-router-transition';
import logo from './logo.svg';
import './App.css';

const About = () => (
	<div>
		<h1>About</h1>
	</div>
)

const Topics = () => (
	<div>
		<h1>Topics</h1>
	</div>
)
const Home = () => (
	<div>
		<h1>Home</h1>
	</div>
)
const style = {
		background: '#e3e3e3',
		position: 'absolute',
		left: 0,
		right: 0
	}

class Overlay extends Component {
	componentDidMount() {
		console.log('mount')
	}

	render() {
		return (

			<div style={{
				position: 'absolute',
				left: 0,
				right: 0
			}}>
			<h1>Overlay</h1>
			</div>
		)
	}
}

const ResetPassword1 = () => (
	<div style={style}>
		<h1>ResetPassword1</h1>
		<Link to="/reset-password2">Go</Link>
	</div>
)
const ResetPassword2 = () => (
	<div style={style}>
		<h1>ResetPassword2</h1>
	</div>
)

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<div className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<h2>Welcome to React</h2>
						</div>
						<Link to="/">Home</Link> {' '}
						<Link to="/about">About</Link> {' '}
						<Link to="/topics">Topics</Link> {' '}
						<Link to="/reset-password">Reset Password</Link>
						<Route render={({location, history, match}) => {
							return (
							<RouteTransition
								style={{
									position: 'relative',
									height: 100,
								}}
								pathname={location.pathname}
								{...presets.slideLeft}
							>
								<Route path="/" exact component={Overlay} />
								<Route path="/reset-password" component={ResetPassword1} />
								<Route path="/reset-password2" component={ResetPassword2} />
							</RouteTransition>
							)
						}} />
						<Route path="/" component={Home} exact />
						<Route path="/about" component={About} />
						<Route path="/topics" component={Topics} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
