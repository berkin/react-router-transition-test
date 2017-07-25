import React, { Component } from 'react';
import * as Animated from "animated/lib/targets/react-dom";

class Overlay extends Component {
	constructor(props) {
		super(props)

		this.state = {
			animate: new Animated.Value(0),
		}

	}

	update(value) {
			setTimeout(
				() => Animated.spring(this.state.animate, {
					toValue: value
				}).start(),
				250
			);
	}

	render() {
		const style = {
			transform: Animated.template `
				translate3d(0, ${this.state.animate.interpolate({
					inputRange: [0, 1],
					outputRange: ["0%", "100%"]
				})}, 0)`
		}
		const children = React.Children.map(this.props.children,
			 (child) => React.cloneElement(child, {
			   update: this.update.bind(this)
			 })
		);

		return (
			<Animated.div style={style}>
				{children}
			</Animated.div>
		)
	}
}

export default Overlay
