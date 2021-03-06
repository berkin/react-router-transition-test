import React, {
	Component
} from 'react';
import {
	Switch,
	Route,
	Link
} from 'react-router-dom'

import { slide } from './presets';
import Overlay from './Overlay'

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

class Contact extends Component {
	render() {
		return (
			<div className="page">
				<h1>Contact</h1>
				<p>Hello from the contact page!</p>
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
					<Link to="/contact">Contact</Link>
				</div>
				<Route exact path="/" component={Home} />
				<Route path="/contact" component={Contact} />
				<Route render={({location, history}) => {
					return (
						<Overlay
							{...slide}
							location={location}
							history={history}
							className="animated-page-wrapper">
							<Switch key={location.key} location={location}>
								<Route
									path="/about"
									component={About}
								/>
								<Route
									path="/topics"
									component={Topics}
									/>
							</Switch>
						</Overlay>
					)
				}} />
			</div>
		);
	}
}

export default App;
