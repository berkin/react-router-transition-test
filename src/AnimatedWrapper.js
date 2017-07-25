import React, {
	Component
} from "react";
import * as Animated from "animated/lib/targets/react-dom";
import {
	TransitionGroup
} from 'react-transition-group'

const AnimatedWrapper = WrappedComponent =>
	class AnimatedWrapper extends Component {
		constructor(props) {
			super(props);
			this.state = {
				animate: new Animated.Value(0),
			};
		}

		componentWillAppear(cb) {
			Animated.spring(this.state.animate, {
				toValue: 1
			}).start();
			cb();
		}

		componentWillEnter(cb) {
			setTimeout(
				() => {
					Animated.spring(this.state.animate, {
						toValue: 1
					}).start();
				},
				0
			);
			cb();
		}

		componentWillLeave(cb) {
			Animated.spring(this.state.animate, {
				toValue: 0
			}).start();
			setTimeout(() => cb(), 175);
		}

		render() {
			let styles = {
				fromBottom: {
					opacity: Animated.template `${this.state.animate}`,
					transform: Animated.template `
					translate3d(0, ${this.state.animate.interpolate({
						inputRange: [0, 1],
						outputRange: ["100%", "0%"]
					})}, 0)
					`
				},
				fromLeft: {
					opacity: Animated.template `${this.state.animate}`,
					transform: Animated.template `
					translate3d(${this.state.animate.interpolate({
						inputRange: [0, 1],
						outputRange: ["100%", "0%"]
					})}, 0, 0)
					`
				}
			}

			const style = styles[this.props.getDirection(this.props.location.pathname, this.props.history.location.pathname)]

			return (
				<Animated.div style={style} className="animated-page-wrapper">
					<WrappedComponent {...this.props} />
				</Animated.div>
			);
		}
	};

export default AnimatedWrapper;
