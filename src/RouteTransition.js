import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import AnimatedWrapper from "./AnimatedWrapper";

const firstChild = props => {
	const childrenArray = React.Children.toArray(props.children);
	return childrenArray[0] || null;
};

class RouteTransition extends Component {
	render() {
		const { component: Component, ...rest } = this.props;
		const WrappedComponent = AnimatedWrapper(Component);

	return (
		<Route
			{...rest}
			children={({ match, ...rest }) => (
				<TransitionGroup component={firstChild}>
				  {match && <WrappedComponent {...rest} />}
				</TransitionGroup>
			)}
		/>
		)
	}
}

export default RouteTransition;
