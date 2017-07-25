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

class Overlay extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			items: []
		}
	}
	componentDidMount() {

		const locations =[];
		React.Children.forEach(this.props.children,
			child => locations.push(child.props.path))
		this.setState({
			items: locations
		})
	}
	getDirection(location, nextLocation) {
		let result = 'fromLeft';
		if ( this.state.items.indexOf(nextLocation) === -1) {
			this.previousLocation = null;
			result =  'fromBottom';
		} else if ( location === nextLocation && !this.previousLocation ) {
			result =  'fromBottom';
		}

		if ( location === nextLocation ) {
			this.previousLocation = location;
		}
		return result;
	}

	render() {
		const children = React.Children.map(this.props.children,
			 (child) => React.cloneElement(child, {
				getDirection: this.getDirection.bind(this)
			 })
	    );
		return (
			<div>
				{children}
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
				<Overlay>
					<RouteTransition
						path="/about"
						component={About}
					/>
					<RouteTransition
						path="/topics"
						component={Topics}
					/>
				</Overlay>
			</div>
		);
	}
}

export default App;
