import React, {
	Component
} from 'react';
import {
	Route,
	Link
} from 'react-router-dom'

import {
	TransitionGroup
} from 'react-transition-group'
import RouteTransition from './RouteTransition';
import './index.css';

class Topics extends Component {
	render() {
		return (
			<div className="overlay">
				<Link to="/"> x Close</Link>
				<h1>Topics</h1>
				<p>Hello from the topics page!</p>
				<Link to="/about">Back</Link>
		   </div>
		)
	}
}

class About extends Component {
	render() {
		return (
			<div className="overlay">
				<Link to="/"> x Close</Link>
				<h1>About</h1>
				<p>Hello from the about page!</p>
				<Link to="/"> Back</Link> {' '}
				<Link to="/topics"> Topics</Link>
		   </div>
		)
	}
}

class Home extends Component {
	render() {
		return (
			<div className="page">
				<h1>Home</h1>
				<p>Hello from the home page!</p>
		   </div>
		)
	}
}


class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="TopBar">
					<Link to="/">Home</Link> {' '}
					<Link to="/about">About</Link>
					<Link to="/topics">Topics</Link>
				</div>
				<Route path="/" component={Home} />
				<RouteTransition
					path="/about"
					component={About}
				/>
				<RouteTransition
					path="/topics"
					component={Topics}
				/>
			</div>
		);
	}
}

export default App;
