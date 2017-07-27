import React, { Component } from 'react';
import { Route, matchPath } from 'react-router-dom'
import { TransitionMotion, spring, presets } from 'react-motion';

class Overlay extends Component {

	constructor(props) {
		super(props);
		const {children} = this.props;
		this.items = [];
		React.Children.forEach(children.props.children,
			child => this.items.push(child.props)
		);

		this.willMount = false;
		this.willUnmount = this.isMatched(this.props.location.pathname);

	}

	componentWillReceiveProps(nextProps) {
		const isPrevPropsFound = this.isMatched(this.props.location.pathname);
		const isNextPropsFound = this.isMatched(nextProps.location.pathname);
		this.willMount = false;
		this.willUnmount = false;

		if ( !isPrevPropsFound && isNextPropsFound ) {
			this.willMount = true;
		} else if ( isPrevPropsFound && !isNextPropsFound ) {
			this.willUnmount = true;
		}
		this.previousLocation = this.props.location.pathname
	}

	shouldComponentUpdate(nextProps) {
			return nextProps.location.pathname !== this.previousLocation;
	}

	isMatched(pathname) {
		return this.items.some(item => matchPath(pathname, item))
	}


	willEnter = () => {
		const { history: {action} } = this.props
		/* if ( this.willOpen ) {
		  return this.props.willOpen
	  } else {
		  return this.props.willEnter
	  } */
		return {
			offset: this.direction === 'Y' ? 100 : action === 'POP' ? -100 : 100,
		}
	};


	willLeave = () => {
		const { history:{action} } = this.props
		return {
			offset: this.direction === 'Y' ? spring(100, presets.stiff) : action === 'PUSH' ? spring(-100, presets.stiff) : spring(100, presets.stiff),
		}
	};

	getDefaultStyles = () => {
		const { children, location, history } = this.props
		const { pathname, state } = location
		return [
			{
				key: pathname,
				data: {
					handler: children
				},
				style: {
					offset: 100
				},
			},
		];
	}

	getStyles = () => {
		const { children, location, history } = this.props
		const { pathname, state } = location
		return [{
			data: {
				handler: children
			},
			style: {
				offset: spring(0, presets.stiff)
			},
			key: pathname
		}]
	};

	render() {
		this.direction = 'X';
		if ( this.willMount || this.willUnmount ) {
			this.direction = 'Y';
		}

		return (
			<TransitionMotion
				defaultStyles={this.getDefaultStyles()}
				styles={this.getStyles()}
				willEnter={this.willEnter}
				willLeave={this.willLeave}
			>
			{styles =>
				<div>
				{styles.map(({key, style, data}) => {
					const styles = {
						transform: `translate${this.direction}(${style.offset}%)`
					}
					return (
						this.isMatched(key) && <div
							className={this.props.className}
							key={key}
							style={styles}
						>
							{data.handler}
						</div>
					)
				}
				)}
				</div>
			}
			</TransitionMotion>
		)
	}
}

export default Overlay;
