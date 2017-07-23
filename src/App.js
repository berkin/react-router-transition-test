import React, {
	Component
} from 'react';
import { Route, Link } from 'react-router-dom'
import AnimatedWrapper from "./AnimatedWrapper";
import {
	TransitionGroup
} from 'react-transition-group'
import './index.css';

class TopicsComponent extends Component {
	render() {
		return (
			<div className="overlay">
				<h1>Topics</h1>
				<p>Hello from the topics page!</p>
		   </div>
		)
	}
}
const Topics = AnimatedWrapper(TopicsComponent);

class AboutComponent extends Component {
	render() {
		return (
			<div className="overlay">
				<h1>About</h1>
				<p>Hello from the home page!</p>
		   </div>
		)
	}
}
const About = AnimatedWrapper(AboutComponent);

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

const firstChild = props => {
	const childrenArray = React.Children.toArray(props.children);
	return childrenArray[0] || null;
};

class App extends Component {
	render() {
		return (
			<div className="App">
        <div className="TopBar">
          <Link to="/">Home</Link> {' '}
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
		</div>
		<Route
		   path="/about"
		   children={({ match, ...rest }) => (
			 <TransitionGroup component={firstChild}>
			   {match && <About {...rest} />}
			 </TransitionGroup>
		)}/>
		 <Route
		  exact
		  path="/topics"
		  children={({ match, ...rest }) => (
			<TransitionGroup component={firstChild}>
			  {match && <Topics {...rest} />}
			</TransitionGroup>
		)}/>
		<Route path="/" component={Home} />
      </div>
		);
	}
}

export default App;
